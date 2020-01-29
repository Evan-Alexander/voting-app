import React from "react";
import AllPolls from "../components/AllPolls";
import ErrorMessage from "../components/ErrorMessage";

const HomePage = props => {
  return (
    <div>
      <ErrorMessage />
      <AllPolls {...props} />
    </div>
  );
};

export default HomePage;
