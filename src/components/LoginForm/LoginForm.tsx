import { Button, Flex, Input } from "@mantine/core";

export const LoginForm = () => {
  return (
    <Flex
      direction="column"
      style={{ maxWidth: 400, margin: "auto" }}
      gap="lg"
      mt="xl"
    >
      <Input.Wrapper label="Username">
        <Input />
      </Input.Wrapper>

      <Input.Wrapper label="Password">
        <Input />
      </Input.Wrapper>

      <Button variant="filled">Login</Button>
    </Flex>
  );
};
