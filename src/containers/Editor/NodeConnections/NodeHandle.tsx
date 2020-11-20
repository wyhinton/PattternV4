import React from "react";
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import Color from 'color'

const useStyles = makeStyles((theme)=>({
  root: {
    borderRadius: 10,
    height: 10,
    width: 10,
    border: '1px solid black'
  }
}));

export default function NodeHandle(props:{id: number, color: Color}){
  const classes = useStyles();
  return (
    <div className = {classes.root} style = {{backgroundColor: `${props.color}`}}>
    </div>
  )
}
