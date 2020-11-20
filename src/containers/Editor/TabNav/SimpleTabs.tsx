import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel'
import { useState, useEffect } from 'react'
function a11yProps(index) {
  return {
    id: index,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  customTab: {
    minWidth: 'auto'
  },
  tabNav: {
    justifyContent: 'space-around'
  },
  MuiTabs: {
    justifyContent: 'space-around'
  },
  tabContainer: {
    display: 'flex',
    width: '100%'
  }
}));

export default function SimpleTabs(props:{handleTabClick: any, activeTab: any}) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  useEffect(()=>{
    setValue(props.activeTab)
  }, [props.activeTab]
  )
  const handleChange = (event) => {
    console.log(event)
    console.log(event.target)
    // setValue(newValue);
  };

  return (
      <AppBar position="static">
        <TabPanel value = {props.activeTab}>
          <Tab className = "tab" value = {1} onClick = {(e)=>{handleChange(e)}}> Set 1</Tab>
          <Tab className = "tab" value = {2} onClick = {(e)=>{handleChange(e)}}> Set 2</Tab>
          <Tab className = "tab" value = {3} onClick = {(e)=>{handleChange(e)}}> Set 3</Tab>
        </TabPanel>
      </AppBar>
  );
}
