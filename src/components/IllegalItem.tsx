import * as React from 'react';
import { illegal } from "../api/illegalData";
import "./style/illegalItem.css";

class IllegalItem extends React.Component<any> {

  state = {
    time: this.props.illegalInfo.wfsj,
    carNum: this.props.illegalInfo.hphm,
    illegalAddress: this.props.illegalInfo.wfdz,
    illegalContent: this.props.illegalInfo.wfxw,
    penalty: illegal[this.props.illegalInfo.wfxw][1],    // 罚款
    score: illegal[this.props.illegalInfo.wfxw][0], // 计分
  };

  render () {
    return (
      <div className={"illegal-item"}>
        <div className={"illegal-title"}>
          {this.state.time}
        </div>
        <div className={"illegal-content"}>
          <div className={"ill-row"}>
            <div>车牌号:</div>
            <div>{this.state.carNum}</div>
          </div>
          <div className={"ill-row"}>
            <div>时间:</div>
            <div>{this.state.time}</div>
          </div>
          <div className={"ill-row"}>
            <div>地点:</div>
            <div>{this.state.illegalAddress}</div>
          </div>
          <div className={"ill-row"}>
            <div>违法行为:</div>
            <div>{illegal[this.state.illegalContent][2]}</div>
          </div>
          <div className={"bottom-row"}>
            <div>
              <div>罚款:</div>
              <div>{this.state.penalty ? this.state.penalty : 0}元</div>
            </div>
            <div>
              <div>计分:</div>
              <div>{this.state.score}分</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IllegalItem;
