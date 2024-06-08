import React from "react";

const Container = ({ children }) => {
  return (
    <div className="container mx-auto p-4 mt-20 min-h-lvh">{children}</div>
  );
};

export default Container;
