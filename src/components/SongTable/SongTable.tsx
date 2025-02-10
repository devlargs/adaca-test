import { Track } from "@/types";
import { Badge, Button, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC, useState } from "react";
import LyricsModal from "../LyricsModal/LyricsModal";

export const SongTable: FC<{ tracks: Track[] }> = ({ tracks }) => {
  const [title, setTitle] = useState<string>("");
  const [trackId, setTrackId] = useState<number>();
  const [opened, { open, close }] = useDisclosure(false);

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
          <Button
            variant="transparent"
            size="xs"
            radius="xl"
            onClick={() => {
              setTitle(track?.track_name);
              setTrackId(track?.track_id);
              open();
            }}
          >
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
    <>
      <Table captionSide="bottom">
        <Table.Thead>{ths}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <LyricsModal title={title} id={trackId} onClose={close} opened={opened} />
    </>
  );
};
