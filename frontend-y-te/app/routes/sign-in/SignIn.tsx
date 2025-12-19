import { useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/SignIn";
import {
  Box,
  Card,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  LoginForm,
  type LoginFormValues,
} from "../../components/auth/LoginForm";
import { login } from "../../services/authService";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Đăng nhập - Trạm y tế" },
    {
      name: "description",
      content: "Đăng nhập vào hệ thống quản lý trạm y tế",
    },
  ];
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      await login({
        username: values.username,
        password: values.password,
      });

      setSnackbar({
        open: true,
        message: "Đăng nhập thành công",
        severity: "success",
      });

      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Đăng nhập thất bại";
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top, rgba(0, 184, 107, 0.08) 0, transparent 60%), #f5f5f5",
          padding: 3,
        }}
      >
        <Card
          sx={{
            width: 400,
            maxWidth: "100%",
            boxShadow:
              "0 12px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.02)",
            borderRadius: 2,
            p: 4,
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ mb: 1, fontWeight: 600 }}
            >
              Hệ thống trạm y tế
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Đăng nhập để bắt đầu sử dụng hệ thống
            </Typography>
          </Box>

          <LoginForm loading={loading} onSubmit={handleSubmit} />
        </Card>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
