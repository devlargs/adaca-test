import { Alert } from "@mantine/core";
import { MdInfo } from "react-icons/md";

export const ErrorNote = () => (
  <Alert variant="light" color="red" title="Error " icon={<MdInfo />}>
    Something went wrong while fetching the data. Please try again later.
  </Alert>
);
