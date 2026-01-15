import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration } from "@google/genai";

interface VoiceAssistantProps {
  onOpenBooking: () => void;
}

const SYSTEM_INSTRUCTION = `
You are the voice assistant for HH Construction.
Persona: Neutral North American female (early–mid 30s), warm calm authority, confident and friendly, clear articulation, steady pace (~150 wpm). Small reassuring smile in the voice. Not salesy, not dramatic, no vocal fry. Ends sentences with certainty.

Goal: Redirect all client questions to quickly educate on services and advantages, and close the deal by booking a quotation using the "openBookingModal" tool.

Key Competitive Advantages:
1. Speed: "8 weeks vs industry average 12-16 weeks", "AI automation eliminates typical delays".
2. Communication: "Daily updates vs hoping your contractor shows up", "Never chase us - we chase perfection".
3. Transparency: "Detailed quotes with zero hidden fees", "Real-time budget tracking prevents overruns".
4. Expertise: "In-house certified teams, not random subs", "Full compliance handling - you never deal with city bureaucracy".
5. Results: "70-75% ROI on appraisal value", "$1,500+/month rental income in 8 weeks".

Objection Handling (Use strictly):
- "It's too expensive" -> "I understand budget is a concern. That's why we offer 3 tiers and help you navigate financing. With the 90% refinancing program active now, you can access your home equity without waiting. Plus, if you're building an income suite, rental income pays it back in 5-6 years while you keep the equity increase."
- "I need to think about it" -> "Absolutely, this is a big decision. What specific concerns can I address today to help you think it through? Is it budget, timeline, or something else?"
- "How do I know you'll finish on time?" -> "Great question - that's exactly why we built our AI project management system. We track every trade, material delivery, and inspection in real-time. Our average is 8 weeks vs industry standard of 12-16. We can even write timeline guarantees into Premium and Signature tier contracts."
- "I've had bad contractor experiences before" -> "I hear that a lot, and it's exactly why we do things differently. Daily photo updates, transparent budgeting, certified in-house teams - no surprises. Can I show you our communication process so you see how we keep clients informed?"
- "I don't know if I can get financing" -> "Let's explore that together. We work with mortgage brokers who specialize in renovation financing. Even if the $80K government loan isn't available yet, the 90% refinancing is active now. Want me to connect you with our partner broker for a pre-qualification?"

Action: When the user agrees to a quote, says "book now", or expresses strong interest, call the tool "openBookingModal".

Rule: You must start the conversation immediately. As soon as you connect, say exactly: "Hey, welcome to HH. How may I help you?".
`;

