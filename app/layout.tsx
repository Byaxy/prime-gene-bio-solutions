"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import {
  CSSObject,
  Theme,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { data } from "@/data/sidenavData";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SidebarMenu from "@/components/side-nav/SidebarMenu";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

const drawerWidth = 270;

const theme = createTheme({
  palette: {
    primary: {
      main: "#2D3663",
    },
    secondary: {
      light: "#47ccc880",
      main: "#47ccc8",
      dark: "#29aeaa",
      contrastText: "#72D9D6",
    },
    error: {
      main: "#dc4545",
    },
  },
});

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(6)} + 1px)`,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function RootLayout({
  children,
  session,
  ...pageProps
}: {
  children: React.ReactNode;
  session: Session;
}) {
  const [open, setOpen] = useState(false);
  const matchesMidium = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (matchesMidium) {
      handleDrawerClose();
    } else {
      handleDrawerOpen();
    }
  }, [matchesMidium]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <SessionProvider session={session}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box className="flex">
                <CssBaseline />
                <Toaster />

                <AppBar
                  className="fixed shadow-md"
                  open={open}
                  sx={{
                    backgroundColor: "#002060",
                    color: "white",
                  }}
                >
                  <Toolbar>
                    <IconButton
                      className="shadow-md"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      sx={{
                        marginRight: 5,
                        color: "#002060",
                        backgroundColor: "white",
                        ...(open && { display: "none" }),
                        "&:hover": {
                          backgroundColor: "white",
                          color: "#00fdff",
                        },
                      }}
                    >
                      <MenuIcon titleAccess="Open Side Menu" />
                    </IconButton>

                    {/** Header */}
                    <Header />
                  </Toolbar>
                </AppBar>
                {/** Sidebar Navigation */}
                <Drawer
                  variant="permanent"
                  open={open}
                  className="bg-white scrollbar-hide"
                >
                  {/** Drawer Header */}
                  <DrawerHeader className="w-full flex flex-row justify-between items-center">
                    {/** logo */}
                    <Link
                      href={"/"}
                      className="no-underline flex items-center justify-center"
                    >
                      <Image
                        src={"/Logo.png"}
                        alt="Logo"
                        width={160}
                        height={40}
                      />
                    </Link>
                    <IconButton
                      onClick={handleDrawerClose}
                      className="shadow-md"
                      sx={{
                        color: "white",
                        backgroundColor: "#002060",
                        "&:hover": {
                          color: "#00fdff",
                          backgroundColor: "#002060",
                        },
                      }}
                    >
                      {theme.direction === "rtl" ? (
                        <ChevronRightIcon titleAccess="Open Side Menu" />
                      ) : (
                        <ChevronLeftIcon titleAccess="Close Side Menu" />
                      )}
                    </IconButton>
                  </DrawerHeader>
                  <Divider />

                  {/** Side bar */}
                  <SidebarMenu data={data} open={open} />
                </Drawer>

                {/** Main Content */}
                <Box
                  className="min-h-screen w-full p-5 bg-grayColor"
                  component="main"
                >
                  <DrawerHeader />
                  {children}
                </Box>
              </Box>
            </LocalizationProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
