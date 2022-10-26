import React from "react"
import ContentLoader from "react-content-loader";

const Loader = () => {
  return (<ContentLoader 
    speed={2}
    width={280}
    height={470}
    viewBox="0 0 280 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="131" cy="132" r="130" /> 
    <rect x="23" y="271" rx="4" ry="6" width="226" height="30" /> 
    <rect x="0" y="314" rx="5" ry="7" width="280" height="90" /> 
    <rect x="137" y="418" rx="4" ry="6" width="144" height="41" /> 
    <rect x="8" y="419" rx="3" ry="5" width="85" height="39" />
  </ContentLoader>)
}

export default Loader
