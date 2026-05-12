import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify";

const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists";

type SpotifyArtist = {
  id: string;
  name: string;
  genres?: string[]; // Spotify sometimes omits this field
  images: { url: string }[];
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
      `${TOP_ARTISTS_ENDPOINT}?limit=5&time_range=${range}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        // Top artists don't change in real-time — cache for 1 hour
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error(`Spotify top artists fetch failed: ${res.status}`);
    }

    const data = await res.json();

    const artists = (data.items as SpotifyArtist[]).map((artist, index) => ({
      id: artist.id,
      name: artist.name,
      genres: (artist.genres ?? []).slice(0, 2), // cap at 2 genres for UI; genres can be undefined
      image: artist.images[0]?.url ?? null,
      artistUrl: artist.external_urls.spotify,
      rank: index + 1,
    }));

    return NextResponse.json({ artists });
  } catch (err) {
    console.error("[Spotify Top Artists API]", err);
    return NextResponse.json(
      { error: "Failed to fetch top artists" },
      { status: 500 }
    );
  }
}
