// React Imports
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useClosableSnackbar } from "../../../Hooks";
import { SIDEBAR_WIDTH } from "../../../Utils/constants";
import { generateSearch } from "../../../Utils/funcs";

// Redux Imports
import { toggleDarkMode, toggleSidebar } from "../../../Redux";
import { useAppDispatch } from "../../../Store";

// Material UI Imports
import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  useTheme,
  useMediaQuery,
  useScrollTrigger,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import {
  Brightness7,
  Brightness4,
  Menu as MenuButton,
  Palette,
  Settings,
} from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    margin: 0,
    [theme.breakpoints.up("lg")]: {
      marginLeft: theme.direction === "ltr" ? SIDEBAR_WIDTH : 0,
      marginRight: theme.direction === "rtl" ? SIDEBAR_WIDTH : 0,
    },
  },
  otherIcons: {
    marginLeft: theme.direction === "ltr" ? "auto" : 0,
    marginRight: theme.direction === "rtl" ? "auto" : 0,
  },
  avatar: {
    cursor: "pointer",
  },
}));

const Navbar: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { enqueueSnackbar } = useClosableSnackbar();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const isSizeSmall = useMediaQuery(theme.breakpoints.down("lg"));
  const isDarkMode = theme.palette.mode === "dark";
  const isLTR = theme.direction === "ltr";

  const toggleSidebarButton = (
    <div>
      <Tooltip title="Toggle Sidebar">
        <IconButton onClick={() => dispatch(toggleSidebar())} size="large">
          <MenuButton />
        </IconButton>
      </Tooltip>
    </div>
  );

  return (
    <>
      <AppBar elevation={trigger ? 4 : 1} color="default">
        <Toolbar className={classes.toolbar}>
          {isSizeSmall && isLTR && toggleSidebarButton}
          <div className={classes.otherIcons}>
            <Tooltip title="Customize Colors">
              <IconButton
                component={Link}
                to={{
                  pathname: "/colors",
                  search: generateSearch(
                    {
                      from_type: "navbar",
                    },
                    null
                  ),
                }}
                size="large"
              >
                <Palette />
              </IconButton>
            </Tooltip>
            <Tooltip title={`Toggle ${isDarkMode ? "Light" : "Dark"} Mode`}>
              <IconButton
                onClick={() => {
                  dispatch(toggleDarkMode());
                  enqueueSnackbar(
                    `Toggled ${isDarkMode ? "Light" : "Dark"} Mode`,
                    {
                      variant: "success",
                      onUndo: () => {
                        dispatch(toggleDarkMode());
                      },
                    }
                  );
                }}
                size="large"
              >
                {isDarkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton
                component={Link}
                to={{
                  pathname: "/settings",
                  search: generateSearch(
                    {
                      from_type: "navbar",
                    },
                    null
                  ),
                }}
                size="large"
              >
                <Settings />
              </IconButton>
            </Tooltip>
          </div>
          {isSizeSmall && !isLTR && toggleSidebarButton}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
