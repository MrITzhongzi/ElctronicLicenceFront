import * as React from "react";
import { withRouter } from "react-router";
import Icon from "antd/lib/icon";
require('./style/close.css');

class Close extends  React.Component<any> {

  state = {

  };

  closePage = () => {
    // location.hash = "/";
    this.props.history.push("/");
  }

  render() {
    return (
      <div className={"close-sty"}>
      <div onClick={this.closePage}>
        <Icon type="left" />
        <span style={{fontSize: 17}}>关闭</span>
      </div>
    </div>);
  }
}

export default withRouter(Close);
