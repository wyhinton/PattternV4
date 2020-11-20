import React from "react";
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
// import type {Color} from '@types/color'
import NodeHandle from './NodeHandle'
import Color from 'color'

const useStyles = makeStyles((theme)=>({
  root: {
    borderRadius: 10,
    height: 20,
    width: '50%',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: 'auto'
  }
}));

export default function NodeContainer(props:{id: number, nodeHandles: any}){
  const classes = useStyles();
  return (
    <div className = {classes.root}>
    {props.nodeHandles.lists.map(list=>{
      return(
        <NodeHandle id = {list.id} key = {list.id} color = {Color("red")}/>
      )
    })}
    </div>
  )
}
