const client_id = "cd020c08ba3048a3ac44788f546d9946"
const client_secret = "2f1147a8e8a74209b98eca73082d27c9"
const refresh_token =
  "AQD2XRzZYJQN3UTxSxDbM2N-8jhfCWUe33hUN4kgel9a39MPPJy427ACLXoERR5QbK4w9L88oeB5QY0j5aaKqlItGM2JBHWTzBDDS1iZMdc9i2r6q-kSyvcwE9X-cJ6hfsc"

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
      client_id,
    }),
  })

  return response.json()
}

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken()

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  if (response.status === 204 || response.status > 400) {
    return {
      isPlaying: false,
    }
  }

  const song = await response.json()

  return {
    album: song.item.album.name,
    albumImageUrl: song.item.album.images[0].url,
    artist: song.item.artists.map((_artist: any) => _artist.name).join(", "),
    isPlaying: song.is_playing,
    songUrl: song.item.external_urls.spotify,
    title: song.item.name,
  }
}

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken()

  const res = await fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  const { items } = await res.json()

  const tracks = items.slice(0, 10).map((track: any) => ({
    artist: track.artists.map((_artist: any) => _artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
  }))

  return tracks
}
