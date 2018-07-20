import * as React from 'react';
import { Button, Modal } from 'antd';
import { applyJsz } from "../api/applyJsz";
import { Spin } from "antd";
require('./style/getJsz.css');

class GetJsz extends React.Component<any> {

  state = {
    LoadingAnimal: false, // 缓冲动画
  };

  componentDidMount () {
    window.document.title = "申请驾驶证";
  }

   applyJsz = async () => {
    this.setState({
      LoadingAnimal: true
    });
    const requestData = await applyJsz();
    if (requestData.status === "ok") {

      localStorage.setItem("jsz", "true");

      Modal.info({
        title: '提示',
        content: (
          <div>
            <p>电子驾驶证申请成功。</p>
          </div>
        ),
        onOk: () => {
          this.props.history.push("/main/base-info");
        }
      });
    } else if (requestData.status === "NoLic") {
      Modal.info({
        title: '提示',
        content: (
          <div>
            <p>您还没有驾驶证。</p>
          </div>
        )
      });
    }
    this.setState({
       LoadingAnimal: false
    });
  }

  render() {
    return (
      <div>
        <div className="car-background" />
        <h4 className="electrinic-jsz">电子驾驶证</h4>
        <div className="jsz-number">
          <div>驾驶证号：</div>
          <div>{localStorage.getItem("idNum")}</div>
        </div>
        <div className="center-box">
          <Button className="get-electronic-jsz" onClick={this.applyJsz}>领取电子驾驶证</Button>
          <p className="explain-text">请点击按钮领取</p>
        </div>
        {/*缓冲动画*/}
        <Spin className={"load-animal"} spinning={this.state.LoadingAnimal} size={"large"} tip="正在加载……"/>
      </div>
    );
  }

}

export default GetJsz;
