import React from "react";
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import { useState, useEffect } from 'react'
import clsx from 'clsx';

const useStyles = makeStyles((theme)=>({
  root: {
    borderRadius: 10,
    height: 10,
    width: 10,
    border: '1px solid black'
  },
  expand: {
    padding: 0,
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    height: '100%',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

}));

export default function MinimizeButton(props){
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  useEffect(()=>{
    setExpanded(props.minimized)
  }, [props.minimized])

  // const handleExpandClick = () => {
  //   console.log('shoudl expand')
  //   setExpanded(!expanded);
  // };


  return (
    <IconButton
      className={clsx(classes.expand, {
        [classes.expandOpen]: expanded,
      })}
      onClick={props.onClick}
      aria-expanded={expanded}
      aria-label="show more"
    >
        <ExpandLessIcon/>
    </IconButton>
  )
}
