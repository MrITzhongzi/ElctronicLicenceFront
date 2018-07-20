import * as React from "react";
import { Button, Spin } from 'antd';
import CarInfo from "./CarInfo";
import { queryXszList } from "../api/queryXsz";
import { getXszList } from "../api/getXszList";
require('./style/show-car-info.css');

class ShowCarInfo extends React.Component<any> {

  state = {
    exist: [],
    LoadingAnimal: true, // 缓冲动画
  };

  async componentWillMount() {

    let tmpArr: any[] = [];
    let xszListInfo: any = await this.getXszList();
    console.log(xszListInfo, "xszListInfo");
    // xszListInfo = JSON.parse(xszListInfo);
    if (null !== xszListInfo) {
      for (let i = 0; i < xszListInfo.length; i++) {
        let requestData = await queryXszList(xszListInfo[i].cllx, xszListInfo[i].hphm);
        if (requestData.data.status === "ok") {
          requestData.data.info.index = i;   // 标记 该车辆行驶证的详细信息  与 缓存中 行驶证列表的对应关系
          tmpArr.push(requestData.data.info);
        }
      }
    }
    window.document.title = "行驶证列表";
    this.setState({
      exist: tmpArr,
      LoadingAnimal: false
    });
  }

  componentDidMount() {
    // 1
  }

  getXszList = async () => {
    let xszSimbleInfoList = await getXszList();
    return xszSimbleInfoList.xsz;
  }

  addCar = () => {
    this.props.history.push("/main/add-xsz");
  }

  render() {

    return (
      <div>
        <div className={"show-car-list"}>
          {
            this.state.exist.map((val, index) => <CarInfo key={index} carInfo={val} history={this.props.history} />)}
        </div>
        <div className={"add-car-info"}>
          <Button onClick={this.addCar}>添加</Button>
          {/*<p>只可添加自己名下的车辆</p>*/}
        </div>
        {/*缓冲动画*/}
        <Spin className={"load-animal"} spinning={this.state.LoadingAnimal} size={"large"} tip="正在加载……"/>
      </div>
    );
  }
}

export default ShowCarInfo;
