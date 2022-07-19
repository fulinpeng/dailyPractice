import React, { Component } from "react";
import "./index.scss";
class Search extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    searchState: false,
  }

  changeSearchState = () => {
    this.setState({ searchState: true });
    const changeSearchState = this.props.changeSearchState || ((e)=> e);
    changeSearchState();
  };

  onSearch = (e) => {
    const onSearch = this.props.onSearch || ((e)=> e);
    onSearch(e);
    this.setState({ searchState: false });
  };

  render() {
    const { searchState } = this.state;

    return (
      <div className={`search-input-wrap ${this.props.className||''}`} >
        {!searchState && <div className="search-icon" onClick={this.changeSearchState} />}
        {searchState && <div className="input-wrap" >
          <input
            className="search-input"
            onBlur={this.onSearch}
          />
        </div>
        }
      </div>
    );
  }
}

export default Search;
