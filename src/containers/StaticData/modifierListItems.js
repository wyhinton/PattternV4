import React, { Fragment } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import AllOutIcon from '@material-ui/icons/AllOut';
import WavesIcon from '@material-ui/icons/Waves';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import LooksIcon from '@material-ui/icons/Looks';
import FilterHdrIcon from '@material-ui/icons/FilterHdr'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  item: {
    height: 20,
    width: 100
  }
}));



// const subdivisionItem =
// <MenuItem value = {'Subdivision'}>
//   <AllOutIcon/> Subdivision
// </MenuItem>
//
// //
// // const modifierMenuItems = [
// //   {
// //   type: 'subdivision',
// //   menuItem: subdivisionItem
// //   }
// // ]
const subdivisionItem = <MenuItem value = {'Subdivision'}>
  <AllOutIcon/> Subdivision
</MenuItem>

const modifierMenuItems = [subdivisionItem]


// const modifierMenuItems = []
//       <MenuItem className = {classes.item} value = {'Subdivision'}>
//         <AllOutIcon/> Subdivision
//       </MenuItem>
//       <MenuItem className = {classes.item} value = {'Subdivision'}>
//         <AllOutIcon/> Subdivision
//       </MenuItem>
//       <MenuItem className = {classes.item} value = {'Subdivision'}>
//         <AllOutIcon/> Subdivision
//       </MenuItem>
//       <MenuItem className = {classes.item} value = {'Subdivision'}>
//         <AllOutIcon/> Subdivision
//       </MenuItem>
//       <MenuItem className = {classes.item} value = {'Subdivision'}>
//         <AllOutIcon/> Subdivision
//       </MenuItem>
//       <MenuItem className = {classes.item} value = {'Subdivision'}>
//         <AllOutIcon/> Subdivision
//       </MenuItem>
//   </>
//   )
// }

export default modifierMenuItems;
