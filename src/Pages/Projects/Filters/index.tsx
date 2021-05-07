// React Imports
import React, { FC, useMemo } from "react";
import Fuse from "fuse.js";
import { Document } from "@contentful/rich-text-types";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import debounce from "lodash.debounce";
import SearchBar from "./SearchBar";
import { Projects } from "../../../Utils/types";

// Material UI Imports
import { Divider, IconButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  projectFilters: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    padding: theme.spacing(0, 3),
  },
  divider: {
    height: "1px",
    margin: theme.spacing(1, 2, 0),
  },
}));

export type Matches = Record<string, readonly Fuse.FuseResultMatch[]>;

interface FiltersProps {
  projects: Projects;
  setProjects: (p: Projects | null) => void;
  setMatches: (m: Matches) => void;
}

const Filters: FC<FiltersProps> = ({ projects, setProjects, setMatches }) => {
  const classes = useStyles();
  const list = useMemo(
    () =>
      Object.entries(projects).map(([key, value]) => ({
        ...value,
        id: key,
        description: documentToPlainTextString(value.description as Document),
        link: value.link ?? "",
        sourceCode: value.sourceCode ?? "",
      })),
    [projects]
  );

  const fuse = new Fuse(list, {
    keys: [
      { name: "title", weight: 3 },
      { name: "description", weight: 2 },
      "link",
      "sourceCode",
    ],
    threshold: 0.3,
    ignoreLocation: true,
    findAllMatches: true,
    includeMatches: true,
  });

  const onSearchChange = debounce(
    (search: string) => {
      if (!search) {
        setProjects(null);
        setMatches({});
      } else {
        const filtered = fuse.search(search);

        const matches: Matches = {};

        const projectsArr = filtered.reduce((obj, p) => {
          const id = p.item.id;
          if (p.matches) {
            const filteredMatches =
              search.length < 3
                ? p.matches
                : p.matches.map((m) => {
                    const indices = m.indices.filter((i) => {
                      const diff = i[1] - i[0];
                      if (diff > 3) return true;
                      if (search.length - diff < 2) return true;
                      return false;
                    });
                    return { ...m, indices };
                  });
            matches[id] = filteredMatches;
          }
          return { ...obj, [id]: projects[id] };
        }, {} as Projects);

        setProjects(projectsArr);
        setMatches(matches);
      }
    },
    500,
    { maxWait: 500 }
  );

  return (
    <>
      <div className={classes.projectFilters}>
        <SearchBar onChange={onSearchChange} />
      </div>
      <IconButton size="small"></IconButton>
      <Divider flexItem className={classes.divider} />
    </>
  );
};

export default Filters;
