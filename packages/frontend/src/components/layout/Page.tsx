import React from "react";
import { Container } from "./Container";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../utils/useAuthContext";
import { FlexProps } from "@chakra-ui/react";
import { ChildProp } from "../../types/childProp";

type PageProps = {
  loginRequired?: boolean;
};

export const Page: React.FC<PageProps & FlexProps & ChildProp> = ({
  loginRequired,
  children,
  ...props
}) => {
  return (
    <Container {...props}>
      <Outlet />
      {children}
    </Container>
  );
};
