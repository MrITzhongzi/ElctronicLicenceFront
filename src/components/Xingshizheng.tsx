import * as React from 'react';
import { withRouter } from "react-router";
// import axios from "axios";
require('./style/xingshizheng.css');

class Xingshizheng extends React.Component<any> {

  state = {

  };

  GoXszDetail = () => {
    this.props.history.push("/main/show-car-info");
  }

  render() {

    return (
      <img className={"xsz-index"} src={require("../images/xingshizheng.png")} onClick={this.GoXszDetail} />
    );
  }
}
export default withRouter(Xingshizheng);
