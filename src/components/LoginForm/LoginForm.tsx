import { UserData } from "@/types";
import { loginUser } from "@/utils/loginUser";
import { Button, Flex, Input } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) => (!value.length ? "Username is required" : undefined),
      password: (value) => (!value.length ? "Password is required" : undefined),
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: loginUser,
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

  const onSubmit = (values: Omit<UserData, "country">) => mutate(values);

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

        <Input.Wrapper error={form.errors.password} label="Password">
          <Input
            key={form.key("password")}
            type="password"
            {...form.getInputProps("password")}
          />
        </Input.Wrapper>

        <Button variant="filled" type="submit" loading={isPending}>
          Login
        </Button>
      </Flex>
    </form>
  );
};
