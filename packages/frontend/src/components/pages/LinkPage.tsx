import React, { useEffect, useMemo, useState } from "react";
import { AdminPage } from "../layout/AdminPage";
import { Box, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import { Link } from "../../types/link";
import { useAuthContext } from "../../utils/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, SERIVCE_URL } from "../../utils/configurations";
import { useServiceContext } from "../../utils/useServiceContext";
import { GetAuthHeader } from "../../utils/getAuthHeader";
import { ErrorTypes } from "../../utils/ServiceContext";
import { AbsolutePaths } from "../../utils/paths";
import { FaRedo } from "react-icons/fa";
import { Loading } from "../../utils/Loading";
import { SimpleLink } from "../elements/SimpleLink";
import { LinkStatistics } from "../../types/statistics";
import {
  BarElement,
  CategoryScale,
  Chart,
  ChartData,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { theme } from "../../theme/theme";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip);

export const LinkPage: React.FC = () => {
  const [link, setLink] = useState<Link | undefined>();
  const [linkStat, setLinkStat] = useState<LinkStatistics[] | undefined>();
  const convertedStat = useMemo<ChartData<"bar", number[], string>>(() => {
    return {
      labels: linkStat?.map((ls) => ls.name) || [],
      datasets: [
        {
          data: linkStat?.map((ls) => ls.value) || [],
          backgroundColor: theme.colors.theme["500"],
        },
      ],
    };
  }, [linkStat]);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAuthContext();
  const { displayMessage } = useServiceContext();
  const navigate = useNavigate();
  const { linkId } = useParams();
  const getLink = () => {
    if (token && linkId) {
      setLoading(true);
      axios
        .get<Link>(`${API_BASE_URL}/link/${linkId}`, GetAuthHeader(token))
        .then((res) => {
          setLink(res.data);
        })
        .catch(() => {
          displayMessage("Nem sikerült lekérni a linket.", {
            type: ErrorTypes.ADMIN,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate(AbsolutePaths.LINK);
    }
  };
  const getStatistics = () => {
    if (token && linkId) {
      axios
        .get<LinkStatistics[]>(
          `${API_BASE_URL}/link/statistics/${linkId}/10`,
          GetAuthHeader(token)
        )
        .then((res) => {
          setLinkStat(res.data);
        })
        .catch(() => {
          if (link)
            displayMessage("Nem sikerült lekérni a link statisztikákat.", {
              toast: true,
              type: ErrorTypes.ADMIN,
            });
        });
    } else {
      navigate(AbsolutePaths.LINK);
    }
  };
  useEffect(() => {
    getLink();
    getStatistics();
  }, [token]);
  if (loading || !link) return <Loading />;
  const shortUrl = SERIVCE_URL + "/" + link.shortId;
  return (
    <AdminPage
      heading={link.name || "Ismeretlen link"}
      rightComponent={
        <Button
          colorScheme="theme"
          variant="ghost"
          leftIcon={<FaRedo />}
          onClick={() => {
            getLink();
            getStatistics();
          }}
        >
          Frissítés
        </Button>
      }
    >
      <Grid templateColumns="repeat(2, auto)" width="fit-content" gap={5}>
        <GridItem>Cél URL:</GridItem>
        <GridItem>
          <SimpleLink url={link.url}>{link.url}</SimpleLink>
        </GridItem>
        <GridItem>Rövidített URL:</GridItem>
        <GridItem>
          <SimpleLink url={shortUrl}>{shortUrl}</SimpleLink>
        </GridItem>
      </Grid>
      {linkStat && (
        <>
          <Box width="100%" mt={10}>
            <Bar
              data={convertedStat}
              options={{
                responsive: true,
                scales: { y: { ticks: { stepSize: 1 } } },
              }}
            />
          </Box>
          <Text color="gray.500" align="center" fontSize="sm" mt={5}>
            Átirányítások száma 10 napra vetítve, saját kattintásokkal.
          </Text>
        </>
      )}
    </AdminPage>
  );
};
