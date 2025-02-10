import { COUNTRY_CODES } from "@/constants/countryCodes";
import { Button, Flex, Input, Select } from "@mantine/core";

export const SignupForm = () => {
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

      <Select
        label="Country"
        placeholder="Select Country"
        data={COUNTRY_CODES.map((country) => country.name)}
      />

      <Button variant="filled">Register</Button>
    </Flex>
  );
};
