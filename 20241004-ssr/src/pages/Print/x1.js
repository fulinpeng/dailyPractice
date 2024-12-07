const componentMap = {
    Chart: CustomChartComponent,
    Button: CustomButtonComponent,
  };
  
  function parseConfigToComponent(config) {
    const { type, props = {}, children = [] } = config;
    const Component = componentMap[type] || type;
  
    const childElements = Array.isArray(children)
      ? children.map(parseConfigToComponent)
      : parseConfigToComponent(children);
  
    return React.createElement(Component, props, ...childElements);
  }
  