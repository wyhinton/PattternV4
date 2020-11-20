import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useState, useEffect } from 'react'
import BaseNode from './BaseNode';
import NodeDropDownMenu from './NodeControls/NodeDropDownMenu';
import {Handle, Position} from 'react-flow-renderer';
import InputNumber from './NodeControls/InputNumber/InputNumber';
import {useStoreState} from 'react-flow-renderer'
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

const mathNodeOptions =
[
  {
    value: 'Add',
    label: 'Add'
  },
  {
    value: 'Subtract',
    label: 'Subtract'
  },
  {
    value: 'Divide',
    label: 'Divide'
  },
  {
    value: 'Exponent',
    label: 'Exponent'
  },
  {
    value: 'Multiply',
    label: 'Multiply'
  },
  {
    value: 'Sin',
    label: 'Sin'
  },
  {
    value: 'Cos',
    label: 'Cos'
  },
]

const add = (a,b) =>{
  if (a && b) {
    console.log(`executing add function` );
    let val = Number(a) + Number(b)
    console.log(val);
    return val
  }
  if (!a) {
    console.log('a undefined');
  }
  if (!b) {
    console.log('b undefined');
  }
}

const subtract = (a,b) =>{
  if (a && b) {
    console.log(`executing subtract function` );
    let val = Number(a) -  Number(b)
    console.log(val);
    return val
  }
  if (!a) {
    console.log('a undefined');
  }
  if (!b) {
    console.log('b undefined');
  }
}
const multiply = (a,b) =>{
  if (a && b) {
    console.log(`executing multiply function` );
    let val = Number(a) *  Number(b)
    console.log(val);
    return val
  }
  if (!a) {
    console.log('a undefined');
  }
  if (!b) {
    console.log('b undefined');
  }
}
const divide = (a,b) =>{
  if (a && b) {
    console.log(`executing divide function` );
    let val = Number(a) /  Number(b)
    console.log(val);
    return val
  }
  if (!a) {
    console.log('a undefined');
  }
  if (!b) {
    console.log('b undefined');
  }
}
const exponent = (a,b) =>{
  if (a && b) {
    console.log(`executing exponent function` );
    let val = Math.pow(Number(a), Number(b))
    console.log(val);
    return val
  }
  if (!a) {
    console.log('a undefined');
  }
  if (!b) {
    console.log('b undefined');
  }
}
// const sin = (obj) =>{
//   if (a && b) {
//     console.log(`executing add function` );
//     let val = Math.sin(Number(a), Number(b))
//     console.log(val);
//     return val
//   }
//   if (!a) {
//     console.log('a undefined');
//   }
//   if (!b) {
//     console.log('b undefined');
//   }
// }
// const cos = (obj) =>{
//   // console.log(obj, 'obj is');
//   let test = {}
//   if (obj && obj.input1 && obj.input2)
//     {
//      test.input1 = obj.input1 - obj.input2
//      test.input2 = 0
//      console.log(test);
//      return test
//     }
//     else {
//       test.input1 = 0
//       test.input2 = 0
//       console.log(test);
//       return test
//     }
// }


const mathNodeFunctions = {
  Add: add,
  Subtract: subtract,
  Multiply: multiply,
  Divide: divide,
  Exponent: multiply,
  // Sin: multiply,
  // Cos: multiply,
}


