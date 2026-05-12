import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify";

const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks";

type SpotifyTrack = {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    images: { url: string }[];
  };
  external_urls: { spotify: string };
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") ?? "short_term";

    // Validate time_range to prevent injection
    const validRanges = ["short_term", "medium_term", "long_term"];
    if (!validRanges.includes(range)) {
      return NextResponse.json({ error: "Invalid time range" }, { status: 400 });
    }

    const accessToken = await getAccessToken();

    const res = await fetch(
      `${TOP_TRACKS_ENDPOINT}?limit=5&time_range=${range}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        // Top tracks don't change in real-time — cache for 1 hour
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error(`Spotify top tracks fetch failed: ${res.status}`);
    }

    const data = await res.json();

    const tracks = (data.items as SpotifyTrack[]).map((track, index) => ({
      id: track.id,
      name: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      albumArt: track.album.images[0]?.url ?? null,
      songUrl: track.external_urls.spotify,
      rank: index + 1,
    }));

    return NextResponse.json({ tracks });
  } catch (err) {
    console.error("[Spotify Top Tracks API]", err);
    return NextResponse.json(
      { error: "Failed to fetch top tracks" },
      { status: 500 }
    );
  }
}
