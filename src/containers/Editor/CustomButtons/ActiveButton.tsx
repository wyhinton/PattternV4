import React from 'react'
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useState, useEffect } from 'react'
const useStyles = makeStyles((theme: Theme)=>({
  root: {
    border: 1,
    borderColor: 'white',
    width: 10,
    height: 10
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

}));


export function ActiveButton(props){
  const classes = useStyles();
  const [active, setActive] = React.useState(props.active);
  const handleActiveClick = () => {
    console.log('shoudl expand')
    setActive(!active);
  };

  useEffect(()=>
    {
    console.log('setting the active prop on this active button to :', props.active)
    setActive(props.active)
    },
    [props.active]
  )

  return(
      <div className = {clsx(classes.active, {
        [classes.inactive]:props.active,
      })}
      onClick={props.onClick}
      >
      {props.active ? 't' : 'f'}
      </div>

  )
}

export default ActiveButton