export function MathNode(props){
  const classes = useStyles();
  let elements = useStoreState(state=>state.elements)
  console.log(elements);
// console.log(useStoreState(state=>state));
  // let edgeState = useState(state=>state.edges)
  // console.log(nodeState);
  // console.log(edgeState);
  useEffect(()=>{
    console.log('math node props are:', props);
    props.data.func = add
    // setInput1(props.data.inputs.input1)


    // if (props.updateNode) {
    //   props.updateNode(props.id, )
    // }
  })

  useEffect(()=>{
    console.log('data changed');
  }, [props.data])


  const [input1, setInput1] = useState(props.data.inputs.input1)
  const [input2, setInput2] = useState(props.data.inputs.input2)
  const [input1Disabled, setInput1Disabled] = useState(props.input1Connected)
  const [input2Disabled, setInput2Disabled] = useState(props.input2Connected)
  const [outPut, setOutPut] = useState(0)
  const [func, setFunc] = useState(props.func)
  const [label, setLabel] = useState('Math')

  useEffect(()=>{
    console.log(label);

  }, [label])

  // useEffect(()=>{
  //   setFunc(add)
  // })


  const updateLabel = (val) => {
    let symbol = ''
    if (val.value === 'Add') {
      symbol = '+'
    }
    if (val.value === 'Subtract') {
      symbol = '-'
    }
    if (val.value === 'Multiply') {
      symbol = '*'
    }
    if (val.value === 'Exponent') {
      symbol = '^'
    }
    if (val.value === 'Divide') {
      symbol = '/'
    }
    setLabel(`A${symbol}B`)
  }


  const handleMenuSelect = (val) =>{
    updateLabel(val)
    console.log(mathNodeFunctions[val.value]);
    // setFunc(mathNodeFunctions[val.value])
    console.log(props);
    let thisNode = elements.filter(el=>el.id === props.id)[0]
    let notThisNode = elements.filter(el=>el.id !== props.id)
    thisNode.func = mathNodeFunctions[val.value]
    console.log(thisNode, 'thisnode', notThisNode, 'not this node');
    // thisNode.data.func = func
    console.log([thisNode, ...notThisNode]);
    thisNode.data.setter([thisNode, ...notThisNode])

  }

  useEffect(()=>{
    console.log('func changed!');
    // props.data.func = add.bind(func)
    // props.data.func = () => mathNodeFunctions[]
    // props.data.func = this.bind(func)
    // props.data.func = () => func
    console.log(props.data.func);
    console.log(props);
      // props.data.setter(props)
  },[func])

  // useEffect(()=>{
  //   console.log('data changed!');
  //   setInput1(props.data.inputs.input1)
  //   console.log(props.data.inputs.input1);
  // }, props.data)
  const [mode, setMode] = useState()

  return(
    <BaseNode {...props} label = {label} labelColor = 'orange'
      children = {
        <>
        {`id: ${props.id}`}
          <Handle
          type="target"
          position="left"
          id = {'input1'}
          style={{ background: '#555', top: '60%'  }}
          onConnect={(params) => console.log('handle onConnect', params)}
          />
          <Handle
          type="target"
          id = {'input2'}
          position="left"
          style={{ background: '#555', top: '80%' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          />
            <div>
              <NodeDropDownMenu
                options = {mathNodeOptions}
                searchBy = {'name'}
                labelField = {'name'}
                valueField = {'name'}
                defaultValue = {'Add'}
                color = {'grey'}
                style = {{backgroundColor: 'red'}}
                onMenuSelect = {handleMenuSelect}
               />
               <InputNumber prefixCls = {'nodeNumInput'} value = {input1} style = {input1Disabled ? {backgroundColor: 'green'} : {backgroundColor:'grey'}} disabled = {input1Disabled} defaultValue = {0} label = {'A'} onChange = {setInput1}/>
               <InputNumber prefixCls = {'nodeNumInput'} value = {input2} disabled = {input2Disabled} defaultValue = {0} label = {'B'} onChange = {setInput2}/>
               <div>
                 {`input1: ${input1}`}
                 {`input2: ${props.data.inputs.input2}`}
                 {`outputs: ${JSON.stringify(props.data.outputs)}`}
              </div>
            </div>
            <Handle
            type="soruce"
            id = {'output1'}
            position="right"
            style={{ background: '#555' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            />
          </>}
       >

    </BaseNode>
  )
}

MathNode.propTypes = {
  inputs: PropTypes.object,
  input1Connected: PropTypes.bool,
  input2Connected: PropTypes.bool,
  func: PropTypes.func,
}
MathNode.defaultProps = {
  inputs: {input1: 0, input2: 0},
  input1Connected: false,
  input2Connected: false,
  func: add
}

export default MathNode
