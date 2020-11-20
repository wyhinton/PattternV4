import React, { useState, cloneElement } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import ActiveButton from '../CustomButtons/ActiveButton';
import controlDict from './controlDict'

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


const test = <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />

function findControl(type, idvalue, nodeId){
  console.log(type);
  console.log(controlDict[type], 'component to get is')
  var control = controlDict[type]
  console.log('returned component from dict is: ', control);
  var newControl = cloneElement(control, {testProp: 'this is a test prop value', listItemId: idvalue, nodeId: nodeId})
  return newControl

}

const withNodeButtons = ComposedComponent => {

  return function (props){
      const [active, setActive] = useState(true)

      return <ComposedComponent {...props} testProp = {'hello this is a test prop'}/>

  };
};

export default withNodeButtons
