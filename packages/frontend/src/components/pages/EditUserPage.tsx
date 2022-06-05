import React, { useEffect, useState } from "react";
import { AdminPage } from "../layout/AdminPage";
import { Button, ButtonGroup, Input, Select } from "@chakra-ui/react";
import { useAuthContext } from "../../utils/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../utils/configurations";
import { useServiceContext } from "../../utils/useServiceContext";
import { GetAuthHeader } from "../../utils/getAuthHeader";
import { ErrorTypes } from "../../utils/ServiceContext";
import { LinkButton } from "../elements/LinkButton";
import { AbsolutePaths } from "../../utils/paths";
import { Tiers } from "../../types/tiers";
import { User } from "../../types/user";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";

export const EditUserPage: React.FC = () => {
  const [user, setUser] = useState<User | undefined>();
  const { token } = useAuthContext();
  const { displayMessage } = useServiceContext();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { register, handleSubmit, reset } = useForm<User>({
    defaultValues: user,
  });
  const getUser = () => {
    if (token && userId) {
      axios
        .get<User>(`${API_BASE_URL}/user/${userId}`, GetAuthHeader(token))
        .then((res) => {
          setUser(res.data);
          reset(res.data);
        })
        .catch(() => {
          displayMessage("Nem sikerült lekérni a felhasználót.", {
            type: ErrorTypes.ADMIN,
          });
        });
    }
  };
  const onSubmit = (values: User) => {
    if (token && values._id) {
      axios
        .post(
          `${API_BASE_URL}/user/${values._id}`,
          values,
          GetAuthHeader(token)
        )
        .then(() => {
          navigate(AbsolutePaths.USER);
        })
        .catch(() => {
          displayMessage("Nem sikerült módosítani a felhasználót.", {
            toast: true,
            toastStatus: "error",
          });
        });
    }
  };
  useEffect(() => {
    getUser();
  }, [token, setUser]);
  return (
    <AdminPage heading="Felhasználó szerkesztése">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Név"
          {...register("username", { required: true })}
        />
        <Select {...register("tier", { required: true })} mt={5}>
          {Object.keys(Tiers).map((t) => (
            <option value={t.toLowerCase()} key={t}>
              {t}
            </option>
          ))}
        </Select>
        <ButtonGroup mt={5}>
          <Button type="submit" leftIcon={<FaSave />} colorScheme="theme">
            Mentés
          </Button>
          <LinkButton
            url={AbsolutePaths.USER}
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
