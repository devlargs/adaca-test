import { ArtistCard } from "@/components/ArtistCard/ArtistCard";
import { ErrorNote } from "@/components/ErrorNote";
import { Artist } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { Box, Flex, Loader, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function TopChartingArtists() {
  const { error, data, isFetching } = useQuery({
    queryKey: ["topChartingArtists"],
    queryFn: async () => {
      return fetcher(`/chart.artists.get?page=1&page_size=3&country=ph`);
    },
  });

  const artistsData = useMemo(() => {
    if (!data) return [];

    const artist: Artist[] = data?.message?.body?.artist_list.map(
      (artist: { artist: Artist }) => artist.artist
    );

    return artist.sort((a, b) => b.artist_rating - a.artist_rating);
  }, [data]);

  return (
    <>
      <Text size="xl">Top Charting Artists in PH</Text>

      <Box mt="md">
        {isFetching ? (
          <Loader size="sm" type="dots" />
        ) : error ? (
          <ErrorNote />
        ) : (
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: "sm", md: "lg" }}
          >
            {artistsData.map((artist, index) => (
              <ArtistCard
                key={artist.artist_id}
                label={index + 1}
                {...artist}
              />
            ))}
          </Flex>
        )}
      </Box>
    </>
  );
}
