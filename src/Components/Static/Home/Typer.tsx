// React Imports
import React, { FC, useState, useEffect } from "react";
import Typist from "react-typist";
import { Paths } from "../NavController";
import StyledLink from "../../Atomic/StyledLink";
import "react-typist/dist/Typist.css";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  typist: {
    display: "inline-block",
  },
}));

const Typer: FC = () => {
  const classes = useStyles();
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(1);
  }, [count]);

  return count ? (
    <Typist
      className={classes.typist}
      startDelay={500}
      onTypingDone={() => setCount(0)}
      cursor={{
        blink: true,
      }}
    >
      <StyledLink to={Paths.Experience}>experience</StyledLink>
      <Typist.Backspace count={"experience".length} delay={2000} />

      <Typist.Delay ms={500} />
      <StyledLink to={Paths.Education}>education</StyledLink>
      <Typist.Backspace count={"education".length} delay={2000} />

      <Typist.Delay ms={500} />
      <StyledLink to={Paths.Projects}>projects</StyledLink>
      <Typist.Backspace count={"projects".length} delay={2000} />

      <Typist.Delay ms={500} />
      <StyledLink to={Paths.Articles}>articles</StyledLink>
      <Typist.Backspace count={"articles".length} delay={2000} />

      <Typist.Delay ms={500} />
      <StyledLink to={Paths.Certifications}>certifications</StyledLink>
      <Typist.Backspace count={"certifications".length} delay={2000} />

      <Typist.Delay ms={500} />
      <StyledLink to={Paths.Books}>books</StyledLink>
      <Typist.Backspace count={"books".length} delay={2000} />
    </Typist>
  ) : (
    <></>
  );
};

export default Typer;
