import * as React from 'react';
import { Icon } from 'antd';
require('./style/card-list.css');

const styles = {
  icon: {
    fontSize: 50,
    color: "orange"
  },
  pDom: {
    fontSize: 16,
    color: "#666",
    marginTop: 20
  }
};

export default class LoginError extends React.Component<any> {

  render() {
    return (
      <div style={{textAlign: "center",  paddingTop: 60 }}>
        <Icon type="meh-o" style={styles.icon}/>
        <p style={styles.pDom} >登录失败，请稍后重新登录……</p>
      </div>
    );
  }
}
