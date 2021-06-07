// React Imports
import React, { FC } from "react";
import Contents from "./Contents";
import Filters from "../../Components/Filters";

// Redux Imports
import { useSelector } from "react-redux";
import { getTagsSearch, getTagsSort } from "../../Redux";
import {
  setTagsSearch,
  setTagsSort,
  TagsSort,
  TAGS_SORT,
} from "../../Redux/tags.slice";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    width: "100%",
    padding: theme.spacing(0, 2),
  },
  filters: {
    width: "95%",
  },
}));

const Tags: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const search = useSelector(getTagsSearch);
  const sort = useSelector(getTagsSort);

  return (
    <Container>
      <Filters
        search={{
          defaultSearch: search,
          onSearchChange: (value) => dispatch(setTagsSearch(value)),
        }}
        sort={{
          value: sort,
          values: TAGS_SORT,
          onChange: (value) => dispatch(setTagsSort(value as TagsSort)),
        }}
        className={classes.filters}
      />
      <Contents />
    </Container>
  );
};

const Container: FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

export default Tags;
