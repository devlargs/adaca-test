import { SPOTIFY_ALBUM_URL } from "@/constants/singer";
import { Album } from "@/types";
import { Table, Tooltip } from "@mantine/core";
import { useRouter } from "next/router";
import { FC } from "react";
import { FaSpotify } from "react-icons/fa";

export const AlbumTable: FC<{ data: Album[] }> = ({ data }) => {
  const router = useRouter();

  const viewOnSpotify = (link: string, event: React.MouseEvent) => {
    event.stopPropagation();
    window.open(`${SPOTIFY_ALBUM_URL}/${link}`, "_blank");
  };

  const rows = data.map((album) => (
    <Table.Tr
      key={album.album_id}
      onClick={() => {
        router.push(
          `/top-charting-artists/${router.query.id}/albums/${album.album_id}`
        );
      }}
      style={{ cursor: "pointer" }}
    >
      <Table.Td>{album.album_name}</Table.Td>
      <Table.Td>{album.album_copyright}</Table.Td>
      <Table.Td>{album.album_rating}</Table.Td>
      <Table.Td>{album.album_release_date}</Table.Td>
      <Table.Td>
        {album.external_ids?.spotify.length ? (
          <Tooltip label="View on spotify" withArrow>
            <FaSpotify
              size={20}
              color="green"
              cursor="pointer"
              onClick={(e) => viewOnSpotify(album.external_ids.spotify[0], e)}
            />
          </Tooltip>
        ) : null}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table stickyHeader stickyHeaderOffset={60} highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Copyright</Table.Th>
          <Table.Th>Rating</Table.Th>
          <Table.Th>Release Date</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
