import {
  Box,
  Collapse,
  Flex,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { MobileNav } from "./MobileNav";
import React from "react";

type NavbarProps = {};

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box fontFamily="heading" display={["block", "block", "none"]}>
      <Flex>
        <IconButton
          onClick={onToggle}
          icon={
            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
          }
          variant="ghost"
          aria-label="Navigáció megnyitása"
          colorScheme="theme"
        />
      </Flex>
      {/*The method in onClick hides the menu items when a menu item is clicked. Works for collapsible items too!*/}
      <Collapse
        in={isOpen}
        animateOpacity
        onClick={(evt) => {
          if ((evt.target as Element).closest(".navitem")) onToggle();
        }}
      >
        <MobileNav />
      </Collapse>
    </Box>
  );
};
