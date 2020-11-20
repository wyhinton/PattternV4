import React, {memo} from 'react'
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useState, useEffect } from 'react'
import Select, { components } from 'react-select'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
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


export function NodeDropDownMenu(props){
  const classes = useStyles();
  const customStyles = {
    container: () =>({
      height: 20,
      backgroundColor: 'grey',
      color: 'white',
      fontSize: 20,
      marginBottom: 10,
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
      backgroundColor: 'grey',
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
      paddingTop: 3
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
  })

  const [menuValue, setMenuValue] = useState()
  const [active, setActive] = React.useState(props.active);
  const [def, setDefault] = useState(findDefault(props.defaultValue, props.options))
  const handleSelect = (val) => {

    console.log('shoudl expand')
    setActive(!active);
    if (props.onMenuSelect) {
      props.onMenuSelect(val)
    }
    console.log(val);
    setMenuValue(val)

  };
         // defaultValue = {props.defaultValue}
  const [value, setValue] = useState('hello')

  return(
    <div>
     <Select
       defaultValue = {props.options[0]}
       components = {{DropdownIndicator}}
       options = {props.options}
       styles = {customStyles}
       onChange = {handleSelect}

     />
    </div>
  )
}

export default memo(NodeDropDownMenu)
