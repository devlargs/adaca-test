import { Alert } from "@mantine/core";
import { FC } from "react";
import { MdInfo } from "react-icons/md";

export const ErrorNote: FC<{ description: string }> = ({ description }) => (
  <Alert variant="light" color="red" title="Error " icon={<MdInfo />}>
    {description}
  </Alert>
);
