import { Flex, Stack, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { AbsolutePaths } from "../../../utils/paths";
import { FaLink, FaTh, FaUser } from "react-icons/fa";
import { useAuthContext } from "../../../utils/useAuthContext";
import { Tiers } from "../../../types/tiers";

type NavItem = {
  label: string;
  href: string;
  leftIcon?: ReactElement;
};

const MobileNavItem: React.FC<NavItem> = ({ label, href, leftIcon }) => {
  const location = useLocation();
  return (
    <Link to={href} className={"navitem"}>
      <Flex
        py={1}
        px={4}
        align="center"
        backgroundColor={location.pathname === href ? "white" : undefined}
        color={location.pathname === href ? "theme.500" : "gray.500"}
        borderRadius="md"
        _hover={{
          textDecoration: "none",
        }}
      >
        {leftIcon}
        <Text ml={2} my={0}>
          {label}
        </Text>
      </Flex>
    </Link>
  );
};

export const MobileNav: React.FC = () => {
  const { user } = useAuthContext();
  return (
    <Stack p={2}>
      <MobileNavItem
        leftIcon={<FaTh />}
        label="Vezérlőpult"
        href={AbsolutePaths.DASHBOARD}
      />
      <MobileNavItem
        leftIcon={<FaLink />}
        label="Linkek"
        href={AbsolutePaths.LINK}
      />
      {user?.tier === Tiers.ADMIN && (
        <MobileNavItem
          leftIcon={<FaUser />}
          label="Felhasználók"
          href={AbsolutePaths.USER}
        />
      )}
    </Stack>
  );
};
