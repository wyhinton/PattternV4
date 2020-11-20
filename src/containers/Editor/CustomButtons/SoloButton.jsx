import React from 'react'
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useState, useEffect } from 'react'

const useStyles = makeStyles((theme)=>({
  root: {
    border: 1,
    borderColor: 'white',
    // width: 10,
    height: '100%'
  },
  active: {
    border: '1px solid white',
    width: 15,
    textAlign: 'center',
    height: '100%',
    borderRadius: 5,
    background: 'lightgrey'
  },
  inactive: {
    border: '1px solid white',
    width: 15,
    height: '100%',
    textAlign: 'center',
    backgroundColor: 'cyan',
    borderRadius: 5
  },

}));


export function SoloButton(props){
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
      <div className = {clsx(classes.active, {[classes.inactive]:props.active})} onClick={props.onClick}>
        <strong>S</strong>
      </div>
  )
}

export default SoloButton
