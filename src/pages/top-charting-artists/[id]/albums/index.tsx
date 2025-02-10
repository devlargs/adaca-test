import { AlbumTable } from "@/components/AlbumTable";
import { ErrorNote } from "@/components/ErrorNote";
import { Album } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { Box, Loader, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function ReleasedAlbums() {
  const router = useRouter();

  const { error, data, isFetching } = useQuery({
    queryKey: ["artistAlbums"],
    queryFn: async () => {
      return fetcher(`/artist.albums.get?artist_id=${router.query.id}`);
    },
  });

  const albumData = useMemo(() => {
    if (!data) return [];

    const album: Album[] = data?.message?.body?.album_list.map(
      (album: { album: Album }) => album.album
    );

    return album;
  }, [data]);

  return (
    <>
      <Text size="xl">Albums Released by ____</Text>

      <Box mt="md">
        {isFetching ? (
          <Loader size="sm" type="dots" />
        ) : error ? (
          <ErrorNote />
        ) : (
          <AlbumTable data={albumData} />
        )}
      </Box>
    </>
  );
}
