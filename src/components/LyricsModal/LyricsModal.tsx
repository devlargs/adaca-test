import { fetcher } from "@/utils/fetcher";
import { Alert, Box, Loader, Modal, ScrollArea } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { MdInfo } from "react-icons/md";
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
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      size="full"
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <>
        {isFetching || isPending ? (
          <Loader size="sm" type="dots" />
        ) : error ? (
          <ErrorNote description="Something went wrong while fetching the data. Please try again later." />
        ) : (
          <>
            <Box
              style={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{
                __html: data?.message?.body?.lyrics?.lyrics_body,
              }}
            />

            <Alert
              variant="light"
              color="blue"
              title="Note"
              icon={<MdInfo />}
              p="sm"
              mt="lg"
              mx="lg"
            >
              {data?.message?.body?.lyrics?.lyrics_copyright}
            </Alert>
          </>
        )}
      </>
    </Modal>
  );
};

export default LyricsModal;
