import React, { ReactNode } from "react";
import { Page } from "../layout/Page";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { LinkButton } from "../elements/LinkButton";
import { AbsolutePaths } from "../../utils/paths";
import { ReactComponent as InterfaceIllustration } from "../illustrations/interface.svg";
import { ReactComponent as LinkIllustration } from "../illustrations/link.svg";
import { Footer } from "../elements/Footer";

export function MainPage() {
  return (
    <Page w="100%" h="100%" justifyContent="space-between">
      <Box>
        <Flex
          justifyContent="space-between"
          w="100%"
          flexDirection={["column", "row"]}
        >
          <Flex alignItems="center">
            <Image src="/img/logo.png" h={10} />
            <Heading color="theme.500" ml={3}>
              BroQR
            </Heading>
          </Flex>
          <Flex mt={[10, 0]} justifyContent="center">
            <LinkButton
              variant="link"
              colorScheme="theme"
              url={AbsolutePaths.REGISTER}
              mr={5}
            >
              Regisztráció
            </LinkButton>
            <LinkButton colorScheme="theme" url={AbsolutePaths.LOGIN}>
              Bejelentkezés
            </LinkButton>
          </Flex>
        </Flex>
        <MainPageSection
          title="Link rövidítés egyszerűen"
          text="Csak illeszd be az URL-t, mentsd el és oszd meg! Vagy ami még jobb: csinálj saját gyorsműveletet a fiókodhoz tartozó API kulccsal!"
          image={
            <LinkIllustration height="20rem" style={{ maxWidth: "100%" }} />
          }
        />
        <MainPageSection
          title="Mindig veled van"
          text="Hozz létre újat vagy szerkeszd meglévő URL rövidítéseidet pár kattintással, bármilyen eszközön, kényelmesen!"
          imagePos="left"
          image={
            <InterfaceIllustration
              height="20rem"
              style={{ maxWidth: "100%" }}
            />
          }
        />
      </Box>
      <Footer />
    </Page>
  );
}
interface MainPageSectionProps {
  title: string;
  text: string;
  image: ReactNode;
  imagePos?: "left" | "right";
}
const MainPageSection: React.FC<MainPageSectionProps> = ({
  title,
  text,
  imagePos = "right",
  image,
}) => {
  return (
    <Flex
      mt={20}
      mx={[5, 0]}
      alignItems="center"
      justifyContent="space-between"
      flexDirection={["column", imagePos === "left" ? "row-reverse" : "row"]}
    >
      <Box>
        <Heading as="h2" color="theme.800">
          {title}
        </Heading>
        <Text mt={5} color="gray.500">
          {text}
        </Text>
      </Box>
      {image}
    </Flex>
  );
};
