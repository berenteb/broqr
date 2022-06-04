import React, { useEffect, useState } from "react";
import { AdminPage } from "../layout/AdminPage";
import { Button, ButtonGroup, Input } from "@chakra-ui/react";
import { Link } from "../../types/link";
import { useAuthContext } from "../../utils/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../utils/configurations";
import { useServiceContext } from "../../utils/useServiceContext";
import { GetAuthHeader } from "../../utils/getAuthHeader";
import { ErrorTypes } from "../../utils/ServiceContext";
import { AbsolutePaths } from "../../utils/paths";
import { FaSave } from "react-icons/fa";
import { LinkButton } from "../elements/LinkButton";
import { useForm } from "react-hook-form";

export const EditLinkPage: React.FC = () => {
  const [link, setLink] = useState<Link | undefined>();
  const { token } = useAuthContext();
  const { displayMessage } = useServiceContext();
  const navigate = useNavigate();
  const { linkId } = useParams();
  const { register, handleSubmit, reset } = useForm<Link>({
    defaultValues: link || { _id: "new" },
  });
  const getLink = () => {
    if (token && linkId !== "new") {
      axios
        .get<Link>(`${API_BASE_URL}/link/${linkId}`, GetAuthHeader(token))
        .then((res) => {
          setLink(res.data);
          reset(res.data);
        })
        .catch(() => {
          displayMessage("Nem sikerült lekérni a linket.", {
            type: ErrorTypes.ADMIN,
          });
        });
    }
  };
  const onSubmit = (values: Link) => {
    if (token) {
      if (values._id !== "new") {
        axios
          .post(
            `${API_BASE_URL}/link/${values._id}`,
            values,
            GetAuthHeader(token)
          )
          .then(() => {
            navigate(AbsolutePaths.LINK);
          })
          .catch(() => {
            displayMessage("Nem sikerült módosítani a linket.", {
              toast: true,
              toastStatus: "error",
            });
          });
      } else {
        axios
          .put(`${API_BASE_URL}/link`, values, GetAuthHeader(token))
          .then(() => {
            navigate(AbsolutePaths.LINK);
          })
          .catch(() => {
            displayMessage("Nem sikerült létrehozni a linket.", {
              toast: true,
              toastStatus: "error",
            });
          });
      }
    }
  };
  useEffect(() => {
    getLink();
  }, [token, setLink]);
  return (
    <AdminPage heading="Új link">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Név" {...register("name", { required: true })} />
        <Input
          placeholder="Cél URL"
          mt={5}
          {...register("url", { required: true })}
        />
        <ButtonGroup mt={5}>
          <Button type="submit" leftIcon={<FaSave />} colorScheme="theme">
            Mentés
          </Button>
          <LinkButton
            url={AbsolutePaths.LINK}
            colorScheme="theme"
            variant="ghost"
          >
            Mégse
          </LinkButton>
        </ButtonGroup>
      </form>
    </AdminPage>
  );
};
