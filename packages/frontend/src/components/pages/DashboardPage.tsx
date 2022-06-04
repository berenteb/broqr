import React, { useEffect, useState } from "react";
import { AdminPage } from "../layout/AdminPage";
import {
  Button,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { Link } from "../../types/link";
import { useAuthContext } from "../../utils/useAuthContext";
import { useServiceContext } from "../../utils/useServiceContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../utils/configurations";
import { GetAuthHeader } from "../../utils/getAuthHeader";
import { ErrorTypes } from "../../utils/ServiceContext";
import { FaRedo } from "react-icons/fa";
import { AbsolutePaths } from "../../utils/paths";

export const DashboardPage: React.FC = () => {
  const [links, setLinks] = useState<Link[] | undefined>();
  const { token } = useAuthContext();
  const { displayMessage } = useServiceContext();
  const getLinks = () => {
    if (token) {
      axios
        .get<Link[]>(`${API_BASE_URL}/link`, GetAuthHeader(token))
        .then((res) => {
          setLinks(res.data);
        })
        .catch(() => {
          displayMessage("Nem sikerült lekérni a linkeket.", {
            type: ErrorTypes.ADMIN,
          });
        });
    }
  };
  useEffect(() => {
    getLinks();
  }, [token, setLinks]);
  return (
    <AdminPage
      heading="Vezérlőpult"
      rightComponent={
        <Button
          colorScheme="theme"
          variant="ghost"
          leftIcon={<FaRedo />}
          onClick={getLinks}
        >
          Frissítés
        </Button>
      }
    >
      {links && links?.length > 0 ? (
        <Wrap>
          {links?.map((link) => (
            <LinkStatField link={link} key={link._id} />
          ))}
        </Wrap>
      ) : (
        <Text>Nincs megjeleníthető adat.</Text>
      )}
    </AdminPage>
  );
};

const LinkStatField: React.FC<{ link: Link }> = ({ link }) => {
  const navigate = useNavigate();
  return (
    <Stat
      borderRadius="md"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.200"
      px={5}
      py={3}
      _hover={{ boxShadow: "lg" }}
      transition="all .2s ease"
      cursor="pointer"
      onClick={() => {
        navigate(`${AbsolutePaths.LINK}/${link._id}`);
      }}
    >
      <StatLabel>{link.name}</StatLabel>
      <StatNumber>{link.timestamps?.length || "N/A"}</StatNumber>
      <StatHelpText>átirányítás</StatHelpText>
    </Stat>
  );
};
