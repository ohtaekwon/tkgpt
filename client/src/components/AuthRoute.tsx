import React from "react";
import { useNavigate } from "react-router-dom";
import userApis from "lib/api/modules/user.api";

import Loading from "./Loading";
import { Box, Container, Typography } from "@mui/material";
import Header from "./Header";

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const checkToken = async () => {
      setIsLoading(true);
      const { response, error } = await userApis.checkToken();

      if (error) {
        localStorage.removeItem("tkgpt");
        setIsLoading(false);
      }

      if (response) navigation("/");
    };
    const token = localStorage.getItem("tkn");
    if (token) checkToken();
    else setIsLoading(false);
  }, [navigation]);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <Container
          component="main"
          maxWidth="md"
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Header>
            <Typography variant="h5" fontWeight="600">
              AI Chat
            </Typography>
          </Header>

          <Box width="100%">{children}</Box>

          <Box padding={2}>
            <Typography variant="caption" color="primary">
              tkgpt
            </Typography>
          </Box>
        </Container>
      )}
    </>
  );
};

export default AuthRoute;