// Audio Helpers
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): { data: string; mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onOpenBooking }) => {
  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [introMode, setIntroMode] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  const activeSessionRef = useRef<any>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourceNodesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Refs for mic control
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Handle intro animation timer for sparkles
  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroMode(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Handle initial tooltip appearance (after main loader)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2500); // 1.5s loader + 1s delay
    return () => clearTimeout(timer);
  }, []);

  // Function Declaration
  const bookingTool: FunctionDeclaration = {
    name: 'openBookingModal',
    description: 'Opens the booking consultation form/modal on the user screen.',
    parameters: { type: Type.OBJECT, properties: {} },
  };

  const startMicrophone = () => {
    if (!inputContextRef.current || !streamRef.current || !activeSessionRef.current) return;
    if (isListening) return;

    try {
      console.log("Starting microphone...");
      const inputCtx = inputContextRef.current;
      const stream = streamRef.current;

      const source = inputCtx.createMediaStreamSource(stream);
      const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);

      scriptProcessor.onaudioprocess = (e) => {
        if (!activeSessionRef.current) return;
        const inputData = e.inputBuffer.getChannelData(0);
        const pcmBlob = createBlob(inputData);
        activeSessionRef.current.sendRealtimeInput({ media: pcmBlob });
      };

      source.connect(scriptProcessor);
      scriptProcessor.connect(inputCtx.destination);

      mediaStreamSourceRef.current = source;
      scriptProcessorRef.current = scriptProcessor;
      setIsListening(true);
    } catch (err) {
      console.error("Error starting mic:", err);
    }
  };

  const disconnect = () => {
    setIsActive(false);
    setIsSpeaking(false);
    setIsListening(false);

    // Close session
    if (activeSessionRef.current) {
      activeSessionRef.current.close();
      activeSessionRef.current = null;
    }

    // Disconnect Mic
    scriptProcessorRef.current?.disconnect();
    scriptProcessorRef.current = null;
    mediaStreamSourceRef.current?.disconnect();
    mediaStreamSourceRef.current = null;

    // Stop tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    // Close audio contexts
    if (inputContextRef.current) {
      inputContextRef.current.close();
      inputContextRef.current = null;
    }
    if (outputContextRef.current) {
      outputContextRef.current.close();
      outputContextRef.current = null;
    }

    // Stop playing audio
    sourceNodesRef.current.forEach(node => node.stop());
    sourceNodesRef.current.clear();
    nextStartTimeRef.current = 0;
  };

  const connect = async () => {
    // Hide tooltip when connecting
    setShowTooltip(false);

    try {
      setError(null);
      setIsActive(true);
      setIsListening(false);

      // Get API key from environment
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

      if (!apiKey) {
        const msg = "Voice assistant unavailable: API key not configured. Please contact support.";
        console.error("VITE_GEMINI_API_KEY is not set in environment variables");
        setError(msg);
        setIsActive(false);
        return;
      }

      console.log("Initializing Gemini Client...");
      const ai = new GoogleGenAI({ apiKey });

      // 1. Initialize Audio Contexts immediately to capture user gesture
      const InputContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const inputCtx = new InputContextClass({ sampleRate: 16000 });
      const OutputContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const outputCtx = new OutputContextClass({ sampleRate: 24000 });

      // CRITICAL: Resume contexts immediately to prevent browser autoplay blocks
      if (inputCtx.state === 'suspended') await inputCtx.resume();
      if (outputCtx.state === 'suspended') await outputCtx.resume();

      inputContextRef.current = inputCtx;
      outputContextRef.current = outputCtx;

      // Get stream but don't connect it yet
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Establish connection
      const session = await ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ functionDeclarations: [bookingTool] }],
        },
        callbacks: {
          onopen: () => {
            console.log('Voice session connected');
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Interruption
            if (message.serverContent?.interrupted) {
              console.log("Interruption detected");
              sourceNodesRef.current.forEach(node => {
                try { node.stop(); } catch (e) { }
              });
              sourceNodesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsSpeaking(false);
              return;
            }

            // Handle Tool Calls
            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                if (fc.name === 'openBookingModal') {
                  onOpenBooking();
                  activeSessionRef.current?.sendToolResponse({
                    functionResponses: {
                      id: fc.id,
                      name: fc.name,
                      response: { result: "Booking modal opened successfully." }
                    }
                  });
                }
              }
            }

            // Handle Audio Output
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              setIsSpeaking(true);

              const audioCtx = outputContextRef.current;
              if (audioCtx) {
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioCtx.currentTime);

                const audioBuffer = await decodeAudioData(
                  decode(base64Audio),
                  audioCtx,
                  24000,
                  1
                );

                const source = audioCtx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioCtx.destination);

                source.addEventListener('ended', () => {
                  sourceNodesRef.current.delete(source);
                  if (sourceNodesRef.current.size === 0) {
                    setIsSpeaking(false);
                  }
                });

                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourceNodesRef.current.add(source);
              }
            }
          },
          onclose: () => {
            console.log('Session closed');
            disconnect();
          },
          onerror: (e) => {
            console.error("Session error:", e);
            setError("Connection lost");
            disconnect();
          }
        }
      });

      // Store session
      activeSessionRef.current = session;

      // 2. Start Microphone Immediately
      startMicrophone();

      // 3. Immediate "Poke" to trigger Greeting
      // Sending a minimal amount of "noise/silence" to kickstart the turn
      const silence = new Float32Array(1200); // 75ms of silence at 16kHz
      const pcmBlob = createBlob(silence);
      session.sendRealtimeInput({ media: pcmBlob });

    } catch (e) {
      console.error(e);
      setError("Connection failed");
      setIsActive(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isActive && (
        <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end">

          {/* Welcome Tooltip */}
          {showTooltip && (
            <div className="mb-4 mr-2 animate-fade-in-up origin-bottom-right">
              <div className="bg-white text-[#1c1c1c] p-4 rounded-xl shadow-2xl border border-gray-200 relative max-w-[260px]">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1"
                  aria-label="Close message"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
                <div className="pr-4">
                  <p className="text-sm font-medium leading-relaxed">
                    Hey, welcome to HH Construction. Press me right here if you need more assistance and voice.
                  </p>
                </div>
                {/* Arrow pointing down */}
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 border-b border-r border-gray-200"></div>
              </div>
            </div>
          )}

          <button
            onClick={connect}
            className="w-14 h-14 rounded-full bg-[#1c1c1c] text-white shadow-xl flex items-center justify-center border border-gray-700 hover:scale-110 hover:border-red-500 transition-all duration-300 group overflow-hidden relative"
            aria-label="Start Voice Assistant"
          >
            <div className="absolute inset-0 rounded-full border border-red-500/30 animate-ping opacity-20 group-hover:opacity-40"></div>

            {/* Gemini Sparkles */}
            <div className="absolute inset-0 pointer-events-none">
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className={`absolute top-2 right-3 w-2.5 h-2.5 opacity-80 ${introMode ? 'animate-[pulse_0.4s_ease-in-out_infinite]' : 'animate-[pulse_2s_ease-in-out_infinite]'}`}
              >
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className={`absolute bottom-3 left-3 w-1.5 h-1.5 opacity-60 ${introMode ? 'animate-[pulse_0.6s_ease-in-out_infinite_0.1s]' : 'animate-[pulse_3s_ease-in-out_infinite_0.5s]'}`}
              >
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
              <svg
                viewBox="0 0 24 24"
                fill="#EF4444"
                className={`absolute top-3 left-4 w-1 h-1 opacity-70 ${introMode ? 'animate-[pulse_0.5s_ease-in-out_infinite_0.2s]' : 'animate-[pulse_1.5s_ease-in-out_infinite_1s]'}`}
              >
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500 relative z-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
          </button>
        </div>
      )}

      {/* Active Interface Overlay */}
      {isActive && (
        <div className="fixed bottom-24 right-6 z-40 w-72 bg-[#1c1c1c] rounded-xl shadow-2xl border border-gray-800 overflow-hidden animate-fade-in-up">
          <div className="p-4 flex flex-col items-center">
            <div className="w-full flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'}`}></span>
                <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">HH Assistant</span>
              </div>
              <button onClick={disconnect} className="text-gray-500 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>

            {/* Visualizer */}
            <div className="h-12 flex items-center justify-center gap-1 mb-4">
              {isSpeaking ? (
                <>
                  <div className="w-1 h-3 bg-red-500 rounded-full animate-[bounce_1s_infinite]"></div>
                  <div className="w-1 h-6 bg-red-500 rounded-full animate-[bounce_1.2s_infinite]"></div>
                  <div className="w-1 h-4 bg-red-500 rounded-full animate-[bounce_0.8s_infinite]"></div>
                  <div className="w-1 h-7 bg-red-500 rounded-full animate-[bounce_1.1s_infinite]"></div>
                  <div className="w-1 h-3 bg-red-500 rounded-full animate-[bounce_0.9s_infinite]"></div>
                </>
              ) : !isListening ? (
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse delay-200"></div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-150"></div>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-400 text-center px-4 mb-2">
              {isSpeaking ? "Speaking..." : (!isListening ? "Connecting..." : "Listening...")}
            </p>
            {error && <p className="text-xs text-red-400 mb-2">{error}</p>}

            <button
              onClick={onOpenBooking}
              className="mt-2 text-xs text-red-500 hover:text-white underline decoration-red-500/30 underline-offset-4 transition-colors"
            >
              Book Manually
            </button>
          </div>

          <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-900/50 to-transparent"></div>
        </div>
      )}
    </>
  );
};

export default VoiceAssistant;