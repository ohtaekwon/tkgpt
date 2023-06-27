import React from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import userApis from "lib/api/modules/user.api";
import Loading from "./Loading";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const checkToken = async () => {
      setIsLoading(true);
      const { response, error } = await userApis.checkToken();

      if (error) {
        localStorage.removeItem("tkgpt");
        navigation("/signin");
      }

      if (response) {
        localStorage.setItem("tkgpt", response.username);
        setIsLoading(false);
      }
    };

    const token = localStorage.getItem("tkgpt");

    if (token) checkToken();
    else navigation("/signin");
  }, [navigation]);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && <Box sx={{ height: "100vh" }}>{children}</Box>}
    </>
  );
};

export default ProtectedRoute;
