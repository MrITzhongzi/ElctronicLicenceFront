import * as React from "react";
// import Jiashizheng from './Jiashizheng';
import { Table, Button, Modal } from 'antd';
import { queryJsz } from "../api/queryJsz";
import { GetJszQrcode } from "../api/getQrCode";
import { Spin } from "antd";
import { deleteJsz } from "../api/deleteJsz";
require('./style/base-jsz.css');
// const QRCode = require('qrcode.react');

class BaseJsz extends React.Component<any> {

  state = {
    requestData: {
      name: "",
      idNum: "",
      phone: "",
      address: "",
    },
    visible: false,
    url: "",
    jszInfo: ``,
    LoadingAnimal: true, // 缓冲动画
  };

  async componentDidMount() {

    const requestData = await queryJsz();

    if (requestData.status === "ok") {
      this.setState({
        requestData: requestData.info,
        LoadingAnimal: false
      });
    } else if ( requestData.status === "isDelete" ) {
      Modal.info({
        title: "提示",
        content: "您的驾驶证已经正产删除",
        onOk: () => {
          this.props.history.push("/");
        }
      });
    } else {
      Modal.error({
        title: "警告",
        content: "查询驾驶证失败，请稍后再试……",
        onOk: () => {
          this.props.history.push("/");
        }
      });
      this.setState({
        LoadingAnimal: false
      });
    }
    window.document.title = "驾驶证基本信息";
    this.setUrl();
    // this.qrCodeData();
  }

  qrCodeData = async () => {
    let tmp = await GetJszQrcode();
    console.log(tmp, "ttt");
    // console.log(tmp);
    if (tmp.status === "ok") {
      this.setState({
        jszInfo: tmp.data
      });
    }
  }

  setUrl = () => {
    let url = "http://app.ytjj.gov.cn/sdyycjg/index.html#/";
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

  backMainPage = () => {
    this.props.history.push("/");
  }

  GoJszElectronic = () => {
    this.props.history.push("/main/jsz-detail");
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
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

  DeleteElectronicJsz = async () => {
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
    let responseData = await deleteJsz();
    if (responseData.status === "ok") {
      Modal.info({
        title: "提示",
        content: "该行驶证已经成功删除。",
        onOk: () => {
          this.props.history.replace('/');
        }
      });
    }
    this.setState({
      LoadingAnimal: false
    });
  }

  tipMsg = (msg: string) => {
    Modal.info({
      title: "提示",
      content: msg,
    });
  }

  ImgClick (e: any) {
    // 1
    e.preventDefault();
    return false;
  }

  render() {
    let requestData = this.state.requestData;

    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',

    }, {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '证件',
      dataIndex: 'status',
      key: 'status',
    }];

    const data = [{
      key: '1',
      name: requestData.name,
      phone: requestData.phone,
      status: "身份证",
    }];

    return (
      <div>
        <div>
          <img className={"jsz-base-img"} src={require('../images/jiashizheng.png')} onClick={(e) => this.ImgClick(e)}/>
          <Table className={"jsz-base-info"} pagination={false} columns={columns} dataSource={data}/>

          <div style={{marginTop: 30}}>
            {/*<Button className="jsz-base-btn" onClick={this.showModal}>驾驶证二维码</Button>*/}
            <Button className="jsz-base-btn" onClick={this.GoJszElectronic}>驾驶证电子信息</Button>
            <Button className="jsz-base-btn" onClick={this.DeleteElectronicJsz}>删除电子驾驶证</Button>
          </div>

        </div>
        {/*缓冲动画*/}
        <Spin className={"load-animal"} spinning={this.state.LoadingAnimal} size={"large"} tip="正在加载……"/>
      </div>
    );
  }

}

export default BaseJsz;
