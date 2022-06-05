import React, { useEffect, useState } from "react";
import { AdminPage } from "../layout/AdminPage";
import { GridItem } from "@chakra-ui/react";
import { Record, RecordGrid, SeparatorGridItem } from "../elements/Record";
import { useAuthContext } from "../../utils/useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../utils/configurations";
import { useServiceContext } from "../../utils/useServiceContext";
import { GetAuthHeader } from "../../utils/getAuthHeader";
import { ErrorTypes } from "../../utils/ServiceContext";
import { AbsolutePaths } from "../../utils/paths";
import { Tiers } from "../../types/tiers";
import { User } from "../../types/user";

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[] | undefined>();
  const { token } = useAuthContext();
  const { displayMessage } = useServiceContext();
  const navigate = useNavigate();
  const getUsers = () => {
    if (token) {
      axios
        .get<User[]>(`${API_BASE_URL}/users`, GetAuthHeader(token))
        .then((res) => {
          setUsers(res.data);
        })
        .catch(() => {
          displayMessage("Nem sikerült lekérni a felhasználókat.", {
            type: ErrorTypes.ADMIN,
          });
        });
    }
  };
  const onEdit = (id: string) => {
    navigate(AbsolutePaths.EDIT_USER + "/" + id);
  };
  useEffect(() => {
    getUsers();
  }, [token, setUsers]);
  return (
    <AdminPage tiers={[Tiers.ADMIN, Tiers.FREE]} heading="Felhasználók">
      <RecordGrid colCount={2}>
        <GridItem>Név</GridItem>
        <GridItem>Szint</GridItem>
        <GridItem />
        <SeparatorGridItem width={3} />
        {users?.map((u) => (
          <Record
            key={u._id}
            colCount={2}
            onEdit={() => {
              onEdit(u._id);
            }}
          >
            <GridItem>{u.username}</GridItem>
            <GridItem>{u.tier}</GridItem>
          </Record>
        ))}
      </RecordGrid>
    </AdminPage>
  );
};
