import type { Route } from "./+types/dashboard";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import {
  People,
  LocalHospital,
  Assignment,
  EventNote,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getCurrentUser } from "../services/authService";
import { DashboardLayout } from "../components/layout/DashboardLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - Trạm y tế" },
    {
      name: "description",
      content: "Trang quản lý tổng quan hệ thống trạm y tế",
    },
  ];
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: color,
              width: 56,
              height: 56,
              mr: 2,
            }}
          >
            {icon}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" component="div" fontWeight="bold">
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/sign-in");
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Tổng quan
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Chào mừng trở lại, {user.name}! Dưới đây là tổng quan về hệ thống.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Tổng bệnh nhân"
              value="1,234"
              icon={<People />}
              color="#1976d2"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Bác sĩ"
              value="24"
              icon={<LocalHospital />}
              color="#00b96b"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Lịch hẹn hôm nay"
              value="156"
              icon={<EventNote />}
              color="#ed6c02"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Hồ sơ bệnh án"
              value="3,456"
              icon={<Assignment />}
              color="#9c27b0"
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Hoạt động gần đây
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[
                  {
                    time: "10:30",
                    action: "Bệnh nhân Nguyễn Văn A đã khám",
                    type: "success",
                  },
                  {
                    time: "10:15",
                    action: "Bác sĩ Nguyễn Thị B đã cập nhật hồ sơ",
                    type: "info",
                  },
                  {
                    time: "09:45",
                    action: "Lịch hẹn mới được tạo",
                    type: "warning",
                  },
                  {
                    time: "09:20",
                    action: "Bệnh nhân Trần Văn C đã thanh toán",
                    type: "success",
                  },
                ].map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      py: 1.5,
                      borderBottom:
                        index < 3 ? "1px solid #e0e0e0" : "none",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        minWidth: 60,
                        color: "text.secondary",
                        fontWeight: 500,
                      }}
                    >
                      {activity.time}
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 2 }}>
                      {activity.action}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Thông tin tài khoản
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Họ và tên
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {user.name}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Tài khoản
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {user.username}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Vai trò
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {user.role}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {user.email}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}

