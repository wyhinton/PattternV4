import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import { getApplicationKeyMap } from 'react-hotkeys';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  hotKeyRow: {
    width: '100%',
    borderBottom: '1px solid black',
  },
  shortCutData: {
    fontStyle: 'italic'
  }
}));

export default function HotKeysModal({open}) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };
  // const keyMap = getApplicationKeyMap();
  const keyMap =
  [
    {
      name: 'Toggle Node Background',
      sequences: ['shift', 'a']
    },
    {
      name: 'Node View',
      sequences: ['shift', 'a']
    },
    {
      name: 'Canvas View',
      sequences: ['shift', 'a']
    },
    {
      name: 'Add Node',
      sequences: ['shift', 'a']
    },
    {
      name: 'Toggle View',
      sequences: ['shift', 'space']
    },
    {
      name: 'Show Shortcuts',
      sequences: ['shift', 's']
    },
    {
      name: 'Show/Hide Node Rack',
      sequences: ['command', 'space']
    },

  ]
  return (
    <>
      {/*<DialogTitle id="max-width-dialog-title">Settings</DialogTitle>*/}
      <DialogContent>
        <div >
          <h2>
            Keyboard shortcuts
          </h2>

          <table>
            <tbody>
              {
                keyMap.map((key, index)=>(
                    <tr key={index} className = {classes.hotKeyRow}>
                      <td >
                        { key.name }
                      </td>
                      <td className = {classes.shortCutData} >
                        { key.sequences.join('+') }
                        {/*{ sequences.map(({sequence}) => <span key={sequence}>{sequence}</span>) }*/}
                      </td>
                    </tr>
                 ))
               }
            </tbody>
          </table>
        </div>
      </DialogContent>
  </>
  );
}
