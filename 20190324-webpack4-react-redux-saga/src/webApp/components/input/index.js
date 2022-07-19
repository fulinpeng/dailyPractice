import React, { Component } from "react";
import "./index.scss";
class Search extends Component {
  constructor(props) {
    super(props);
  }

  state = {
  }

  render() {
    const {className, onChange, icon, value, defaultValue} = this.props;
    return (
      <div className={`input-wrap ${className||''} ${icon ? 'icon '+ icon :'icon'}`} >
        {icon&&<span></span>}
        <input onChange={onChange} value={typeof value !== 'undefined'?(value || defaultValue || ''):''}/>
      </div>
    );
  }
}

export default Search;
