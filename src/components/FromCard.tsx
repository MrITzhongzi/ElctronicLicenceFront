import * as React from 'react';
import { GetCard } from "../api/GetCard";

class FromCard extends React.Component<any> {

  async componentDidMount () {
    let responseData = await GetCard(this.props.match.params.id);

    this.catchData(responseData.user, responseData.card);

    if (responseData.card.type === "JSZ") {
      // 1
      window.location.href = "http://cgs.ytjj.gov.cn/ElectronicLic/index.html#/main/base-info";
    }

    if (responseData.card.type === "XSZ") {
      // 1
      window.location.href = "http://cgs.ytjj.gov.cn/ElectronicLic/index.html#/main/base-xsz/0";
    }
  }

  catchData = (user: any, card: any) => {
    localStorage.setItem("token", user.token);
    localStorage.setItem("idNum", user.idNum);
    localStorage.setItem("name", user.name);
    localStorage.setItem("phone", user.phone);

    if (card.cllx !== null && card.hphm !== null) {
      let tmpArr: object[] = [];
      let tmpObj = {
        hphm: card.hphm,
        cllx: card.cllx
      };
      tmpArr.push(tmpObj);
      let tmpStr = JSON.stringify(tmpArr);
      localStorage.setItem("xsz", tmpStr);
    }
  }

  render () {
    return <div>页面跳转中，请稍候……</div>;
  }
}

export default FromCard;
