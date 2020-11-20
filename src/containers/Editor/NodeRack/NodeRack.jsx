import React from 'react'
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useState, useEffect } from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Container from './Container';
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme: Theme)=>({
  nodeRackActive: {
    border: 1,
    width: '100vw',
    height: '30%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'red',
    transform: 'translate(0px, 0px)',
    transition: 'transform .5s ease-out',
    zIndex: 1000,
    backgroundColor: 'lightgrey',
    borderTop: '1px solid black',
    overflowY: 'scroll',
    overflowX: 'hidden',
    paddingTop: 10
  },
  nodeRackInactive: {
    border: 1,
    borderColor: 'white',
    width: '100vw',
    height: 100,
    position: 'absolute',
    bottom: 0,
    zIndex: 1000,
    transform: 'translate(0px, 110px)',
    backgroundColor: 'red',
    transition: 'transform .5s ease-out',
    backgroundColor: 'lightgrey',
    borderTop: '1px solid black'
  },
  buttonActive: {
    border: '1px solid white',
    width: 15,
    height: 15,
    borderRadius: 20,
    margin: 'auto',
    background: 'white',
    transform: 'translate(50vw, -318px)',
    position: 'absolute',
    bottom: 0,
    zIndex: 1001,
    transition: 'transform .5s ease-out',
    backgroundColor: 'lightgreen'

  },
  buttonInactive: {
    margin: 'auto',
    border: '1px solid white',
    width: 15,
    height: 15,
    borderRadius: 20,
    transform: 'translate(50vw, -20px)',
    position: 'absolute',
    bottom: 0,
    zIndex: 1001,
    transition: 'transform .5s ease-out',
    backgroundColor: 'lightgreen'
  },
  arrowActive: {
    transform: 'rotate(0deg)'
  },
  arrowInactive: {
    transform: 'rotate(180deg)'
  },
  rackRoot: {
    height: 'fit-content',
    position: 'absolute',
    // backgroundColor: 'purple'
  }

}));


export function ActiveButton(props){
  const classes = useStyles();
  const [active, setActive] = React.useState(true);

  const handleActiveClick = () => {
    console.log('shoudl expand')
    setActive(!active);
  };

  useEffect(()=>{
    console.log('active is: ', active);
  })
  return(
      <div>
        <IconButton className = {active ? classes['buttonActive'] : classes['buttonInactive']} onClick={handleActiveClick}>
          <ArrowDropDownIcon  className = {active ? classes['arrowActive'] : classes['arrowInactive']}/>
        </IconButton>
          <div className = {classes.nodeRack} className = {active ? classes['nodeRackActive'] : classes['nodeRackInactive']}>
             <Container active = {active}/>
          </div>
      </div>

  )
}

export default ActiveButton
