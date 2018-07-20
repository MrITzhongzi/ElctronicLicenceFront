import * as React from 'react';
import IllegalItem from './IllegalItem';
import { illegalQuery } from "../api/IllegalQuery";
import { Icon, Spin } from "antd";
import "./style/illegalQuery.css";

class IllegalQuery extends React.Component<any> {

  state = {
    illegalInfoArrat: [],
    LoadingAnimal: true, // 缓冲动画
  };

  async componentDidMount () {
    let params = new URLSearchParams(this.props.location.search);
    let carType: any = params.get("currentCllx");
    let carNum: any = params.get("currentHphm");
    carNum = encodeURIComponent(carNum);
    let IllegalList = await illegalQuery(carType, carNum);
    if (IllegalList.data.status === "ok") {
      let tmpArr = this.filterData(IllegalList.data.info.result);
      this.setState({
        illegalInfoArrat: tmpArr,
        LoadingAnimal: false
      });
    }
    console.log(IllegalList);
  }

  /**
   * 过滤掉已经处理过的违法信息
   * @param responseData
   * @returns {any}
   */
  filterData = (responseData: any) => {
    let tmpArr: any = [];
    // responseData.forEach((val) => {
    //
    // });
    for (let i = 0; i < responseData.length; i++) {
      let val = responseData[i];
      if (val.jbr === null && val.clsj === null) {
        tmpArr.push(val);
      }
    }
    return tmpArr;
  }

  render () {
    return (
      <div>

        {
          this.state.illegalInfoArrat.length === 0
            ?
            <div className={"no-illegal-info"}>
              <div className={"no-illegal-icon"}><Icon type="smile-o" /></div>
              <p>暂时没有违法信息……</p>
            </div>
            :
            this.state.illegalInfoArrat.map((val: any, index) => {
            return <IllegalItem key={index} illegalInfo={val}  />;
          })
        }
        {/*<IllegalItem key="ttt"
        illegalInfo={{wfsj: "1", hphm: "2", wfdz: "2", fkje: "1", score: "2", wfxw: "12140" }} />*/}

        {/*缓冲动画*/}
        <Spin className={"load-animal"} spinning={this.state.LoadingAnimal} size={"large"} tip="正在加载……"/>
      </div>
    );
  }
}

export default IllegalQuery;
