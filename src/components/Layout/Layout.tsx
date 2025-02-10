import { Navbar } from "@/components/Navbar";
import {
  ActionIcon,
  AppShell,
  Burger,
  Flex,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC, ReactElement } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Flex
          align="center"
          style={{ height: 60 }}
          p="md"
          gap={16}
          justify="space-between"
        >
          <Flex gap={10} align="center">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Text>MusixMatch</Text>
          </Flex>
          <ActionIcon
            variant="subtle"
            color="blue"
            aria-label="Settings"
            onClick={() =>
              setColorScheme(colorScheme === "light" ? "dark" : "light")
            }
          >
            {typeof window !== "undefined" && colorScheme === "light" ? (
              <LuMoon />
            ) : (
              <LuSun />
            )}
          </ActionIcon>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
