import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import * as jose from 'https://deno.land/x/jose@v4.14.4/index.ts'

// HARDCODED KEYS FOR DEPLOYMENT
const RESEND_API_KEY = "re_jYDLDDTL_Hjg5C92Y3JhSgJ69LDWzAuA3";
const GOOGLE_CALENDAR_ID = "harry.mohammed.jr@gmail.com";
const GOOGLE_CALENDAR_CLIENT_EMAIL = "calendar-manager@booking-system-484318.iam.gserviceaccount.com";
// FIXED: Proper PEM format with correct line breaks
const GOOGLE_CALENDAR_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDkCNTgm9xrPKOH
uW/x7ss7j/fdxAIT0iX/0cM5Wnm5GIwC1BvSfVA1j62WCSb54CnqAHWqF4gF2Uqo
exb7Nx3vmO93T504VEp4PBuINWJTQr2NH4cMNfbV+AS3MCpfWXa9WKnyotDLVQSu
1oePl/gXCUqQ4VdnS8xiEYHFTuw+Z8VvWrxUBjuprOLAQumK8kvX0tIT8nbdxHL4
A1RFxHTiQOlkgnKMS3VJWahdh6N9MQQjZ5NJAA6OElHszMz8xxzdH8YIxYWgqmUX
zcWpxIKcqH+UNs/8Bo0OxjNfjqo2ZE3YhBs9L2zWDtqizglYm0JCGoTpZZ0wwTsL
V4guALpdAgMBAAECggEAIyLBOkKJufRD9ju6Zfq3UdwjAwaak1dEB6DYhdPNAZoo
qJ7qEorAeyBCTOXoHYROsQGVH7o0eUI74K3mopqhgDN+YlHgFbfXKaOJUnl3RwD3
l/ENq/H8sIdgoqFHRh3Qz+gDd6FirpHRAOeJR7TQwyvpU12FTCM/wLSV3EMG365v
CTlMdmY+U4R2cmNiIYfw8T58R+CrbVAaMocyZBMYIe0lLTryzKh/27LbklFjmrI+
ewIYjtRmr5xfWjRToC7gkVDlXuFkusJdTUGRsNUSc7ZTjW5atUZcYKk6C7EknQTR
9eMTOzdOFcgI19iTLfZ6XuAlZvOFR3erw+DBZPUxuQKBgQD/XmdAxhDu5HXv2vDS
0ZSVuv8xURDBFOkddV3xVivDceExYE+fvdUAFsggAHzMzobcKGlP/j7WJ8GHDEbg
AWIvZIkbIT9WLo5iOAzWUigtlE4V8e8e1fmzrPShYxg6OBvvsgF1PYwIXWLV4e/Y
UXwsR+ajCEVNRXjKAiPx0EfZvwKBgQDkmSGUaB2kI0yzi8iEoBA5mz54slQQME2U
nqZGnIHSHdj5Ah3U5TIL1NnakvdR44BL2LQLZMq2zV5BTgzM37+Q1OG90oOCCYgo
z0DIvzp+SPrbHRXY6MYTkDjVpsuCcfNqTR6vKyC/jqyPeumS3wYhp8wJC4qUfs4Q
TkvxfKLa4wKBgAGe98jReQoLKTR8j0rHScophbUqbpDLMS+erxn5Eg4LiwJlOhwp
eFCn1F1fo2spZHHBT+nSE1QIrJHO4iRJ3fWvDa++ZkiFwyGceXhizR588oHxJzNq
6ErbrjHYDy9Pa935o0i7O0hST25MINmeqssdKbmfM9Fpv3qIyPGgANTBAoGAYbqd
woaodW2p8vCFrz2G8jnOgWcrzSf5YtpYl8N9NMkR45LmEghSVwCOioVeOqIaTVK9
1kkm6PPvodeuXUAi89YvFCoVkthkX54LQkeOyEKHDHnoxyzs0ZxMz/pY8tGokP+b
aKP1gi+K0mRnyySRyH2mGw/WFRoJGqt+iCUSsqUCgYEA5JetVBym57WSPtO6PPql
xxdwS/pITkqSuwhsheanMCjrO8psktEnaLB2C6xg2niucq+yyE2N6rUtGSCvJXJ/
3h8jBQFO3qaNbFY+YsXb6rsB+VqG+BLth03KVDnXyhrkW4fezWet40lSiUvgHqaV
J6B5knK+GhCGPg/o2Wr7FFA=
-----END PRIVATE KEY-----`;

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function getGoogleAccessToken() {
    try {
        const alg = 'RS256';
        const pk = await jose.importPKCS8(GOOGLE_CALENDAR_PRIVATE_KEY, alg);

        const jwt = await new jose.SignJWT({
            scope: 'https://www.googleapis.com/auth/calendar.events',
        })
            .setProtectedHeader({ alg, typ: 'JWT' })
            .setIssuer(GOOGLE_CALENDAR_CLIENT_EMAIL)
            .setSubject(GOOGLE_CALENDAR_CLIENT_EMAIL)
            .setAudience('https://oauth2.googleapis.com/token')
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(pk);

        const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                assertion: jwt,
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            console.error("Token error:", JSON.stringify(data));
            return null;
        }
        return data.access_token;
    } catch (err) {
        console.error("Error signing Google JWT:", err);
        return null;
    }
}

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const payload = await req.json();
        const booking = payload.record || payload;

        console.log("Processing booking:", JSON.stringify(booking));

        // 1. Send Email Notification via Resend
        let emailStatus = "skipped";
        if (RESEND_API_KEY) {
            try {
                const res = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${RESEND_API_KEY}`,
                    },
                    body: JSON.stringify({
                        from: "HH Construction <onboarding@resend.dev>",
                        to: ["delivered@resend.dev", "harry.mohammed.jr@gmail.com"],
                        subject: `New Application Request: ${booking.name}`,
                        html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #333;">
                        <h1 style="color: #000;">New Application Received</h1>
                        <hr style="border: 0; border-bottom: 1px solid #eee; margin: 20px 0;" />
                        <p><strong>Name:</strong> ${booking.name}</p>
                        <p><strong>Phone:</strong> ${booking.phone}</p>
                        <p><strong>Email:</strong> ${booking.email}</p>
                        <p><strong>Status:</strong> ${booking.is_flexible ? "Priority Waitlist (Flexible)" : "Scheduled Date"}</p>
                        <p><strong>Preferred Date:</strong> ${booking.preferred_date ? new Date(booking.preferred_date).toDateString() : "Flexible"}</p>
                    </div>
                    `,
                    }),
                });
                const data = await res.json();
                emailStatus = res.ok ? "sent" : JSON.stringify(data);
                console.log("Email result:", emailStatus);
            } catch (e) {
                console.error("Email failed:", e);
                emailStatus = "failed: " + e.message;
            }
        }

        // 2. Add to Google Calendar
        let calendarStatus = "skipped";
        if (booking.preferred_date) {
            console.log("Creating calendar event for date:", booking.preferred_date);

            const accessToken = await getGoogleAccessToken();
            if (accessToken) {
                console.log("Got access token successfully");

                // Parse the date - extract just the date portion to avoid timezone issues
                const dateStr = booking.preferred_date.split('T')[0]; // Get YYYY-MM-DD
                const [year, month, day] = dateStr.split('-').map(Number);

                console.log(`Parsed date: year=${year}, month=${month}, day=${day}`);

                // Create datetime strings directly in the desired format
                // Format: YYYY-MM-DDTHH:MM:SS (no timezone suffix - timezone specified separately)
                const startDateTime = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T09:00:00`;
                const endDateTime = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T10:00:00`;

                const event = {
                    summary: `Consultation: ${booking.name}`,
                    description: `Phone: ${booking.phone}\nEmail: ${booking.email}\nFlexible: ${booking.is_flexible ? 'Yes' : 'No'}`,
                    start: {
                        dateTime: startDateTime,
                        timeZone: 'America/New_York'
                    },
                    end: {
                        dateTime: endDateTime,
                        timeZone: 'America/New_York'
                    },
                    reminders: {
                        useDefault: false,
                        overrides: [
                            { method: 'email', minutes: 60 },
                            { method: 'popup', minutes: 30 }
                        ]
                    }
                };

                console.log("Creating calendar event:", JSON.stringify(event));

                const calRes = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(GOOGLE_CALENDAR_ID)}/events?sendUpdates=all`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(event),
                });

                const calData = await calRes.json();
                console.log("Calendar API response:", JSON.stringify(calData));

                if (calRes.ok) {
                    calendarStatus = "created";
                    console.log("Calendar event created successfully! ID:", calData.id);
                } else {
                    calendarStatus = `failed: ${JSON.stringify(calData)}`;
                    console.error("Calendar creation failed:", calData);
                }
            } else {
                calendarStatus = "failed_auth";
                console.error("Failed to get Google access token");
            }
        } else {
            console.log("No preferred_date, skipping calendar event");
        }

        return new Response(JSON.stringify({ success: true, email: emailStatus, calendar: calendarStatus }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });

    } catch (error) {
        console.error("Function error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }
});
