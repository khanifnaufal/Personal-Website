import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = await getAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error(`Spotify API error for playlist ${id}: ${response.status} ${errText}`);
      return NextResponse.json(
        { error: "Failed to fetch playlist data", details: errText },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      id: data.id,
      name: data.name,
      coverImage: data.images && data.images.length > 0 ? data.images[0].url : null,
      trackCount: data.tracks?.total || data.items?.total || 0,
      playlistUrl: data.external_urls?.spotify || "",
    });
  } catch (error) {
    console.error("Error fetching playlist:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
