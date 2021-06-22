// React Imports
import React, { FC } from "react";
import Info from "./Info";
import MatchHighlight from "../../MatchHighlight";
import DynamicPaper from "../../DynamicPaper";
import HorizontalDivider from "../../Divider/Horizontal";
import VerticalDivider from "../../Divider/Vertical";
import { Book } from "../../../Utils/types";
import { getRawBook } from "../../../Utils/Content/books";

// Material UI Imports
import {
  Link,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    margin: theme.spacing(2),
    width: "45%",

    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: theme.spacing(2, 0),
    },
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(1, 0),
    width: "100%",
  },
  title: {
    margin: theme.spacing(0.5, 1),
    lineHeight: 1.3,
  },
  author: {
    color:
      theme.palette.type === "dark"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
  },
  main: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    overflow: "scroll",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: theme.spacing(1),
    },
  },
  image: {
    margin: theme.spacing(2, 0),

    [theme.breakpoints.only("xl")]: {
      width: 200,
    },

    [theme.breakpoints.only("lg")]: {
      width: 175,
    },

    [theme.breakpoints.only("md")]: {
      width: 155,
    },

    [theme.breakpoints.only("sm")]: {
      width: 150,
    },

    [theme.breakpoints.only("xs")]: {
      width: 125,
    },
  },
}));

interface PreviewProps {
  id: string;
  search?: string;
  className?: string;
}

const Preview: FC<PreviewProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const book = getRawBook(props.id);

  if (!book) return null;

  return (
    <DynamicPaper className={classes.container}>
      <div className={classes.titleContainer}>
        <Title {...book} search={props.search} />
        <Author {...book} search={props.search} />
      </div>
      <HorizontalDivider />
      <div className={classes.main}>
        <div className={classes.imageContainer}>
          <img src={book.image} alt={book.title} className={classes.image} />
        </div>
        {isSizeSmall ? <HorizontalDivider height={2} /> : <VerticalDivider />}
        <Info {...book} search={props.search} />
      </div>
    </DynamicPaper>
  );
};

type TitleProps = Book & {
  search?: string;
};

const Title: FC<TitleProps> = (props) => {
  const classes = useStyles();

  return (
    <Typography variant="h6" align="center" className={classes.title}>
      <Link href={props.link} target="_blank" rel="noopener noreferrer">
        <MatchHighlight toMatch={props.search}>{props.title}</MatchHighlight>
      </Link>
    </Typography>
  );
};

type AuthorProps = Book & {
  search?: string;
};

const Author: FC<AuthorProps> = (props) => {
  const classes = useStyles();

  return (
    <Link
      href={props.authorLink}
      target="_blank"
      rel="noopener noreferrer"
      variant="subtitle1"
      className={classes.author}
    >
      <MatchHighlight toMatch={props.search}>{props.author}</MatchHighlight>
    </Link>
  );
};

export default Preview;
