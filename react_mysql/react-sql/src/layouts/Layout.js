import React, { Component } from 'react';
import AppBar from '../components/AppBar';
import SimpleTabs from '../components/SimpleTabs';

class Layout extends Component {
    render() {
        console.log('[Layout]...')
        return (
            <div>
                <AppBar />
                <SimpleTabs />
                <main>{this.props.children}</main>
            </div>
        )
    }
};

export default Layout;