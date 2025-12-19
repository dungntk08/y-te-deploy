import type { Route } from "./+types/population";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { Add, People, HealthAndSafety, FamilyRestroom } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getCurrentUser } from "../services/authService";
import { DashboardLayout } from "../components/layout/DashboardLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Quản lý Dân số - Trạm y tế" },
    {
      name: "description",
      content: "Quản lý dân số và kế hoạch hóa gia đình",
    },
  ];
}

export default function PopulationPage() {
  const navigate = useNavigate();
  const [user] = useState(getCurrentUser());

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Quản lý Dân số & Kế hoạch hóa Gia đình
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quản lý thông tin dân số và các hoạt động kế hoạch hóa gia đình
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: "100%", cursor: "pointer" }} onClick={() => navigate("/population/households")}>
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, py: 2 }}>
                  <People sx={{ fontSize: 60, color: "primary.main" }} />
                  <Typography variant="h6" fontWeight="bold">
                    Quản lý Hộ gia đình
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Quản lý thông tin các hộ gia đình trên địa bàn
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: "100%", cursor: "pointer" }} onClick={() => navigate("/population/family-planning")}>
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, py: 2 }}>
                  <FamilyRestroom sx={{ fontSize: 60, color: "success.main" }} />
                  <Typography variant="h6" fontWeight="bold">
                    Kế hoạch hóa Gia đình
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Quản lý các biện pháp tránh thai và tư vấn KHHGĐ
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: "100%", cursor: "pointer" }} onClick={() => navigate("/population/statistics")}>
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, py: 2 }}>
                  <HealthAndSafety sx={{ fontSize: 60, color: "info.main" }} />
                  <Typography variant="h6" fontWeight="bold">
                    Thống kê Dân số
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Xem các báo cáo và thống kê về dân số
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}

