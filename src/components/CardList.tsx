import * as React from 'react';
import Jiashizheng from './Jiashizheng';
import Xingshizheng from  './Xingshizheng';

export default class CardList extends React.Component<any> {

  componentDidMount () {

   // this.initWeiXin();

   window.document.title = "电子证件";
  }

  render() {
    return (
      <div >

        <Jiashizheng />
        <Xingshizheng/>
      </div>
    );
  }
}
