import React from "react";
import parse from "html-react-parser";
//import ReactHtmlParser from "react-html-parser";

export default function InfoMain(props) {
  const { projectDetail } = props;
  console.log("projectDetail", projectDetail);
  const renderAvatar = () => {
    return projectDetail.members?.map((user, index) => {
      return (
        <div className="avatar" key={index}>
          <img src={user.avatar} alt={user.avatar} />
        </div>
      );
    });
  };
  const parse = require("html-react-parser");
  const description = projectDetail.description;
  const jsxDescription = parse(`${projectDetail.description}`);

  return (
    <>
      <h3>{projectDetail.projectName}</h3>
      <section>
        <h4>Mô tả dự án: </h4>
        {jsxDescription}
      </section>
      <div className="info" style={{ display: "flex" }}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
          {renderAvatar()}
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Only My Issues
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Recently Updated
        </div>
      </div>
    </>
  );
}
