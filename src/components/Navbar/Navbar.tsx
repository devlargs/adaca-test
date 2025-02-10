import { Box, NavLink } from "@mantine/core";
import { useState } from "react";
import { FaMicrophoneAlt } from "react-icons/fa";

const data = [
  { icon: FaMicrophoneAlt, label: "Top Charting Artists", href: "/" },
  { icon: FaMicrophoneAlt, label: "Logout", href: "/logout" },
];

export const Navbar = () => {
  const [active, setActive] = useState(0);

  const items = data.map((item, index) => (
    <NavLink
      key={`${item.label}-${index}`}
      active={index === active}
      label={item.label}
      leftSection={<item.icon size={16} />}
      onClick={() => {
        setActive(index);
      }}
      variant="filled"
    />
  ));

  return <Box w={220}>{items}</Box>;
};
