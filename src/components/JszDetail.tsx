import * as React from 'react';
import { queryJsz } from "../api/queryJsz";
import { Modal, Spin } from 'antd';
require('./style/jsz-detail.css');

class JszDetail extends React.Component<any> {
  state = {
    name: "",
    idNum: "",
    phone: "",
    address: "",
    LoadingAnimal: true, // 缓冲动画
  };

  async componentWillMount() {
    try {
      const requestData = await queryJsz();
      if (requestData.status === "ok") {
        const jszInfo  = requestData.info;
        this.setState({
          name: jszInfo.name,
          idNum: jszInfo.idNum,
          phone: jszInfo.phone,
          address: jszInfo.address,
          LoadingAnimal: false,
        });
        console.log(jszInfo);
      } else {
        this.setState({
          LoadingAnimal: false,
        });
        Modal.error({
          title: "提示",
          content: "驾驶证查询失败，请稍后再试……",
          onOk: () => {
            this.props.history.push("/main/base-info");
          }
        });
      }
    } catch (e) {
      console.log(e);
    }

    window.document.title = "驾驶证详情页";
  }

  render() {

    return (
      <div className={"jsz-detail"}>
        <div className={"detail-head"}>
          <h4>驾驶证电子信息</h4>
          <p>清分日期： 2018.10.10</p>
          <p>驾驶证更新日期：2018.10.10</p>
        </div>
        <div className={"jsz-content"}>
          <div className={"content-row"}>
            <div>
              <span className={"con-key"}>姓名:</span>
              <span className={"con-val"}>{this.state.name}</span>
            </div>
          </div>
          <div className={"content-row"}>
            <span className={"con-key"}>身份证号:</span>
            <span className={"con-val"}>{this.state.idNum}</span>
          </div>
          <div className={"content-row"}>
            <span className={"con-key"}>电话:</span>
            <span className={"con-val"}>{this.state.phone}</span>
          </div>
          <div className={"content-row"}>
            <span className={"con-key"}>住址:</span>
            <span className={"con-val"}>{this.state.address}</span>
          </div>
        </div>

        {/*缓冲动画*/}
        <Spin className={"load-animal"} spinning={this.state.LoadingAnimal} size={"large"} tip="正在加载……"/>
      </div>
    );
  }
}

export default JszDetail;
