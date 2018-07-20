import * as React from 'react';
import {
  HashRouter as Router,
  Route, Switch, Redirect
} from 'react-router-dom';
import './App.css';
import Login from './Login';
import { token } from './api/Token';
import Main from './components/Main';

const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={props => (
    token() ? <Component {...props}/>
      :
      <Redirect
        to={{
        pathname: '/login',
        state: { from: props.location }
      }}
      />
  )}
  />
);

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/Login" component={Login}/>
          {/*私有数据*/}
          <PrivateRoute path="/" component={Main}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
