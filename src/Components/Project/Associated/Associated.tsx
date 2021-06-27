// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import { Document } from "@contentful/rich-text-types";
import RichText from "../../RichText";
import DynamicImage from "../../DynamicImage";
import StyledLink from "../../StyledLink";
import VerticalDivider from "../../Divider/Vertical";
import HorizontalDivider from "../../Divider/Horizontal";
import { getProject } from "../../../Utils/Content/projects";

// Material UI Imports
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: "5px",

    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
    },
  },
  image: {
    margin: theme.spacing(1),

    [theme.breakpoints.only("xl")]: {
      width: 175,
      height: 175,
    },

    [theme.breakpoints.only("lg")]: {
      width: 150,
      height: 150,
    },

    [theme.breakpoints.only("md")]: {
      width: 150,
      height: 150,
    },

    [theme.breakpoints.only("sm")]: {
      width: 125,
      height: 125,
    },

    [theme.breakpoints.only("xs")]: {
      width: 100,
      height: 100,
    },
  },
  info: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "stretch",
  },
  title: {
    margin: theme.spacing(1),

    [theme.breakpoints.only("xs")]: {
      lineHeight: 1.3,
    },
  },
  description: {
    margin: theme.spacing(1),
  },
}));

export interface AssociatedProps {
  id: string;
  className?: string;
}

const Associated: FC<AssociatedProps> = ({ id, className }) => {
  const classes = useStyles();
  const theme = useTheme();
  const project = getProject(id);
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  if (!project) return null;

  return (
    <div className={clsx(classes.container, className)}>
      <DynamicImage
        src={`${project.image.file.url}?w=175`}
        alt={project.image.title}
        className={classes.image}
      />
      {!isSizeXS && <VerticalDivider />}
      <div className={classes.info}>
        <StyledLink
          variant="h6"
          align="center"
          to={`/projects/${project.slug}`}
          className={classes.title}
        >
          {project.title}
        </StyledLink>
        <HorizontalDivider />
        <div className={classes.description}>
          <RichText richText={project.description as Document} />
        </div>
      </div>
    </div>
  );
};

export default Associated;
