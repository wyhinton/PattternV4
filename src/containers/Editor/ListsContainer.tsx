import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import List from './Modifier/beautifulDrag/List'
import Item from './Modifier/beautifulDrag/Item'

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
  addGroupButton: {
    width: '100%',
     color: 'black',
    textAlign: 'center'

  }
}));

// const listArray = (testListArray) => ({
//     testListArray.lists.map((list)=>{
//     <List id = {list.id} key = {list.id}/>
//   })
// })
// const listArray =  (testListArray) =>({
//   testListArray.map((list)=>{
//     <List id = {list.id} key = {list.id}/>
//   })
// })

export default function ListsContainer(props:{activeListIndex: number, listArray: any}) {

  const classes = useStyles();
  const [value, setValue] = useState(0);
  useEffect(()=>{
    setValue(props.activeListIndex)
    console.log(props.listArray)
  }, [props.activeListIndex]
  )
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <div className={classes.root}>
    <div className = {classes.addGroupButton  }> add group </div>
      {props.listArray.lists.map(list=>{
        if (list.type == 'group'){
          return(
            <div style = {{backgroundColor: `${list.color}`, padding: 10}}>
              <List id = {list.id} key = {list.id} isActive = {list.id == props.activeListIndex} listItems = {list.content.listItems}/>
            </div>
          )}
      })}
    </div>
  );
}
