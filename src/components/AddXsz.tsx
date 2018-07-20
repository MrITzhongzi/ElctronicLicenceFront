import * as React from 'react';
import { Select, Input, Button, Modal, Spin  } from 'antd';
import { addXszInterface } from "../api/AddXsz";
require("./style/addjsz.css");

const Option = Select.Option;

class AddXsz extends React.Component<any> {
  state = {
    type: "02",
    num: "",
    prefix: "F",
    LoadingAnimal: false, // 缓冲动画
  };

  componentDidMount () {
    window.document.title = "增加行驶证";
  }

  handleChange = (value: any) => {
    this.setState({
      prefix: value
    });
  }

  handleCarType = (value: any) => {
    this.setState({
      type: value
    });
  }

  inputNumber = (e: any) => {
    this.setState({
      num: e.target.value
    });
  }

  submitData = async () => {
    this.setState({
      LoadingAnimal: true
    });
    let carType = this.state.type;
    let carNum = `鲁${this.state.prefix}${this.state.num}`.toUpperCase();
    let requestData = await addXszInterface(carType, carNum);
    if (requestData.data.status === "ok") {
      // 1
      Modal.success({
        title: '提示',
        content: '行驶证申请提交成功！',
        onOk: () => {
         this.props.history.push("/main/show-car-info");
        }
      });

    } else  {
      if (requestData.data.status === "Unauthorized") {
        this.tipMsg("您的登陆信息无效，请重新登陆……", null);
      } else if (requestData.data.status === "NotAllowed") {
        this.tipMsg("只能添加本人名下的车辆。", null);
      } else if (requestData.data.status === "AlreadyExists ") {
        this.tipMsg("该电子行驶证已经存在，不能重复领取。", null);
      } else {
        this.tipMsg("行驶证申请失败，请稍后重试……", null);
      }
    }
    this.setState({
      LoadingAnimal: false
    });
  }

  tipMsg = (msg, callback) => {
    Modal.info({
      title: "提示",
      content: msg,
      onOk: () => {
        if (callback !== null) {
          callback();
        }
      }
    });
  }

  render() {
    return (
      <div className={"add-jsz-info"}>
        <div className="write-jsz-num">
          <p>号牌号码：</p>
          <div className={"write-number"}>
            <div>鲁</div>
            <div>
              <Select defaultValue={"F"}  style={{ width: 55 }} onChange={this.handleChange}>
                <Option value="F">F</Option>
                <Option value="Y">Y</Option>
              </Select>
            </div>
            <div>
              <Input placeholder="请输入车牌号码"  onChange={(e) => {this.inputNumber(e); }} />
            </div>
          </div>
        </div>
        <div className={"choose-car-type"}>
          <p>号牌种类：</p>
          <Select defaultValue={"02"}  style={{ width: "60vw", marginLeft: "20vw" }} onChange={this.handleCarType}>
            <Option value={"01"}>大型汽车</Option>
            <Option value={"02"}>小型汽车</Option>
            <Option value={"03"}>使馆汽车</Option>
            <Option value={"04"}>领馆汽车</Option>
            <Option value={"05"}>境外汽车</Option>
            <Option value={"06"}>外籍汽车</Option>
            <Option value={"07"}>普通摩托车</Option>
            <Option value={"08"}>轻便摩托车</Option>
            <Option value={"09"}>使馆摩托车</Option>
            <Option value={"10"}>领馆摩托车</Option>
            <Option value={"11"}>境外摩托车</Option>
            <Option value={"12"}>外籍摩托车</Option>
            <Option value={"13"}>低速车</Option>
            <Option value={"14"}>拖拉机</Option>
            <Option value={"15"}>挂车</Option>
            <Option value={"16"}>教练汽车</Option>
            <Option value={"17"}>教练摩托车</Option>
            <Option value={"18"}>试验汽车</Option>
            <Option value={"19"}>试验摩托车</Option>
            <Option value={"20"}>临时入境汽车</Option>
            <Option value={"21"}>临时入境摩托车</Option>
            <Option value={"22"}>临时行驶车</Option>
            <Option value={"23"}>警用汽车</Option>
            <Option value={"24"}>警用摩托</Option>
            <Option value={"51"}>大型新能源汽车</Option>
            <Option value={"52"}>小型新能源汽车</Option>

          </Select>
        </div>

        <div className={"add-jsz-submit"}>
          <Button onClick={this.submitData}>提交</Button>
        </div>

        {/*缓冲动画*/}
        <Spin className={"load-animal"} spinning={this.state.LoadingAnimal} size={"large"} tip="正在加载……"/>
      </div>
    );
  }
}

export default AddXsz;
