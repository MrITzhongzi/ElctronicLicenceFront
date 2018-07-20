import * as React from 'react';
import {
  // HashRouter as Router,
  Route,
  // Switch
} from 'react-router-dom';
import CardList from "./CardList";
import BaseJsz from "./BaseJsz";
import GetJsz from "./GetJsz";
import GetXsz from "./GetXsz";
import JszDetail from "./JszDetail";
import XszDetail from "./XszDetail";
import ShowCarInfo from './ShowCarInfo';
import AddXsz from './AddXsz';
import BaseXsz from './BaseXsz';
import IllegalQuery from './IllegalQuery';
require("./style/main.css");

class Main extends React.Component {

  state = {};

  render() {
    return (
      <div>
        <Route path="/" exact={true} component={CardList}/>
        {/*驾驶证相关*/}
        <Route path="/main/base-info" component={BaseJsz}/>
        <Route path="/main/get-jsz" component={GetJsz}/>
        <Route path="/main/jsz-detail" component={JszDetail}/>
        {/*行驶证相关*/}
        <Route path="/main/get-xsz" component={GetXsz}/>
        <Route path="/main/show-car-info" component={ShowCarInfo}/>
        <Route path="/main/add-xsz" component={AddXsz}/>
        <Route path="/main/base-xsz/:id" component={BaseXsz}/>
        <Route path="/main/xsz-detail/:id" component={XszDetail}/>
        <Route path="/main/illegal-query" component={IllegalQuery}/>
      </div>
    );
  }

}

export default Main;
