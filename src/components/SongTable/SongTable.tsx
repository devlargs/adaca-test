import { Track } from "@/types";
import { Badge, Button, Table } from "@mantine/core";
import { FC } from "react";

export const SongTable: FC<{ tracks: Track[] }> = ({ tracks }) => {
  const rows = tracks.map((track) => (
    <Table.Tr key={track.track_id}>
      <Table.Td>{track.track_name}</Table.Td>
      <Table.Td>{track.track_rating}</Table.Td>
      <Table.Td>
        <Badge color={track.explicit ? "red" : "green"} size="xs">
          {track.explicit ? "Yes" : "No"}
        </Badge>
      </Table.Td>
      <Table.Td>
        {track.has_lyrics ? (
          <Button variant="transparent" size="xs" radius="xl">
            Show Lyrics
          </Button>
        ) : null}
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>Name</Table.Th>
      <Table.Th>Rating</Table.Th>
      <Table.Th>Explicit</Table.Th>
      <Table.Th></Table.Th>
    </Table.Tr>
  );

  return (
    <Table captionSide="bottom">
      <Table.Thead>{ths}</Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
