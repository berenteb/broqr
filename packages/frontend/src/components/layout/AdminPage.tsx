import React, { ReactElement } from "react";
import { Page } from "./Page";
import { Flex, Heading } from "@chakra-ui/react";
import { ChildProp } from "../../types/childProp";
import { Tiers } from "../../types/tiers";
import { useAuthContext } from "../../utils/useAuthContext";
import { useNavigate } from "react-router-dom";
import { AbsolutePaths } from "../../utils/paths";

type AdminPageProps = {
  heading: string;
  rightComponent?: ReactElement;
  tiers?: Tiers[];
};

export const AdminPage: React.FC<AdminPageProps & ChildProp> = ({
  children,
  heading,
  rightComponent,
  tiers = [],
}) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  if (!user) {
    navigate(AbsolutePaths.LOGIN);
    return null;
  }
  if (tiers?.length > 0 && !tiers?.includes(user.tier)) {
    navigate(AbsolutePaths.DASHBOARD);
    return null;
  }
  return (
    <Page
      backgroundColor="white"
      borderRadius="lg"
      loginRequired
      width="100%"
      maxHeight="m"
      mt={5}
      overflow="auto"
    >
      <Flex justify="space-between" align="center" mb={5}>
        <Heading as="h2">{heading}</Heading>
        {rightComponent}
      </Flex>
      {children}
    </Page>
  );
};
