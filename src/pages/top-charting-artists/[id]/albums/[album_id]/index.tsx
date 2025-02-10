import { ErrorNote } from "@/components/ErrorNote";
import { SongTable } from "@/components/SongTable";
import { Track } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { Loader, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function AlbumSongs() {
  const router = useRouter();

  const { error, data, isFetching, isPending } = useQuery({
    queryKey: ["albumSongs"],
    queryFn: async () => {
      if (!router.query.id) return null;
      return fetcher(`/album.tracks.get?album_id=${router.query.album_id}`);
    },
    enabled: !!router.query.album_id,
  });

  const trackData = useMemo(() => {
    if (!data) return [];

    const album: Track[] = data?.message?.body?.track_list.map(
      (track: { track: Track }) => track.track
    );

    return album;
  }, [data]);

  const albumTitle = data?.message?.body?.track_list[0]?.track?.album_name;
  const artistName = data?.message?.body?.track_list[0]?.track?.artist_name;

  return (
    <>
      {isFetching || isPending ? (
        <Loader size="sm" type="dots" />
      ) : error ? (
        <ErrorNote />
      ) : (
        <>
          {albumTitle && artistName && (
            <Text size="xl" mb="">
              {albumTitle} ({artistName}) Tracks
            </Text>
          )}

          <SongTable tracks={trackData} />
        </>
      )}
    </>
  );
}
