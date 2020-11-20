import React from 'react'
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import { useState, useEffect } from 'react'
import ToolbarButton from './ToolbarButton';
const useStyles = makeStyles((theme: Theme)=>({
  contextButtonContainer: {
    height: '100%',
    display: 'flex',
    width: '10%',
    position: 'absolute',
    right: '30%'
  },
}));


export function ContextButton({buttons}){
  const classes = useStyles();
  // const [active, setActive] = React.useState(props.active);

  return(
    <div className = {classes.contextButtonContainer}>
      {buttons.map((button, index)=>(
        <ToolbarButton key = {index} tooltip = {button.tooltip}
          iconClassName = {button.iconClassName}
          onClick = {()=>{button.onClick(button.value)}}
          active = {button.active}
        />
      ))}
    </div>
  )
}

export default ContextButton
