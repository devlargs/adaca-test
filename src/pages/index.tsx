import { LoginForm } from "@/components/LoginForm/LoginForm";
import { SignupForm } from "@/components/SignupForm";
import { Center, Paper, Tabs, Text } from "@mantine/core";
import { FaUserLock, FaUserPlus } from "react-icons/fa";

export default function Home() {
  return (
    <Center maw="100vw" h="100vh">
      <Paper shadow="xl" p="xl">
        <Tabs defaultValue="login">
          <Tabs.List>
            <Tabs.Tab value="login" leftSection={<FaUserLock />}>
              <Text size="xl">Login</Text>
            </Tabs.Tab>
            <Tabs.Tab value="signup" leftSection={<FaUserPlus />}>
              <Text size="xl">Signup</Text>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="login">
            <LoginForm />
          </Tabs.Panel>

          <Tabs.Panel value="signup">
            <SignupForm />
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </Center>
  );
}
