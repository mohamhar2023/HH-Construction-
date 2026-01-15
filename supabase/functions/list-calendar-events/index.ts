import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import * as jose from 'https://deno.land/x/jose@v4.14.4/index.ts'

// Service Account Credentials (same as handle-booking)
const GOOGLE_CALENDAR_ID = "harry.mohammed.jr@gmail.com";
const GOOGLE_CALENDAR_CLIENT_EMAIL = "calendar-manager@booking-system-484318.iam.gserviceaccount.com";
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
wIYjtRmr5xfWjRToC7gkVDlXuFkusJdTUGRsNUSc7ZTjW5atUZcYKk6C7EknQTR
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
            scope: 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly',
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
            return { error: data, token: null };
        }
        return { error: null, token: data.access_token };
    } catch (err) {
        console.error("Error signing Google JWT:", err);
        return { error: err.message, token: null };
    }
}

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        console.log("=== List Calendar Events Function Called ===");

        // Get access token
        const authResult = await getGoogleAccessToken();
        if (authResult.error || !authResult.token) {
            return new Response(JSON.stringify({
                success: false,
                error: "Failed to authenticate with Google",
                details: authResult.error
            }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200, // Return 200 so we can see the error
            });
        }

        console.log("Got access token successfully");

        // Query parameters: get events from 7 days ago to 30 days in future
        const now = new Date();
        const timeMin = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        const timeMax = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(GOOGLE_CALENDAR_ID)}/events?` +
            new URLSearchParams({
                timeMin: timeMin,
                timeMax: timeMax,
                singleEvents: 'true',
                orderBy: 'startTime',
                maxResults: '50'
            });

        console.log("Fetching events from:", url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authResult.token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Calendar API error:", JSON.stringify(data));
            return new Response(JSON.stringify({
                success: false,
                error: "Failed to fetch events",
                apiResponse: data,
                httpStatus: response.status
            }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            });
        }

        console.log("Successfully fetched events:", data.items?.length || 0);

        // Format events for display
        const events = (data.items || []).map((event: any) => ({
            id: event.id,
            summary: event.summary,
            start: event.start?.dateTime || event.start?.date,
            end: event.end?.dateTime || event.end?.date,
            description: event.description,
            created: event.created,
            htmlLink: event.htmlLink
        }));

        return new Response(JSON.stringify({
            success: true,
            calendarId: GOOGLE_CALENDAR_ID,
            timeRange: { from: timeMin, to: timeMax },
            totalEvents: events.length,
            events: events
        }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });

    } catch (error) {
        console.error("Function error:", error);
        return new Response(JSON.stringify({
            success: false,
            error: error.message
        }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
        });
    }
});
