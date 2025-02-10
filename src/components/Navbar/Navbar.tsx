import { Box, NavLink } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FaMicrophoneAlt } from "react-icons/fa";

const data = [
  {
    icon: FaMicrophoneAlt,
    label: "Top Charting Artists",
    href: "/top-charting-artists",
  },
  { icon: CiLogout, label: "Logout" },
];

export const Navbar = () => {
  const [active, setActive] = useState(0);
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/logoutUser", {
      method: "POST",
    });

    router.push("/");

    localStorage.removeItem("user");

    notifications.show({
      title: "Success",
      message: "User logged out successfully",
      color: "green",
    });
  };

  const items = data.map((item, index) => (
    <NavLink
      key={`${item.label}-${index}`}
      active={index === active}
      label={item.label}
      leftSection={<item.icon size={16} />}
      onClick={() => {
        if (item.href) {
          setActive(index);
          router.push(item.href);
        }

        if (item.label === "Logout") {
          logout();
        }
      }}
      variant="filled"
    />
  ));

  return <Box w={220}>{items}</Box>;
};
