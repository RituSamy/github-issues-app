import React, { Component } from "react";
import Issue from "./issue";

const Issues = (props) => {
  if (
    props.issues.length === 0 &&
    props.author === "" &&
    props.label === "All"
  ) {
    props.refresh();
  }
  return props.issues.map((issue) => (
    <Issue
      key={issue.number}
      number={issue.number}
      title={issue.title}
      url={issue.html_url}
      labels={issue.labels}
      username={issue.username}
      userlink={issue.userlink}
      created_at={issue.created_at}
    />
  ));
};

export default Issues;
