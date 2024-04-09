import React from "react";

const PageHeader = ({ title }) => {
  return (
    <div className="page-title">
      <p className="title">{title}</p>
    </div>
  );
};

export default PageHeader;
