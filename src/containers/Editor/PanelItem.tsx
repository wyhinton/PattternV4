import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
// import ModifierStackControl from './ModifierStackControl'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useState, useEffect } from 'react'
import Slider from '@material-ui/core/Slider';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme: Theme)=>({
  root: {
    border: 1,
    bordercolor: 'black',
    backgroundColor: '#ffffffbd',
    borderRadius: theme.shape.borderRadius,
    height: '5%',
    margin: 0,
    width: '100%',
    flexWrap: 'nowrap',
    padding: 0,
    boxShadow: 'inset 0 0 10px #ffffff',
    borderTop: '1px solid black'
  },
  nameContainer: {
    padding: '3px',
    paddingLeft: '12px',
    borderRadius: 24,
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
    textAlign: 'left',
    fontSize: 12
  },
  modiferStackControls: {
    paddingLeft: '0px !important',
    paddingRight: '0px !important'
  },
  expandButton: {
    padding: 0
  },
  expand: {
    padding: 0,
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  removeButton: {
    padding: 0,
    margin: 'auto'
  },
  expanded: {
    padding: '3px',
    paddingLeft: '12px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'red',
    color: 'white'
  },
  collapse: {
    background: theme.palette.primary.dark,
    padding: 10
  }
}));

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 0,
    width: 0,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: '60%',
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export function PanelItem(props){
  const classes = useStyles();
  // const [open, setOpen] = useState()
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    console.log('shoudl expand')
    setExpanded(!expanded);
  };



  // useEffect(()=>{
  //   // console.log('boobobob')
  //   // var content = props.dropDownItems.filter(obj =>{
  //   //   return obj.name = props.modifierName
  //   // })
  //   // console.log(content)
  // })

  const findMyStuff = (name) => {
    console.log(props.dropDownItems)
    var content = props.dropDownItems.find(obj =>{
      console.log(name)
      return obj.name === name
    })
    var control = ''
    console.log(content)
    console.log(content.controls)
    let text = JSON.stringify(content.modifierProperties.controls)
    let controls = content.modifierProperties.controls
    let returnJsx = []
    return(
      <div>
        {controls.map(control=>{
          if (control.type === 'slider'){
            return <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
          }
          if (control.type === 'button'){
            return <Button variant = "contained">{control.name}</Button>
          }
          })}
      </div>
      )
    //
    // return <div>{returnJsx[0]}</div>
  }

  return (
    <div>
    <Grid container spacing = {3} className = {classes.root}>
      <Grid item xs = {1}>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
          <ExpandLessIcon/>
      </IconButton>
      </Grid>
      <Grid item xs = {1}>
        {props.modifierIcon}
      </Grid>
      <Grid item xs = {6}>
      <div className = {classes.nameContainer}>
          {props.modifierName}
      </div>
      </Grid>
      <Grid className = {classes.modiferStackControls} item xs = {3} >
          <ArrowDropUpIcon onClick = {() => {props.moveUpModifier(props.id)}}/>
          <ArrowDropDownIcon onClick = {() => {props.moveDownModifier(props.id)}} />
      </Grid>
      <Grid item xs = {2} className = {classes.removeButton}>
        <IconButton className = {classes.removeButton} onClick = {() => {props.removeModifier(props.id)}}>
          <CloseIcon />
        </IconButton>
      </Grid>

    </Grid>
    <Collapse in={expanded} timeout="auto" unmountOnExit className = {classes.collapse}>
      <div></div>
      <Typography >
        {findMyStuff(props.modifierName)}
      </Typography>

    </Collapse>
    </div>

  )

}

export default PanelItem
