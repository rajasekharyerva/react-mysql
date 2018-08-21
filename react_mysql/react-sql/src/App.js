import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SMS from './containers/SMS';
import Layout from './layouts/Layout';
import './App.css';
//import SimpleTabs from './components/SimpleTabs';
import ScrollDialog from './components/ScrollDialog';

class App extends Component {
  render() {
    console.log('[App]...')
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/scroll-dialog" exact component={ScrollDialog} />
            <Route path="/" exact component={SMS} />
          </Switch>
        </Layout>
      </div>

    );
  }
}
export default App;