import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TollIcon from '@material-ui/icons/Toll';
import AllOutIcon from '@material-ui/icons/AllOut';
import WavesIcon from '@material-ui/icons/Waves';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import LooksIcon from '@material-ui/icons/Looks';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import {useState } from 'react'

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2)

  },
  formControl: {
    margin: 0,
    minWidth: 120,
    width: '100%',
    backgroundColor: theme.palette.primary.light
  },
  menuButton: {
    width: '100%',
    marginBottom: 20,
    height: 30,
    borderRadius: 4
  },
  modifier: {

  }
}));

export function AddSourceMenu(props) {
  const classes = useStyles();
  const [age, setAge] = useState('');
  const [open, setOpen] = useState(false);
  //
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  const findIcon = (name) => {
    var modifierIcon
    switch (name) {
      case "Subdivision":
        modifierIcon = <AllOutIcon />
        break;
      case "Noise":
        modifierIcon = <WavesIcon />
        break;
      case "Color":
        modifierIcon = <TollIcon />
        break;
      case "Tile":
        modifierIcon = <BorderAllIcon />
        break;
      case "Bend":
        modifierIcon = <LooksIcon />
        break;
      case "Displace":
        modifierIcon = <FilterHdrIcon />
        break;
      default:
        console.log('no icon');
        break;
      }
    return modifierIcon
  }
  const listItems = props.modifierList.map((number) =>

  <MenuItem key={number.id.toString()} value = {number.name} className = {classes.modifier}>
    {findIcon(number.name)}
    {number.name}
  </MenuItem>

  );
  // const handleChange = props.onChange
  return (

    <div className = {classes.menuButton}>
      <FormControl className={classes.formControl}>

        <InputLabel id="demo-controlled-open-select-label" >Add Modifier</InputLabel>

        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={(evt) => props.onChange(evt.target.value)}
          disableUnderline= {true}
        >
          {listItems}

        </Select>
      </FormControl>
    </div>
  );
}
export default AddSourceMenu
