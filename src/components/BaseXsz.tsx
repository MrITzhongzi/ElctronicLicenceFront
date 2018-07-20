import * as React from "react";
// import Xingshizheng from './Xingshizheng';
import { Table, Button, Spin } from 'antd';
import { deleteXsz } from "../api/deleteXsz";
import { queryXszList } from "../api/queryXsz";
import { Modal } from "antd";
import { getXszList } from "../api/getXszList";
require('./style/base-xsz.css');

class BaseJsz extends React.Component<any> {

  state = {
    choosedData: {
      yxqz: "",
      zt: "",  // 车辆状态
      hphm: "",
      cllx: "",
      suoyouren: "",
      zzxxdz: "",
      syxz: "",
      clxh: "",
      clsbdh: "",
      fdjh: "",
      ccdjrq: "",
      fzrq: "",
      dabh: "",
      hdzk: "",
      zzl: "",
      zbzl: "",
      cwkc: "",
      cwkk: "",
      cwkg: "",
      rlzl: "",
      idNum: ""
    },
    // hphm: "",      // 号牌号码
    url: "",
    index: "", // 数据库中驾驶证列表 对应 缓存中 驾驶证列表的第几个
    LoadingAnimal: true, // 缓冲动画
    xszIndex: this.props.match.params.id,
    currentCllx: "", // 当前车辆类型
    currentHphm: "", // 当亲车辆号码
  };

  async componentWillMount() {

    this.initData();
    this.setUrl();

    window.document.title = "行驶证基本信息";
  }
  getXszList = async () => {
    let xszSimbleInfoList = await getXszList();
    return xszSimbleInfoList.xsz;
  }

  initData = async () => {
    let params = this.state.xszIndex;
    let catchXsz: any =  await this.getXszList();
    console.log(catchXsz, "catchXsz");
    // catchXsz = JSON.parse(catchXsz);
    let carType = catchXsz[params].cllx;
    let carNum = catchXsz[params].hphm;
    let requestData = await queryXszList(carType, carNum);

    if (requestData.data.status === "ok") {
      this.setState({
        choosedData: requestData.data.info,
        index: params,
        LoadingAnimal: false,
        currentCllx: carType,
        currentHphm: carNum,
      });
    } else {
      if (requestData.data.status === "Unauthorized") {
        Modal.info({
          title: "提示",
          content: "您的token无效或没有登录",
        });
      } else if (requestData.data.status === "NotAllowed") {
        Modal.info({
          title: "提示",
          content: "不能查询非本人名下车辆",
        });
      } else {
        Modal.info({
          title: "提示",
          content: "查询驾驶证出现未知错误，请稍后重试……",
        });
      }

      this.props.history.push("/main/show-car-info");
      this.setState({
        LoadingAnimal: false,
      });
    }
  }

  setUrl = () => {
    let url = "http://app.ytjj.gov.cn/sdyycg/index.html#/";
    let name = localStorage.getItem("name");
    let idCard = localStorage.getItem("idNum");
    let phone = localStorage.getItem("phone");
    name = encodeURIComponent(name!);

    url += idCard + "/";
    url += name + "/";
    url += phone;

    console.log(url);
    this.setState({
      url: url
    });
  }

  goXszDetail = () => {
    this.props.history.push("/main/xsz-detail/" + this.state.index);
  }

  handleOk = () => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  deleteXsz = async () => {
    const confirm = Modal.confirm;
    this.setState({
      LoadingAnimal: true
    });

    confirm({
      title: '警告',
      content: '您确定要删除电子驾驶证么？',
      okText: "确定",
      cancelText: "取消",
      onOk: async () => {
        this.makesureDelete();
      },
      onCancel: () => {
        this.setState({
          LoadingAnimal: false
        });
      },
    });
  }

  makesureDelete = async () => {
    let responseData = await deleteXsz(this.state.currentCllx, this.state.currentHphm);
    if (responseData.status === "ok") {
     Modal.info({
       title: "提示",
       content: "该行驶证已经成功删除。",
       onOk: () => {
         this.props.history.replace('/main/show-car-info');
       }
     });
    }
    this.setState({
      LoadingAnimal: false
    });
  }

  illegal = () => {
    let params = "?currentCllx=" + this.state.currentCllx + "&currentHphm=" + this.state.currentHphm;
    this.props.history.push("/main/illegal-query" + params);
  }

  ImgClick(e: any) {
    e.preventDefault();
    return false;
  }

  render() {

    const columns = [{
      title: '检验有效期止',
      dataIndex: 'date',
      key: 'date',

    },
      {
        title: '证件号码',
        dataIndex: 'LicenceNumber',
        key: 'LicenceNumber',
      }];

    let carInfo = this.state.choosedData;

    const data = [{
      key: '1',
      date: carInfo.yxqz.split(" ")[0],
      // check: carInfo.zt,
      LicenceNumber: carInfo.idNum ,
    }];

    return (
      <div>
        <img className={"xsz-base-img"} src={require("../images/xingshizheng.png")} onClick={(e) => this.ImgClick(e)}/>
        <Table className={"xsz-base-info"} pagination={false} columns={columns} dataSource={data}/>

        <div style={{marginTop: 30}}>
          <Button className="xsz-base-btn" onClick={this.goXszDetail}>行驶证电子信息</Button>
          <Button className="jsz-base-btn" onClick={this.deleteXsz}>删除电子驾驶证</Button>
        </div>

        {/*缓冲动画*/}
        <Spin className={"load-animal"} spinning={this.state.LoadingAnimal} size={"large"} tip="正在加载……"/>
      </div>
    );
  }

}

export default BaseJsz;
