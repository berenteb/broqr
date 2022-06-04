import React, { useEffect, useState } from "react";
import { AdminPage } from "../layout/AdminPage";
import { GridItem } from "@chakra-ui/react";
import { Record, RecordGrid, SeparatorGridItem } from "../elements/Record";
import { Link } from "../../types/link";
import { useAuthContext } from "../../utils/useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../utils/configurations";
import { useServiceContext } from "../../utils/useServiceContext";
import { GetAuthHeader } from "../../utils/getAuthHeader";
import { ErrorTypes } from "../../utils/ServiceContext";
import { LinkButton } from "../elements/LinkButton";
import { AbsolutePaths } from "../../utils/paths";
import { PlusSquareIcon } from "@chakra-ui/icons";

export const LinksPage: React.FC = () => {
  const [links, setLinks] = useState<Link[] | undefined>();
  const { token } = useAuthContext();
  const { displayMessage } = useServiceContext();
  const navigate = useNavigate();
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
  const onDelete = (id: string) => {
    if (token) {
      axios
        .delete(`${API_BASE_URL}/link/${id}`, GetAuthHeader(token))
        .then(() => {
          getLinks();
        })
        .catch(() => {
          displayMessage("Nem sikerült törölni a linkeket.", {
            toast: true,
            toastStatus: "error",
          });
        });
    }
  };
  const onEdit = (id: string) => {
    navigate(AbsolutePaths.EDIT_LINK + "/" + id);
  };
  useEffect(() => {
    getLinks();
  }, [token, setLinks]);
  return (
    <AdminPage
      heading="Linkek"
      rightComponent={
        <LinkButton
          url={AbsolutePaths.EDIT_LINK + "/new"}
          colorScheme="theme"
          leftIcon={<PlusSquareIcon />}
        >
          Új Link
        </LinkButton>
      }
    >
      <RecordGrid colCount={3}>
        <GridItem>Név</GridItem>
        <GridItem>Cél URL</GridItem>
        <GridItem>Azonosító</GridItem>
        <GridItem />
        <SeparatorGridItem width={4} />
        {links?.map((link) => (
          <Record
            key={link._id}
            colCount={3}
            onDelete={() => {
              onDelete(link._id);
            }}
            onEdit={() => {
              onEdit(link._id);
            }}
            entityPageUrl={AbsolutePaths.LINK + "/" + link._id}
          >
            <GridItem>{link.name}</GridItem>
            <GridItem>{link.url}</GridItem>
            <GridItem>{link.shortId}</GridItem>
          </Record>
        ))}
      </RecordGrid>
    </AdminPage>
  );
};
