import * as React from 'react';
import { withRouter } from "react-router";
import { getXszList } from "../api/getXszList";
import { queryJsz } from "../api/queryJsz";
import { Modal, Spin } from "antd";
require("./style/jiashizheng.css");

class Jiashizheng extends React.Component<any> {

   state = {
    haveJsz: false,
     LoadingAnimal: false, // 缓冲动画
   };

   makesureHaveJsz = async () => {
     let haveJsz = await getXszList();
     this.setState({
       haveJsz: haveJsz.jsz
     });
   }

  GoJszDetail = async () => {
    this.setState({
      LoadingAnimal: true
    });
    if (this.state.haveJsz) {
      const requestData = await queryJsz();
      if (requestData.status === "ok") {
        this.props.history.push("/main/base-info");
      } else {
        Modal.info({
          title: "提示",
          content: "查询驾驶证出现错，请稍后重试。"
        });
      }
    } else {

      this.props.history.push("/main/get-jsz");
    }
    this.setState({
      LoadingAnimal: false
    });
  }

  async componentDidMount() {
    // 1
    this.makesureHaveJsz();
  }

  render() {

    return (
      <div>
        <img className={"jsz-index"} src={require("../images/jiashizheng.png")} onClick={this.GoJszDetail} />
        {/*缓冲动画*/}
        <Spin className={"load-animal"} spinning={this.state.LoadingAnimal} size={"large"} tip="正在加载……"/>
      </div>

    );
  }
}
export default withRouter(Jiashizheng);
