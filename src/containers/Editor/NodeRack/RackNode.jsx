import React from 'react'
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useState, useEffect } from 'react'
import {  useStoreActions } from 'easy-peasy'
const useStyles = makeStyles((theme)=>({
  root: {
    border: 1,
    borderColor: 'white',
    width: 300,
    backgroundColor: 'red',
    height: '100%',
    marginLeft: 10,
    overflowWrap: 'break-word'
  },
  active: {
    border: '1px solid white',
    width: 15,
    height: 15,
    // backgroundColor: theme.palette.secondary.main,
    borderRadius: 20,
    background: 'white'
  },
  inactive: {
    border: '1px solid white',
    width: 15,
    height: 15,
    backgroundColor: 'black',
    borderRadius: 20
  },
  selected: {
    border: '2px solid orange',
    width: 300,
    backgroundColor: 'red',
    height: '100%',
    marginLeft: 10,
    overflowWrap: 'break-word'
  }

}));


export function RackNode(props){
  const classes = useStyles();
  useEffect(()=>{
    console.log('rack node props are: ', props);
  })
  const selectNode = useStoreActions(actions => actions.global.nodes.setSelectedRackNodes)
  return(
      <div
        className = {props.data.rackSelected ? classes.selected : classes.root}
        onClick = {(e)=>{selectNode({e: e, ni: props})}}>
        {JSON.stringify(props)}
      </div>
  )
}

export default RackNode
