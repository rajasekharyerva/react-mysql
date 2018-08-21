import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer({ children, dir }) {
  console.log('(TabContainer)...')
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1518,
  },
});

class SimpleTabs extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    console.log('(handleChange)...')
    this.setState({ value });
  };

  handleChangeIndex = index => {
    console.log('(handleChangeIndex)...')
    this.setState({ value: index });
  };

  render() {
    console.log('[SimpleTabs]...');
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
                          <a rel="noopener noreferrer" href="https://translate.google.com/" target="_blank">Aఅअ</a>
                        </TabContainer>
          <TabContainer dir={theme.direction}><a rel="noopener noreferrer" href="https://news.google.com/?hl=en-IN&gl=IN&ceid=IN:en" target="_blank">NEWS</a></TabContainer>
          <TabContainer dir={theme.direction}>TabContainer 3</TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SimpleTabs);