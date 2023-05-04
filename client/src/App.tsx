import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthRoute from "components/AuthRoute";
import ProtectedRoute from "components/ProtectedRoute";
import Home from "pages/Home";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";

function App() {
  const theme = createTheme({
    palette: { mode: "dark" },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* mui reset css */}
        <CssBaseline />
        <ToastContainer
          position="bottom-left"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnHover
        />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <AuthRoute>
                  <SignIn />
                </AuthRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthRoute>
                  <SignUp />
                </AuthRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
