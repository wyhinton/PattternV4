import React from 'react'
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useState, useEffect } from 'react'
import BaseNode from './BaseNode';
import NodeDropDownMenu from './NodeControls/NodeDropDownMenu';
import {Handle, Position} from 'react-flow-renderer';
import InputNumber from './NodeControls/InputNumber/InputNumber';
// import VisibilityIcon from '@material-ui/icons/Visibility';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme)=>({
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

// const display = (a) =>{
//   console.log(a);
//   return a
// }
export function OutputNode(props){
  const classes = useStyles();
  useEffect(()=>{
    console.log('math node props are:', props);
  })
  const [input1, setInput1] = useState(0)

//input 1
  useEffect(()=>{
    console.log('updating input1 ', input1);
    props.data.input1 = input1
    console.log('math node data is: ', props);
    // props.data.func = display
  }, [input1])


  const [mode, setMode] = useState()

  return(
    <BaseNode {...props} header = {'Output'} labelColor = 'red' icon = {<DoubleArrowIcon/>}
      children = {
        <>
          <Handle
          type="target"
          position="left"
          id = {'a'}
          style={{ background: '#555', top: '60%'  }}
          onConnect={(params) => console.log('handle onConnect', params)}
          />
          <span>
            {'hello there'}
          </span>
          </>}
       >
    </BaseNode>
  )
}
OutputNode.propTypes = {
  input1: PropTypes.number,
}

OutputNode.defaultProps = {
  input1: 0,

}


export default OutputNode
