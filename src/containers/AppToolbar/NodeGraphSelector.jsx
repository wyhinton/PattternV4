import React from 'react'
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useState, useEffect } from 'react'
import Select, { components } from 'react-select'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useStoreState, useStoreActions } from 'easy-peasy';

const useStyles = makeStyles((theme)=>({
  root: {
    border: 1,
    borderColor: 'white',
    width: 10,
    height: 10
  },
  addTreeButton: {
    width: 15,
    height: '100%',
    backgroundColor: 'grey',
    textAlign: 'center',
    borderRight: '1px solid black'
  },
  deleteTreeButton: {
    width: 15,
    height: '100%',
    backgroundColor: 'grey',
    textAlign: 'center',
    borderRight: '1px solid black'
  },
  treeSelectorContainer: {
    width: 'fit-content',
    display: 'flex',
    border: '1px solid black',
    // height: '100%',
    height: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  }

}));

// clearIndicator
// container
// control
// dropdownIndicator
// group
// groupHeading
// indicatorsContainer
// indicatorSeparator
// input
// loadingIndicator
// loadingMessage
// menu
// menuList
// menuPortal
// multiValue
// multiValueLabel
// multiValueRemove
// noOptionsMessage
// option
// placeholder
// singleValue
// valueContainer
const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowDropDownIcon />
    </components.DropdownIndicator>
  );
};


export function TreeSelector(props){
  const nodeTrees = useStoreState(state=>state.global.nodeTrees)
  const handleTreeSelect = useStoreActions(actions=>actions.global.setActiveNodeTree)
  const handleAddTree = useStoreActions(actions=>actions.global.addNodeTree)
  const deleteTree = useStoreActions(actions=>actions.global.deleteNodeTree)

  const classes = useStyles();
  const customStyles = {
    container: () =>({
      height: 20,
      backgroundColor: 'grey',
      color: 'white',
      fontSize: 20,
    }),
    input: () =>({
      height: 20,
      backgroundColor: 'grey',
      color: 'white',
      display: 'none'
    }),
    dropdownIndicator: () =>({
      height: 10,
      backgroundColor: 'grey',
      color: 'white'
    }),
    control: () =>({
      height: 20,
      backgroundColor: '#656565',
      color: 'white',
      display: 'flex',

    }),
    option: () =>({
      height: 20,
      backgroundColor: 'grey',
      color: 'white',
      '&:hover': {
        backgroundColor: 'lightgrey'
      }
    }),
    valueContainer: () =>({
      height: 20,
      // backgroundColor: 'grey',
      color: 'white',
      width: '80%',
      paddingLeft: 5,
      paddingTop: 3,
      paddingRight: 5,
      width: '100%'
    }),
    singleValue: () =>({
      fontSize: 12,
      // backgroundColor: 'grey',
      color: 'white'
    }),
    menu: () =>({
      fontSize: 12,
      backgroundColor: 'grey',
      color: 'white'
    }),
    selectContainer: () =>({
      fontSize: 12,
      position: 'reative',
      backgroundColor: 'grey',
      color: 'white'
    }),
    indicatorsContainer: () =>({
      fontSize: 12,
      width: '20%',
      // position: 'absolute',
      backgroundColor: 'grey',
      color: 'white',
      // top: 0,
      // right: 0,


    }),
  }
  const findDefault = (id, options) =>{
    let d = options.filter(op=>op.label === id)[0]
    console.log(d);
  }
  useEffect(()=>{
    console.log(props);
    console.log('node Trees at tree selector', nodeTrees);
  })

  const [def, setDefault] = useState(nodeTrees[0])
  const [menuValue, setMenuValue] = useState()
  const [active, setActive] = React.useState(props.active);

  const handleSelect = (val) => {

    console.log('shoudl expand')
    setActive(!active);
    handleTreeSelect(val)
    console.log(val);
    setMenuValue(val)
    console.log('selected value is: ', val);


  };
  const handleDeleteTree = () => {
    console.log('shoudl expand')

    const replacement = nodeTrees.filter(t=>t.index == (menuValue.index - 1))[0]
    deleteTree(menuValue)
    setMenuValue(replacement)
  };
         // defaultValue = {props.defaultValue}
  const [value, setValue] = useState('hello')

  return(
    <div className = {classes.treeSelectorContainer}>
      <div className = {classes.addTreeButton} onClick = {()=>handleAddTree()}>
        {'+'}
      </div>
      <div className = {classes.addTreeButton} onClick = {()=>handleDeleteTree()}>
        {'x'}
      </div>
     <Select
       defaultValue = {def}
       components = {{DropdownIndicator}}
       options = {nodeTrees}
       styles = {customStyles}
       onChange = {handleSelect}
       value = {menuValue}
     />
    </div>
  )
}

export default TreeSelector
