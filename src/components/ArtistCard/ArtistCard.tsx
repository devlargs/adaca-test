import { DEFAULT_SINGER_SOURCE_URL } from "@/constants/singer";
import { Artist } from "@/types";
import { Card, Image, Indicator, Text } from "@mantine/core";
import { FC } from "react";

export const ArtistCard: FC<Artist & { label: number }> = ({
  artist_name,
  artist_rating,
  label,
}) => {
  return (
    <Indicator
      label={label}
      size="27"
      position="top-start"
      withBorder
      processing={label === 1}
      zIndex={1}
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ cursor: "pointer" }}
      >
        <Card.Section mb="xs">
          <Image src={DEFAULT_SINGER_SOURCE_URL} height={160} alt="Norway" />
        </Card.Section>

        <Text fw={500}>{artist_name}</Text>

        <Text size="sm" c="dimmed" mt="sm">
          Rating: {artist_rating}
        </Text>
      </Card>
    </Indicator>
  );
};
