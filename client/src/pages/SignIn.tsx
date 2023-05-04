import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import userApis from "lib/api/modules/user.api";

import { toast } from "react-toastify";
import { Box, Button, Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const SignIn = () => {
  const navigation = useNavigate();
  const [isRequest, setIsRequest] = React.useState<boolean>(false);

  const form = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .required("아이디 또는 사용자 이름은 필수 입력 사항입니다.")
        .min(6)
        .max(15),
      password: yup
        .string()
        .required("비밀 번호는 필수 입력 사항입니다.")
        .min(8),
    }),
    onSubmit: (values) => onSignIn(values),
  });

  const onSignIn = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    if (isRequest) return;
    setIsRequest(true);

    const { response, error } = await userApis.signIn({ username, password });

    setIsRequest(false);

    if (response) {
      localStorage.setItem("tkgpt", response.token);
      navigation("/");
    }
    if (error) toast.error(error.message);
  };
  return (
    <Box component="form" noValidate onSubmit={form.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          placeholder="username"
          name="username"
          value={form.values.username}
          onChange={form.handleChange}
          error={form.touched.username && form.errors.username != undefined}
          helperText={form.touched.username && form.errors.username}
        />
        <TextField
          fullWidth
          type="password"
          placeholder="password"
          name="password"
          value={form.values.password}
          onChange={form.handleChange}
          error={form.touched.password && form.errors.password != undefined}
          helperText={form.touched.password && form.errors.password}
        />
        <LoadingButton
          type="submit"
          size="large"
          variant="contained"
          loading={isRequest}
          color="success"
        >
          signin
        </LoadingButton>
        <Button component={Link} to="/signup" size="small">
          signup
        </Button>
      </Stack>
    </Box>
  );
};

export default SignIn;
