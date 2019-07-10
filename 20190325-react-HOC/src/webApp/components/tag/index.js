import React, { Component } from "react";
import "./index.scss";
class Tag extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    visibleInputState: false,
    newTag: ""
  };

  changeVisibleInputState = () => {
    this.setState({
      visibleInputState: !this.state.visibleInputState
    });
  };

  addNewTag = e => {
    let newTag = e.target.value;
    if (newTag === "") return;
    this.setState({
      newTag
    });
  };

  tagInputBlur = () => {
    this.changeVisibleInputState();
    let { newTag } = this.state;
    if (newTag === "") return;
    let {onChange, tags } = this.props;
    onChange([...tags, newTag]);
  };

  render() {
    const { className, icon, value, tags } = this.props;
    const { visibleInputState, newTag } = this.state;
    return (
      <div className={`tag-input ${className||''}`}>
        {tags && tags.length
          ? tags.map((tag, i) => {
              return <span key={i}>{tag}</span>;
            })
          : null}
        {!visibleInputState && (
          <span className="new-tag" onClick={this.changeVisibleInputState}>
            New Tag
          </span>
        )}
        {visibleInputState && (
          <div className="tag-input-wrap">
            <input
              value={newTag}
              onBlur={this.tagInputBlur}
              onChange={this.addNewTag}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Tag;
