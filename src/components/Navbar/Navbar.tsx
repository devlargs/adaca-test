import { Box, NavLink } from "@mantine/core";
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
  { icon: CiLogout, label: "Logout", href: "/" },
];

export const Navbar = () => {
  const [active, setActive] = useState(0);
  const router = useRouter();

  const items = data.map((item, index) => (
    <NavLink
      key={`${item.label}-${index}`}
      active={index === active}
      label={item.label}
      leftSection={<item.icon size={16} />}
      onClick={() => {
        setActive(index);
        router.push(item.href);
      }}
      variant="filled"
    />
  ));

  return <Box w={220}>{items}</Box>;
};
