import React, { Component } from 'react';
import './index.css';
import html2canvas from 'html2canvas';
import axios from 'axios';

const url = 'http://192.168.0.116:9090/api/repos/%3Araic.prpt/report?restID=35&output-target=table%2Fhtml%3Bpage-mode%3Dpage&accepted-page=0&showParameters=true&renderMode=REPORT&htmlProportionalWidth=false&query-limit-ui-enabled=false&query-limit=-1&maximum-query-limit=0';

class Context extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //   }
  // }

  getData = (url, params, succ) => {
    axios.get(url, { params })
      .then((res) => {
        if (res.data) {
          succ(res.data);
        }
      })
  }

  componentDidMount() {
    let html = this.getData(url, null, (data) => {
      console.log(data);
    });
    html2canvas(document.querySelector("#capture")).then(canvas => {
      document.body.appendChild(canvas);
    });
  }

  render() {
    return (
      <div id="capture" style={{ padding: '10px', background: '#f5da55' }}>
        <h4 style={{ color: '#000' }}>Hello world!</h4>
      </div>
    );
  }
}


export default Context;
