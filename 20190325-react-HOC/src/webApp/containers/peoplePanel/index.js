/**
 * @PeoplePanel: 人员信息模块
 **/
import React, { Component } from "react";
import "./index.scss";
import Tag from "_components/tag";

class PeoplePanel extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    visibleAddTag: false
  }

  // 显示添加Tag的模块
  changeAddTagState = () => {
    this.setState({
      visibleAddTag: !this.state.visibleAddTag
    });
  }

  render() {
    const {
      className,
      data,
      handleAddTag,
      showEditPeopleModel,
      deletePeopleItem
    } = this.props;
    const { visibleAddTag } = this.state;
    return (
      <section className={`people-panel ${className || ""}`}>
        <div className="user-pic">
          <img src={data.head} />
        </div>
        <div className="user-name-tags">
          <div className="user-name">{data.name}</div>
          <div className="user-tags hidden-mobile">
            {data.tags && data.tags.length
              ? data.tags.map((tag, i) => {
                  return <span key={i}>{tag}</span>;
                })
              : null}
            <div
              className={`add-tag ${visibleAddTag ? "v-visible" : ""}`}
              onClick={this.changeAddTagState}
            />
            {visibleAddTag && (
              <div className="add-tag-model">
                <div className="title">Tag</div>
                <Tag tags={data.tags} onChange={handleAddTag} />
              </div>
            )}
          </div>
        </div>
        <div className="user-info">
          <div className="info tel">{data.tel}</div>
          <div className="info adress">{data.adress}</div>
          <div className="info country">{data.country}</div>
        </div>
        <div className="visible-mobile">
          <div className="user-tags-mobile">
            {data.tags && data.tags.length
              ? data.tags.map((tag, i) => {
                  return <span key={i}>{tag}</span>;
                })
              : null}
          </div>
        </div>
        <div className="user-desc mul-ellipsis">{data.desc}</div>
        <div className="more">
          <span>…</span>
        </div>
        <div className="bottom-tools hidden-mobile">
          <span className="btn-edit" onClick={showEditPeopleModel} />
          <span className="btn-delete" onClick={deletePeopleItem} />
        </div>
      </section>
    );
  }
}

export default PeoplePanel;
