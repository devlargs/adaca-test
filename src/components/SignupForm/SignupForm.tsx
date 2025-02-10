import { COUNTRY_CODES } from "@/constants/countryCodes";
import { UserData } from "@/types";
import { registerUser } from "@/utils/registerUser";
import { Button, Flex, Input, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const SignupForm = () => {
  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
      country: "",
    },
    validate: {
      username: (value) => (!value.length ? "Username is required" : undefined),
      password: (value) => (!value.length ? "Password is required" : undefined),
      country: (value) => (!value.length ? "Country is required" : undefined),
    },
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      notifications.show({
        title: "Success",
        message: data.message,
        color: "green",
      });

      form.reset();

      localStorage.setItem(
        "user",
        JSON.stringify({
          username: data.data.username,
          country: data.data.country,
        })
      );

      router.push("/top-charting-artists");
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Something went wrong",
        message: error.message,
        color: "red",
      });
    },
  });

  const onSubmit = (values: UserData) => {
    mutation.mutate(values);
  };

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Flex
        direction="column"
        style={{ maxWidth: 400, margin: "auto" }}
        gap="lg"
        mt="xl"
      >
        <Input.Wrapper label="Username" error={form.errors.username}>
          <Input
            key={form.key("username")}
            {...form.getInputProps("username")}
          />
        </Input.Wrapper>

        <Input.Wrapper label="Password" error={form.errors.password}>
          <Input
            key={form.key("password")}
            {...form.getInputProps("password")}
            type="password"
          />
        </Input.Wrapper>

        <Select
          label="Country"
          placeholder="Select Country"
          data={COUNTRY_CODES.map((country) => country.name)}
          key={form.key("country")}
          error={form.errors.country}
          {...form.getInputProps("country")}
        />

        <Button variant="filled" type="submit">
          Register
        </Button>
      </Flex>
    </form>
  );
};
