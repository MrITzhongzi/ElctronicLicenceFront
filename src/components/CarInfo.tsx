import * as React from "react";
import { Icon } from "antd";
import { queryXszList } from "../api/queryXsz";
// import { withRouter } from "react-router";
require('./style/carinfo.css');

class CarInfo extends React.Component<any, any> {

  state = {
      xszList: [],

  };

  async componentWillMount () {
    let xszTmp: any = await queryXszList(this.props.carInfo.cllx, this.props.carInfo.hphm);
    // xszTmp = JSON.parse(xszTmp.xsz);
    console.log(xszTmp, "xxxx");
    console.log(this.props.carInfo.index);
    this.setState({
      xszList: xszTmp.data.info
    });
  }

  lookOver = () => {
    // index 为后台行驶证列表 和 缓存中 行驶证列表的对应列表
    this.props.history.push("/main/base-xsz/" + this.props.carInfo.index);
  }

  render() {
    const  catchCarInfo: any = this.state.xszList;
    console.log(catchCarInfo, "catchCarInfo");
    if (this.state.xszList.length === 0) {
      return <div/>;
    }
    return (
      <div className={"one-car-info"} onClick={this.lookOver}>
        <div className={"show-car-icon"}>
          <Icon type="car" />
        </div>
        <div className={"show-car-number"}>
          {catchCarInfo.hphm}
        </div>
        <div className={"look-up"}>
          <div>查看</div>
          <Icon type="right" />
        </div>
      </div>
    );
  }
}

export default CarInfo;
