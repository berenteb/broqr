import React from "react";
import { Flex } from "@chakra-ui/react";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";
import { Outlet } from "react-router-dom";
import { Route, Routes } from "react-router";
import { Paths } from "../../utils/paths";
import { LinksPage } from "../pages/LinksPage";
import { DashboardPage } from "../pages/DashboardPage";
import { ErrorPage } from "../pages/ErrorPage";
import { EditLinkPage } from "../pages/EditLinkPage";
import { Footer } from "../elements/Footer";
import { LinkPage } from "../pages/LinkPage";
import { useAuthContext } from "../../utils/useAuthContext";
import { ProfilePage } from "../pages/ProfilePage";

export const AdminWrapper: React.FC = () => {
  return (
    <Flex
      flexDirection="row"
      mx="auto"
      px={5}
      pt={5}
      justify="center"
      width={["100%", "48rem", "48rem", "64rem"]}
      height="100%"
      flex={1}
    >
      <Outlet />
      <SideBar />
      <Flex
        align="center"
        justify="space-between"
        flexDirection="column"
        mx={5}
        maxWidth="100%"
        height="100%"
        flex={1}
      >
        <Flex
          flexDirection="column"
          align="center"
          justify="flex-start"
          flex={1}
          width="100%"
          height="90%"
        >
          <TopBar />
          <Routes>
            <Route path={Paths.LINK}>
              <Route path={":linkId"} element={<LinkPage />} />
              <Route
                path={Paths.EDIT + "/:linkId"}
                element={<EditLinkPage />}
              />
              <Route index element={<LinksPage />} />
            </Route>
            <Route path={Paths.PROFILE} element={<ProfilePage />} />
            <Route path={Paths.ERROR} element={<ErrorPage />} />
            <Route index element={<DashboardPage />} />
          </Routes>
        </Flex>
        <Footer />
      </Flex>
    </Flex>
  );
};
