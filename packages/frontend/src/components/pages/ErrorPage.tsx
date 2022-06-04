import React, { useEffect, useState } from "react";
import { ButtonGroup, Heading, Text } from "@chakra-ui/react";
import { useServiceContext } from "../../utils/useServiceContext";
import { ErrorTypes } from "../../utils/ServiceContext";
import { AdminPage } from "../layout/AdminPage";
import { LinkButton } from "../elements/LinkButton";
import { AbsolutePaths } from "../../utils/paths";
import { Page } from "../layout/Page";

export const ErrorPage: React.FC = () => {
  const { clearError, error, errorType } = useServiceContext();
  const [clonedError, setClonedError] = useState<string | undefined>("");
  const [clonedErrorType, setClonedErrorType] = useState<ErrorTypes>(
    ErrorTypes.GENERAL
  );
  useEffect(() => {
    // Cloning the error is needed to clear the error globally
    setClonedError(error);
    setClonedErrorType(errorType || ErrorTypes.GENERAL);
    // Clear the error from the context since the user has already been notified, and prepare for navigation
    clearError();
    // No need for deps because the clearError would clear this error page too
  }, []);
  // If there is no error ATM, redirect to home page
  if (!clonedError) {
    // return <Navigate to="/login" />
  }
  // Display authentication page for the corresponding error type
  if (clonedErrorType === ErrorTypes.ADMIN) {
    return (
      <AdminPage heading="Hiba történt">
        <Text textAlign="center" color="gray.500" marginTop={10}>
          {clonedError}
        </Text>
        <ButtonGroup justifyContent="center" marginTop={10}>
          <LinkButton url={AbsolutePaths.DASHBOARD} colorScheme="theme">
            Dashboard
          </LinkButton>
        </ButtonGroup>
      </AdminPage>
    );
  } else {
    return (
      <Page>
        <Heading as="h1">Hiba történt</Heading>
        <Text textAlign="center" color="gray.500" marginTop={10}>
          {clonedError}
        </Text>
        <ButtonGroup justifyContent="center" marginTop={10}>
          <LinkButton url={AbsolutePaths.MAIN} colorScheme="theme">
            Főoldal
          </LinkButton>
        </ButtonGroup>
      </Page>
    );
  }
};
