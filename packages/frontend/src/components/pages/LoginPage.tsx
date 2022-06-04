import React, { useEffect, useState } from "react";
import { Page } from "../layout/Page";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LinkButton } from "../elements/LinkButton";
import { AbsolutePaths } from "../../utils/paths";
import { useForm } from "react-hook-form";
import { LoginDTO } from "../../types/login";
import axios from "axios";
import { API_BASE_URL } from "../../utils/configurations";
import { TokenDTO } from "../../types/tokenDto";
import { useAuthContext } from "../../utils/useAuthContext";
import { WarningIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useServiceContext } from "../../utils/useServiceContext";

export function LoginPage() {
  const [authError, setAuthError] = useState<string | undefined>();
  const { login, user, token } = useAuthContext();
  const { displayMessage } = useServiceContext();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginDTO>();
  const onSubmit = (values: LoginDTO) => {
    axios
      .post<TokenDTO>(`${API_BASE_URL}/login`, values)
      .then((res) => {
        if (res.status === 200) {
          login(res.data.token);
          navigate(AbsolutePaths.DASHBOARD);
        } else {
          setAuthError("Sikertelen bejelentkezés!");
        }
      })
      .catch(() => {
        setAuthError("Sikertelen bejelentkezés!");
      });
  };
  useEffect(() => {
    if (user && token) {
      displayMessage("Üdvözlünk!", { toast: true, toastStatus: "success" });
      navigate(AbsolutePaths.DASHBOARD);
    }
  }, [user, token]);
  return (
    <Page flex={1} justify="center" align="center">
      <Box
        backgroundColor="white"
        borderRadius="xl"
        boxShadow="lg"
        padding={10}
      >
        <Heading as="h2" color="theme.500" mt={0} mb={0}>
          BroQR bejelentkezés
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <Input
              {...register("username", { required: true })}
              placeholder="Felhasználónév"
              mt={10}
            />
            <Input
              {...register("password", { required: true })}
              placeholder="Jelszó"
              type="password"
            />
          </VStack>
          {authError && (
            <Flex color="red.500" alignItems="center" mt={5}>
              <WarningIcon mr={1} />
              <Text m={0}>{authError}</Text>
            </Flex>
          )}
          <ButtonGroup justifyContent="space-between" width="100%" mt={5}>
            <Button type="submit" colorScheme="theme">
              Bejelentkezés
            </Button>
            <LinkButton
              url={AbsolutePaths.REGISTER}
              colorScheme="theme"
              variant="ghost"
            >
              Regisztráció
            </LinkButton>
          </ButtonGroup>
        </form>
      </Box>
    </Page>
  );
}
