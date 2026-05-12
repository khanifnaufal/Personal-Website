/**
 * Run this script ONCE to generate a new Spotify refresh token
 * that includes the `user-top-read` scope.
 *
 * Steps:
 * 1. node scripts/get-spotify-token.mjs
 * 2. Open the URL printed in the console
 * 3. Authorize the app
 * 4. Copy the `code` from the redirect URL
 * 5. Paste it when prompted
 * 6. Copy the new SPOTIFY_REFRESH_TOKEN into your .env.local
 */

import * as readline from "readline";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "❌ Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET env vars first."
  );
  process.exit(1);
}

// Include ALL scopes needed by the portfolio
const SCOPES = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-top-read",           // ← required for top tracks & artists
].join(" ");

const REDIRECT_URI = "http://localhost:3000/callback";

const authUrl =
  `https://accounts.spotify.com/authorize` +
  `?client_id=${CLIENT_ID}` +
  `&response_type=code` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&scope=${encodeURIComponent(SCOPES)}`;

console.log("\n🎵 Spotify Token Generator\n");
console.log("1. Open this URL in your browser:\n");
console.log(authUrl);
console.log(
  "\n2. After authorizing, you'll be redirected to http://localhost:3000/callback?code=XXXX"
);
console.log("3. Copy the `code` value from the URL.\n");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Paste the code here: ", async (code) => {
  rl.close();

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("❌ Token exchange failed:", err);
    process.exit(1);
  }

  const data = await res.json();

  console.log("\n✅ Success! Update your .env.local:\n");
  console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
  console.log("\n(The access_token is temporary — only refresh_token matters)\n");
});
