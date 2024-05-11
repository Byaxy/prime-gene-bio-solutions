"use client";

import "../../globals.css";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import { data } from "@/data/sidenavData";
import SidebarMenu from "@/components/side-nav/SidebarMenu";
import { theme } from "@/utils/theme";

const inter = Inter({ subsets: ["latin"] });

const drawerWidth = 270;

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
  ...pageProps
}: {
  children: React.ReactNode;
}) {
  // auth status
  const router = useRouter();
  const { authStatus } = useAuth();

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

  // If user is not logged in, redirect to login page
  if (!authStatus) {
    router.replace("/login");
    return <></>;
  }

  return (
    <section className={inter.className}>
      <Box className="flex">
        <CssBaseline />
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
              className="no-underline flex items-center justify-center bg-primaryColor/95 p-1 rounded shadow"
            >
              <Image
                src={"/logoWhite.png"}
                alt="Logo"
                width={160}
                height={40}
              />
            </Link>
            <IconButton
              onClick={handleDrawerClose}
              className="shadow-md bg-primaryColor"
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
        <Box className="min-h-screen w-full p-5 bg-grayColor" component="main">
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </section>
  );
}
