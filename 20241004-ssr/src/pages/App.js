import React from "react";
import TemplateA from "../components/TemplateA";
import TemplateB from "../components/TemplateB";

const templates = {
  1: TemplateA,
  2: TemplateB,
};

const App = ({ data }) => {
  const TemplateComponent = templates[data.id] || (() => <div>Template Not Found</div>);
  return <TemplateComponent content={data.content} />;
};

export default App;
