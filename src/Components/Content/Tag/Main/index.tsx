// React Imports
import React, { FC } from "react";
import clsx from "clsx";
import Title from "./Components/Title";
import Icon from "./Components/Icon";
import Related from "./Components/Related";
import HorizontalDivider from "../../../Divider/Horizontal";
import Associated from "../../Shared/Associated";
import { getTag } from "../../../../Utils/Content/tags";
import {
  generateExperienceTimeline,
  generateExperienceTitle,
  getSingleExperience,
} from "../../../../Utils/Content/experience";
import {
  generateProjectTimeline,
  getProject,
} from "../../../../Utils/Content/projects";
import {
  generateArticlePublished,
  getArticle,
} from "../../../../Utils/Content/articles";

// Material UI Imports
import { makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
    width: "100%",
    padding: theme.spacing(1, 0),
  },
  main: {
    padding: theme.spacing(0, 2),
    width: "100%",
  },
}));

interface TagProps {
  id: string;
  search?: string;
  className?: string;
}

const Tag: FC<TagProps> = (props) => {
  const classes = useStyles();

  const tag = getTag(props.id);
  if (!tag) return null;

  return (
    <Paper elevation={8} className={clsx(classes.root, props.className)}>
      <Title {...tag} search={props.search} />
      <Icon {...tag} />
      <HorizontalDivider />
      <div className={classes.main}>
        {!!tag.experience.length && (
          <Related label="Related Experience">
            {tag.experience.map((exp) => (
              <Associated
                key={exp.id}
                content={getSingleExperience(exp.id)}
                basePath="experience"
                timelineFunc={generateExperienceTimeline}
                titleFunc={generateExperienceTitle}
                search={props.search}
              />
            ))}
          </Related>
        )}
        {!!tag.projects.length && (
          <Related label="Related Projects">
            {tag.projects.map((project) => (
              <Associated
                key={project.id}
                content={getProject(project.id)}
                basePath="projects"
                timelineFunc={generateProjectTimeline}
              />
            ))}
          </Related>
        )}
        {!!tag.articles.length && (
          <Related label="Related Articles">
            {tag.articles.map((article) => (
              <Associated
                key={article.id}
                content={getArticle(article.id)}
                basePath="articles"
                timelineFunc={generateArticlePublished}
              />
            ))}
          </Related>
        )}
      </div>
    </Paper>
  );
};

export default Tag;
