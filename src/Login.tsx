import * as React from 'react';
import {
  Button,
  Input,
  Modal
} from 'antd';
import login from './api/Login';
import './App.css';

const backgroundImg = require("./images/background.jpg");

export default class Login extends React.Component<any> {

  state = {
    username: "",
    pwd: ""
  };

  // async componentDidMount() {
  //
  // }

  parseUrlToParams = () => {
    let paramsObj = {};
    let requestPatams = "";
    paramsObj = {
      "name": "李洪伟",  // 姓名
      "idNum": "370523199403311011",   // 身份证号
      "phone": "17862806857", // 手机号
    };
    requestPatams = JSON.stringify(paramsObj);
    return requestPatams;
  }

  loginBtn = async () => {
    let account = this.state.username;
    let password = this.state.pwd;
    console.log(account, password);
    if (account === "lihongwei" && password === "123456") {
      let data = this.parseUrlToParams();
      console.log(data, "data");
      const success = await login(data);
      if (success) {
        this.props.history.replace("/");
        return;
      }
    } else {
      Modal.info({
        title: "提示",
        content: "用户名密码错误"
      });
    }
  }

  inputName = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  inputPwd = (e) => {
    this.setState({
      pwd: e.target.value
    });
  }

  render() {
    const loginSty = {
      boxSty: {
        height: "100vh",
        paddingTop: "30vh",
        background: "url(" + backgroundImg + ") center / cover no-repeat"
      },
      loginCon: {
        width: "80vw",
        height: "30vh",
        margin: "auto",
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
      },
      InputSty: {
        margin: "10px 0"
      },
      loginBtn: {
        marginTop: "25px"
      }
    };
    return (
      <div className="App" style={loginSty.boxSty}>
        <div className="login-con" style={loginSty.loginCon}>
          <Input placeholder="账号" style={loginSty.InputSty} onChange={(e) => this.inputName(e)}/>
          <Input placeholder="密码" style={loginSty.InputSty} type={"password"} onChange={(e) => this.inputPwd(e)}/>
          <Button type="primary" size={"large"} style={loginSty.loginBtn} onClick={this.loginBtn}>登陆</Button>
        </div>
      </div>
    );
  }
}
