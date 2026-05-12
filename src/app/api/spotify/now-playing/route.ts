import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken(): Promise<string> {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  );

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Token refresh failed: ${res.status}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    // Try currently-playing first
    const npRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    // 204 = nothing playing, 200 = data available
    if (npRes.status === 200) {
      const npData = await npRes.json();

      if (npData.is_playing && npData.item) {
        return NextResponse.json(
          {
            isPlaying: true,
            title: npData.item.name,
            artist: npData.item.artists
              .map((a: { name: string }) => a.name)
              .join(", "),
            album: npData.item.album.name,
            albumArt: npData.item.album.images[0]?.url ?? null,
            songUrl: npData.item.external_urls.spotify,
            progress: npData.progress_ms ?? 0,
            duration: npData.item.duration_ms,
          },
          {
            headers: {
              "Cache-Control": "no-cache, no-store, must-revalidate",
            },
          }
        );
      }
    }

    // Fallback: recently played
    const rpRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    if (!rpRes.ok) {
      throw new Error(`Recently played fetch failed: ${rpRes.status}`);
    }

    const rpData = await rpRes.json();
    const track = rpData.items?.[0]?.track;

    if (!track) {
      return NextResponse.json(
        { isPlaying: false, title: null },
        { headers: { "Cache-Control": "no-cache, no-store, must-revalidate" } }
      );
    }

    return NextResponse.json(
      {
        isPlaying: false,
        title: track.name,
        artist: track.artists
          .map((a: { name: string }) => a.name)
          .join(", "),
        album: track.album.name,
        albumArt: track.album.images[0]?.url ?? null,
        songUrl: track.external_urls.spotify,
        progress: 0,
        duration: track.duration_ms,
      },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (err) {
    console.error("[Spotify API]", err);
    return NextResponse.json(
      { error: "Failed to fetch Spotify data" },
      { status: 500 }
    );
  }
}
