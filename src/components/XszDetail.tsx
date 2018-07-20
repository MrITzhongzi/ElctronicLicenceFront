import * as React from 'react';
import { queryXszList } from "../api/queryXsz";
// const QRCode = require('qrcode.react');
import { qiyouType, carUseType, CarType } from "../api/TypeChange";
import { Modal, Spin } from "antd";
require('./style/xsz-detail.css');
var Barcode = require('react-barcode');

class XszDetail extends React.Component<any> {
  state = {
    choosedData: {
      hphm: "",  // 号牌号码
      cllx: "", // 车辆类型
      syr: "", // 所有人
      zzxxdz: "", // 地址
      syxz: "", // 使用性质
      clpp1: "", // 品牌
      clxh: "", // c车辆型号
      clsbdh: "", // 车辆识别代号
      fdjh: "", // 发动机号
      fzrq: "", // 发证日期
      dabh: "",
      ccdjrq: "", // 注册日期
      hdzk: "", // 核定载客
      zzl: "", // 总质量
      zbzl: "",
      cwkc: "", // 长
      cwkk: "", // 宽
      cwkg: "", // 高
      rlzl: "", // 燃料种类
      yxqz: "", // 有效期止
      gxrq: "",
      xszbh: "", // 一维码内容
    },
    LoadingAnimal: true, // 缓冲动画
  };

  async componentWillMount() {
    let params = this.props.match.params.id;
    let catchXsz: any = localStorage.getItem("xsz");
    console.log(catchXsz, "catchXsz");

    if (null !== catchXsz) {
      catchXsz = JSON.parse(JSON.parse(catchXsz));

      console.log(catchXsz, "catchXsz");
      console.log(catchXsz[params]);
      let carType = catchXsz[params].Cllx;
      let carNum = catchXsz[params].Hphm;
      let requestData = await queryXszList(carType, carNum);
      console.log(requestData, "requestData");
      if (requestData.data.status === "ok") {

        this.setState({
          choosedData: requestData.data.info,
          index: params,
          LoadingAnimal: false
        });
      } else {
        this.setState({
          LoadingAnimal: false
        });
        Modal.info({
          title: "提示",
          content: "查询驾驶证失败，请稍后重试……",
          onOk: () => {
            this.props.history.push("/main/show-car-info");
          }
        });
      }
    }

    window.document.title = "行驶证详细信息";
  }

  render() {

    let reqData = this.state.choosedData;
    // 条形码配置
    let barCodeSty = {
      background: "transparent",
      width: 1.1,  // 左右1.1
      height: 30,
      margin: 0,
      displayValue: false
    };
    console.log(reqData, "qqq");

    console.log(reqData, "1111");

    return (
      <div className={"xsz-detail"}>
        <div className={"detail-head"}>
          <h4>行驶证电子信息</h4>
          <p>检验有效期止： {reqData.yxqz.split(' ')[0]}</p>
          <p>数据更新日期： {reqData.gxrq.split(" ")[0]}</p>
        </div>
        <div className={"xsz-content"} >
          <div className={"content-row"}>
            <div>
              <span className={"con-key"}>号牌号码:</span>
              <span className={"con-val"}>{"鲁" + reqData.hphm}</span>
            </div>
            <div>
              <span className={"con-key"}>车辆类型:</span>
              <span className={"con-val"}>{CarType[reqData.cllx]}</span>
            </div>
          </div>
          <div className={"content-row"}>
            <span className={"con-key"}>所有人:</span>
            <span className={"con-val"}>{reqData.syr}</span>
          </div>
          <div className={"content-row"}>
            <span className={"con-key"}>住址:</span>
            <span className={"con-val"}>{reqData.zzxxdz}</span>
          </div>
          <div className={"content-row"}>
            <div>
              <span className={"con-key"}>使用性质:</span>
              <span className={"con-val"}>{carUseType[reqData.syxz]}</span>
            </div>
            <div>
              <span className={"con-key"}>品牌型号:</span>
              <span className={"con-val"}>{reqData.clpp1 + reqData.clxh}</span>
            </div>
          </div>
          <div className={"content-row"}>
            <span className={"con-key"}>车辆识别代号:</span>
            <span className={"con-val"}>{reqData.clsbdh}</span>
          </div>
          <div className={"content-row"}>
            <span className={"con-key"}>发动机号码:</span>
            <span className={"con-val"}>{reqData.fdjh}</span>
          </div>
          <div className={"content-row"}>
            <div>
              <span className={"con-key"}>注册日期:</span>
              <span className={"con-val"}>{reqData.ccdjrq.split(" ")[0]}</span>
            </div>
            <div>
              <span className={"con-key"}>发证日期:</span>
              <span className={"con-val"}>{reqData.fzrq.split(" ")[0]}</span>
            </div>
          </div>
        </div>

        <div className={"xsz-content"}>
          <div className={"content-row"}>
            <span className={"con-key"}>档案编号:</span>
            <span className={"con-val"}>{reqData.dabh}</span>
          </div>
          <div className={"content-row"}>
            <div>
              <span className={"con-key"}>核定载人数:</span>
              <span className={"con-val"}> {reqData.hdzk + "人"}</span>
            </div>
            <div>
              <span className={"con-key"}>总质量:</span>
              <span className={"con-val"}>{reqData.zzl + "kg"}</span>
            </div>
          </div>
          <div className={"content-row"}>
            <span className={"con-key"}>整备质量:</span>
            <span className={"con-val"}>{reqData.zbzl + "kg"}</span>
          </div>
          <div className={"content-row"}>
            <span className={"con-key"}>外廓尺寸:</span>
            <span className={"con-val"}>{`${reqData.cwkc}*${reqData.cwkk}*${reqData.cwkg}mm`}</span>
          </div>
          <div className={"content-row"}>
            <span className={"con-key"}>燃料种类:</span>
            <span className={"con-val"}>{qiyouType[reqData.rlzl]}</span>
          </div>

          <div className={"content-row"}>
            <span className={"con-key"} >证件一维码:</span>
            <span className={"con-val"}><Barcode  value={reqData.xszbh} {...barCodeSty}/></span>
          </div>
        </div>
        {/*缓冲动画*/}
        <Spin className={"load-animal"} spinning={this.state.LoadingAnimal} size={"large"} tip="正在加载……"/>
      </div>
    );
  }
}

export default XszDetail;
