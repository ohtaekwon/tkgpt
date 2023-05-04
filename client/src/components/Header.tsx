import React from "react";
import { Box } from "@mui/material";

const Header = ({
  bg,
  borderBottom,
  children,
}: React.PropsWithChildren<{ bg?: boolean; borderBottom?: boolean }>) => {
  return (
    <Box
      sx={{
        zIndex: 2,
        width: "100%",
        height: 60,
        bgcolor: `${bg! && "#000"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: `${borderBottom! && "1px solid #2c2c2c"}`,
      }}
    >
      {children}
    </Box>
  );
};

export default Header;
