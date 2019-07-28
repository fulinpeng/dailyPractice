/**
 * @Dashboard: 首页
 **/
import React, { Component } from "react";
import "./index.scss";
import Search from "_components/search";
import More from "_components/more";
import FixedModel from "_components/fixedModel";
import PhoneButton from "_components/phoneButton";
import PeoplePanel from "_containers/peoplePanel";
import AddAndEditPeople from "_containers/addAndEditPeople";
import TestCommonChunk from "_components/testCommonChunk";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    tabState: 0, // 当前tab按钮处于第0个
    params: {
      keywords: ["4674 Stratford Drive", "Kaaawa"]
    }, // 请求人员信息所需参数
    searchState: false, // 是否显示搜索框
    addPeopleState: false, // 是否显示新增模块
    fixedModelState: false, // 是否显示弹出框
    contentData: [
      {
        id: 0,
        head: require("../../../images/user-1.png"),
        name: "Melissa Morillo",
        tel: "+1.8082379636",
        adress: "4674 Stratford Drive",
        country: "Kaaawa",
        tags: ["Quizzes", "Forum Activity"],
        desc:
          "Reddit  has said the number of government requests for user data more than doubled in 2018 than on the previous year. The news and content sharing site said in its latest transparency report,  posted Wednesday, it received 752 requests from governments during the year, up from 310 requests a year earlier."
      },
      {
        id: 1,
        head: require("../../../images/user-1.png"),
        name: "Melissa Morillo",
        tel: "+1.8082379636",
        adress: "4674 Stratford Drive",
        country: "Kaaawa",
        tags: ["Quizzes", "Forum Activity"],
        desc:
          "Reddit  has said the number of government requests for user data more than doubled in 2018 than on the previous year. The news and content sharing site said in its latest transparency report,  posted Wednesday, it received 752 requests from governments during the year, up from 310 requests a year earlier."
      }
    ], // 所有的人员信息
    editPeopleState: [] // 用于判断哪条信息处于编辑状态
  }

  // 当前tab按钮处于active状态
  changeTabState = i => {
    this.setState({ tabState: i });
  };

  // 显示搜索条
  changeSearchState = () => {
    this.setState({ searchState: true });
  };

  // 请求搜索接口
  searchHandle = e => {
    let word = e.target.value;
    let params = this.state.params;
    let keywords = [...params.keywords];
    if (word === "" || keywords.indexOf(word) > -1)
      return this.setState({ searchState: false });
    keywords.push(word);
    this.setState(
      {
        params: {
          ...params,
          keywords
        }
      },
      () => {
        this.setState({ searchState: false });
      }
    );
  };

  // 改变searchState的回调
  changeSearchState = () => {
    this.setState({ searchState: !this.state.searchState });
  };

  // 显示添加人员的模块
  changeAddPeopleState = () => {
    this.setState({
      addPeopleState: !this.state.addPeopleState,
      fixedModelState: false
    });
  };

  // 模拟添加标签接口
  handleAddTag = (i, tags) => {
    let { contentData } = this.state;
    contentData = [...contentData];
    contentData[i].tags = tags;
    this.setState({
      contentData
    });
  };

  // 显示编辑人员信息的模块
  showEditPeopleModel = i => {
    let editPeopleState = this.state.editPeopleState;
    editPeopleState[i] = true;
    this.setState({
      editPeopleState: [...editPeopleState]
    });
  };

  // 隐藏编辑人员信息的模块
  hideEditPeopleModel = i => {
    let editPeopleState = this.state.editPeopleState;
    editPeopleState[i] = false;
    this.setState({
      editPeopleState: [...editPeopleState]
    });
  };

  // 模拟新增接口
  addPeopleItem = data => {
    console.log("请求新增成功");
    let { contentData } = this.state;
    contentData = [data, ...contentData];
    this.setState(
      {
        contentData
      },
      () => {
        this.changeAddPeopleState();
      }
    );
  };

  // 模拟编辑接口
  editPeopleItem = (i, data) => {
    console.log("请求编辑成功", data, i);
    let { contentData } = this.state;
    contentData[i] = { ...data };
    this.setState(
      {
        contentData: [...contentData]
      },
      () => {
        this.hideEditPeopleModel(i);
      }
    );
  };

  // 模拟删除接口
  deletePeopleItem = i => {
    console.log("请求删除成功");
    let { contentData } = this.state;
    contentData = [...contentData];
    contentData.splice(i, 1);
    this.setState({
      contentData
    });
  };

  // 移动端显示弹出框
  changeFixedModelState = () => {
    this.setState({
      fixedModelState: !this.state.fixedModelState
    });
  };
  
  componentDidMount() {
    let editPeopleState = [];
    let contentData = this.state.contentData;
    contentData.map(() => {
      editPeopleState.push(false);
    });
    this.setState({
      editPeopleState
    });
  }

  render() {
    const {
      tabState,
      searchState,
      contentData,
      addPeopleState,
      editPeopleState,
      fixedModelState
    } =this.state;
    
    const { keywords } = this.state.params;
    return (
      <main className="main-dashboard">
        <div className="main-title hidden-mobile">
          <span>Student</span>
          <span className="separator">|</span>
          <span>Instructor</span>
        </div>
        <div className="main-title-mobile visible-mobile">
          <span>Instructor</span>
        </div>
        <div className="hidden-mobile">
          <div className="main-toolbar">
            <div className="tool-item">
              <img src={require("../../../images/Number-of-people-2x.png")} />
              <div className="item-desc">
                <div className="num">{29}</div>
                <div className="desc">{"NUMBER OF PEOPLE"}</div>
              </div>
            </div>
            <div className="tool-item middle">
              <img src={require("../../../images/OVERDUE-COURSES-2x.png")} />
              <div className="item-desc">
                <div className="num">{12}</div>
                <div className="desc">{"OVERDUE COURSES"}</div>
              </div>
            </div>
            <div className="tool-item">
              <img src={require("../../../images/COMPLETED-COURSES-2x.png")} />
              <div className="item-desc">
                <div className="num">{1}</div>
                <div className="desc">{"COMPLETED COURSES"}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="visible-mobile">
          <div className="main-toolbar main-toolbar-mobile">
            <div className="tool-item-mobile">
              <div className="item-img-mobile">
                <img src={require("../../../images/Number-of-people-2x.png")} />
                <div className="num">{29}</div>
              </div>
              <div className="desc">{"NUMBER OF PEOPLE"}</div>
            </div>
            <div className="line" />
            <div className="tool-item-mobile">
              <div className="item-img-mobile">
                <img src={require("../../../images/OVERDUE-COURSES-2x.png")} />
                <div className="num">{12}</div>
              </div>
              <div className="desc">{"OVERDUE COURSES"}</div>
            </div>
            <div className="line" />
            <div className="tool-item-mobile">
              <div className="item-img-mobile">
                <img src={require("../../../images/COMPLETED-COURSES-2x.png")} />
                <div className="num">{1}</div>
              </div>
              <div className="desc">{"COMPLETED COURSES"}</div>
            </div>
          </div>
        </div>
        <div className="main-tabpanel">
          <div className="tabpanel-tools">
            <div className="tools-tabbar">
              <div
                className={`tab ${tabState === 0 ? "active" : ""}`}
                onClick={this.changeTabState.bind(this, 0)}
              >
                All
              </div>
              <div
                className={`tab ${tabState === 1 ? "active" : ""}`}
                onClick={this.changeTabState.bind(this, 1)}
              >
                Quizzes
              </div>
              <div
                className={`tab ${tabState === 2 ? "active" : ""}`}
                onClick={this.changeTabState.bind(this, 2)}
              >
                Forum Activity
              </div>
            </div>
            {!searchState && (
              <div className="search-keywords sig-ellipsis hidden-mobile">
                {keywords && keywords.length
                  ? keywords.map((keyword, i) => {
                      return <span key={i}>{keyword}</span>;
                    })
                  : null}
              </div>
            )}
            <div className="tools-btn hidden-mobile">
              <Search
                className="search-pos"
                onSearch={this.searchHandle}
                changeSearchState={this.changeSearchState}
              />
              <div
                className="btn btn-add"
                onClick={this.changeAddPeopleState}
              />
            </div>
            <More className="visible-mobile" onClick={this.changeFixedModelState} />
          </div>
          <div className="container">
            {addPeopleState && (
              <AddAndEditPeople
                callBackForOk={this.addPeopleItem}
                callBackForCancel={this.changeAddPeopleState}
              />
            )}
            {contentData && contentData.length
              ? contentData.map((v, k) => {
                  let result =
                    editPeopleState && editPeopleState[k] ? (
                      <AddAndEditPeople
                        data={v}
                        isEdit={true}
                        callBackForOk={this.editPeopleItem.bind(this, k)}
                        callBackForCancel={this.hideEditPeopleModel.bind(
                          this,
                          k
                        )}
                      />
                    ) : (
                      <PeoplePanel
                        key={k}
                        data={v}
                        handleAddTag={this.handleAddTag.bind(this, k)}
                        deletePeopleItem={this.deletePeopleItem.bind(this, k)}
                        showEditPeopleModel={this.showEditPeopleModel.bind(
                          this,
                          k
                        )}
                      />
                    );
                  return result;
                })
              : null}
          </div>
        </div>
        {fixedModelState && <FixedModel onClick={this.changeFixedModelState}>
          <div className="btns-wrap-mobile">
        <TestCommonChunk/>
            <div className="tip">选择功能</div>
            <PhoneButton onClick={this.changeFixedModelState}>搜索</PhoneButton>
            <PhoneButton onClick={this.changeAddPeopleState}>添加</PhoneButton>
            <PhoneButton className="cancel" onClick={this.changeFixedModelState}>取消</PhoneButton>
          </div>
        </FixedModel>}
      </main>
    );
  }
}

export default Dashboard;
