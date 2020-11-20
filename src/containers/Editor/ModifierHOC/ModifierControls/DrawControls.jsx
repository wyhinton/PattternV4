import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { useStoreActions } from 'easy-peasy'
import { connect } from 'react-redux';


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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    marginTop: theme.spacing(2)
  },
  editButton: {
    width: '100%',
    height: 50,
    border: '1px solid black'
  }
}));


export function DrawControls(props){
  const classes = useStyles();
	const toggleEdit = useStoreActions(actions => actions.panels.toggleEdit)
  const {listItemId, nodeId } = props
  return(
    <div>
      <div className = {classes.editButton} onClick = {()=>toggleEdit({listItemId: listItemId, nodeId: nodeId})}> edit </div>

      <div>{console.log(props, 'draw control props are')};</div>
      <div>{listItemId}</div>

       <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />


    </div>

  )
}
// export default connect(
//     (dispatch) => ({
//       toggleEdit: dispatch.panels.toggleEdit
//     })
//     // (dispatch)
// ) (DrawControls)

export default DrawControls
