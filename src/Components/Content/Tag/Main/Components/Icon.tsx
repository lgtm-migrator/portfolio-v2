// React Imports
import React, { FC } from "react";
import DynamicImage from "../../../../Atomic/DynamicImage";
import { ResolvedTag } from "../../../../../Utils/types";

// Material UI Imports
import { makeStyles, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    margin: theme.spacing(1),

    [theme.breakpoints.only("xl")]: {
      height: 175,
    },

    [theme.breakpoints.only("lg")]: {
      height: 150,
    },

    [theme.breakpoints.only("md")]: {
      height: 150,
    },

    [theme.breakpoints.only("sm")]: {
      height: 125,
    },

    [theme.breakpoints.only("xs")]: {
      height: 100,
    },
  },
}));

type IconProps = ResolvedTag;

const Icon: FC<IconProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const isDark = theme.palette.type === "dark";
  const icon = isDark ? props.darkIcon : props.lightIcon;

  return (
    <DynamicImage
      src={`${icon.file.url}?h=175`}
      alt={icon.title}
      className={classes.icon}
    />
  );
};

export default Icon;
