"use client";

import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "@components/AppNavbar";
import Header from "@components/header/Header";
import SideMenu from "@components/SideMenu";
import AppTheme from "@components/shared-theme/AppTheme";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "@components/theme/customizations";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppTheme themeComponents={xThemeComponents}>
      {/* <AppTheme {...props} themeComponents={xThemeComponents}> */}
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
            height: "100vh", // 100% of the viewport height
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            {/* 게시판 공통 컴포넌트 정리 완료 */}
            <Box
              sx={{
                width: "100%",
                // maxWidth: { sm: "100%", md: "1700px" }, // 20241201 해상도에 따른 화면 비율 관련 수정 kwc
                // minHeight: "800px",
              }}
            >
              <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                {/* {metadata.title} */}
              </Typography>
              <Grid container spacing={2} columns={12}>
                {children}
                {/* <BoardWrite /> */}
                {/* <BoardList /> */}
              </Grid>
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
