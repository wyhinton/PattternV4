import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseButton from '../CustomButtons/CloseButton';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  debuger: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    transform: 'translate(50%, 50%)',
    color: 'white',
    backgroundColor: 'red',
    zIndex: 100,
  },
  debugerHidden: {
    display: 'none'
  }
}));




export function Debugger(props){
    const classes = useStyles();
    const [visible, setVisible] = React.useState(true);
    const invert = () =>{
      setVisible(!visible)

    }

    return(

      <div className = {classes.debuger}>
        <CloseButton  onClick = {()=>{setVisible(!visible)}} className={clsx(classes.debuger, {[classes.debugerHidden]: visible})}  />
      </div>
  )

}


export default Debugger
