import { fetcher } from "@/utils/fetcher";
import { Box, Loader, Modal } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { ErrorNote } from "../ErrorNote";

const LyricsModal: FC<{
  opened: boolean;
  onClose: () => void;
  id?: number;
  title: string;
}> = ({ opened, onClose, id, title }) => {
  const { error, data, isFetching, isPending } = useQuery({
    queryKey: ["trackLyrics", id],
    queryFn: async () => {
      return fetcher(`/track.lyrics.get?track_id=${id}`);
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={onClose} title={title}>
        <>
          {isFetching || isPending ? (
            <Loader size="sm" type="dots" />
          ) : error ? (
            <ErrorNote description="Something went wrong while fetching the data. Please try again later." />
          ) : (
            <>
              <Box
                dangerouslySetInnerHTML={{
                  __html: data?.message?.body?.lyrics?.lyrics_body,
                }}
              />
            </>
          )}
        </>
      </Modal>
    </>
  );
};

export default LyricsModal;
