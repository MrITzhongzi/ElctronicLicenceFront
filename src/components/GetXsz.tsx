import * as React from 'react';
import { Button } from 'antd';
require('./style/getXsz.css');

class GetXsz extends React.Component {

  state = {

  };

  componentDidMount () {
    window.document.title = "获取行驶证";
  }

  render() {

    return (
      <div className="get-xsz">
        <div className="car-background" />
        <h4 className="electrinic-xsz">电子行驶证</h4>
        <div className="jsz-number">
          <div>车牌号：</div>
          <div>鲁F2222</div>
        </div>
        <div className="center-box">
          <Button className="get-electronic-xsz">领取电子驾驶证</Button>
          <p className="explain-text">请点击按钮领取</p>
        </div>

      </div>
    );
  }

}

export default GetXsz;
