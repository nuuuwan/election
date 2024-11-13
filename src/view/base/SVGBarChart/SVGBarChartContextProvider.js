import React, { createContext } from "react";
const SVGBarChartContext = createContext();

export default class SVGBarChartContextProvider extends React.Component {
  render() {
    return (
      <SVGBarChartContext.Provider value={this.props}>
        {this.props.children}
      </SVGBarChartContext.Provider>
    );
  }
}

export function useSVGBarChartContext() {
  return React.useContext(SVGBarChartContext);
}