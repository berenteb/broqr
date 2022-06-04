import React, { useState } from "react";
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

export function RegisterPage() {
  const [authError, setAuthError] = useState<string | undefined>();
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginDTO & { passwordRepeat: string }>();
  const onSubmit = (values: LoginDTO & { passwordRepeat: string }) => {
    if (values.password !== values.passwordRepeat) {
      setError("passwordRepeat", { message: "A jelszavak nem egyeznek." });
      return;
    }
    axios
      .post<TokenDTO>(`${API_BASE_URL}/register`, {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        login(res.data.token);
        navigate(AbsolutePaths.DASHBOARD);
      })
      .catch(() => {
        setAuthError("Sikertelen regisztráció!");
      });
  };
  return (
    <Page flex={1} justify="center" align="center">
      <Box
        backgroundColor="white"
        borderRadius="xl"
        boxShadow="lg"
        padding={10}
      >
        <Heading as="h2" color="theme.500" mt={0} mb={0}>
          BroQR regisztráció
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
            <Input
              {...register("passwordRepeat", { required: true })}
              placeholder="Jelszó megerősítése"
              type="password"
            />
            {errors.passwordRepeat?.message && (
              <Flex color="red.500" alignItems="center" mt={5}>
                <WarningIcon mr={1} />
                <Text m={0}>{errors.passwordRepeat?.message}</Text>
              </Flex>
            )}
          </VStack>
          {authError && (
            <Flex color="red.500" alignItems="center" mt={5}>
              <WarningIcon mr={1} />
              <Text m={0}>{authError}</Text>
            </Flex>
          )}
          <ButtonGroup justifyContent="space-between" width="100%" mt={5}>
            <Button type="submit" colorScheme="theme">
              Regisztráció
            </Button>
            <LinkButton
              url={AbsolutePaths.LOGIN}
              colorScheme="theme"
              variant="ghost"
            >
              Bejelentkezés
            </LinkButton>
          </ButtonGroup>
        </form>
      </Box>
    </Page>
  );
}
