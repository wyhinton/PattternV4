import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { useStoreState, useStoreActions } from 'easy-peasy'
import Typography from '@material-ui/core/Typography';

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 30,
    zIndex: 10,
    padding: 0
  },
  thumb: {
    height: 0,
    width: 0,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    pointerEvents: 'none',
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
    borderRadius: 20,
    pointerEvents: 'none'
  },
  rail: {
    height: 18,
    borderRadius: 14,
    pointerEvents: 'none'
  },
})(Slider);

export function SubdivisionControls(props){

  const [inputs, setInputs] = useState({
    subdivValue0: 0,
    subdivValue1: 0,
    subdivValue2: 0
  })

  const [clickedIndex, setClickedIndex] = useState(0)

  const handleChange = (event, newValue) => {
    console.log(event.target)
    console.log(event.target.id)
    // console.log(newValue)
    setStoreVal({nodeId: props.nodeId, listItemId: props.id, controlValueId: event.target.id, controlValue: newValue } )
   };

  const setStoreVal = useStoreActions(actions=> actions.panels.setParameter)


   // const testValues = useStoreState(state=>state.)
  useEffect(()=>{
    console.log(props.id)
    console.log(props)
  })






	// <ActiveButton onClick ={()=>toggle(  {id: item.id, nodeId: props.nodeId} )} active = {item.active}/>
  return(
    <div>
        {props.testProp}
     <Typography>Value 0</Typography>
     <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider 1" defaultValue={20} onChange = {handleChange} id = {'subdivValue0'} />
     <Typography> Value 1</Typography>
     <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} onChange = {handleChange} id = {'subdivValue1'} />
     <Typography>Value 2</Typography>
     <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} onChange = {handleChange} id = {'subdivValue2'} />

    </div>

  )
}

export default SubdivisionControls
