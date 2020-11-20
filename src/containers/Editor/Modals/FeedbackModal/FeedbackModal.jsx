import React, { useEffect, useState } from "react";
import { withStyles, MenuItem } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import firebase from '../../../../firebase';
import DialogTitle from '@material-ui/core/DialogTitle';
import { teal, grey } from "@material-ui/core/colors";
// import GameOfLifeShader from '../../Shaders/GameOfLifeShader';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  primaryColor: {
    color: teal[500]
  },
  secondaryColor: {
    color: grey[700]
  },

  padding: {
    padding: 0
  },
  mainHeader: {
    backgroundColor: grey[100],
    padding: 20,
    alignItems: "center"
  },
  mainContent: {
    // padding: 40
  },
  secondaryContainer: {
    padding: "20px 25px",
    backgroundColor: grey[200]
  },
  radioGroup:{
   flexDirection: 'row'
 },
 select: {
   width: 200
 },
 sucsess: {
   textAlign: 'center',

 }
});


function WireInfo(props) {
  const { classes, open, onClose } = props;
  // // const ref = firebase.firestore().collection('Feedback')
  // useEffect(()=>{
  //   console.log(ref);
  // })
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false)
  const [values, setValues] = useState({
    feedbackType: 'Bug Report',
    otherSoftware: [],
    nodeExperience: 0,
    feedback: '',
    id: Math.random()
  });
  const handleSubmit = () =>{
    console.log('should submit form');
    console.log('values are: ', values);
    addFeedback(values)
    setSubmitted(true)
  }

  const handleChange = (name, e) => {
    const { value } = e.target;
    console.log(e);
    console.log(value);
    console.log('name is: ', name);
    setValues(prevState => ({
        ...prevState,
        [name]: value
    }));
    console.log('valeus are: ', values);
  };

  const handleCheckbox = (name, e) =>{
    const { value } = e.target;
    const prevArray = values.otherSoftware
    console.log('name is: ', name);
    if (prevArray.includes(name)) {
      console.log('it does incklude: ', name);
      const toRemove = prevArray.indexOf(name)
      console.log('to remove is: ', toRemove);
      prevArray.splice(toRemove, 1)
    } else {
      prevArray.push(name)
    }
    console.log('name is: ', name);
    setValues(prevState => ({
        ...prevState,
        ['otherSoftware']: prevArray
    }));

    console.log('valeus are: ', values);
  };

  const stateContains = (name) =>{
    if (values.otherSoftware.includes(name)) {
      return true
    } else {
      return false
    }
  }

  const handleClose = () => {
    setMenuOpen(false);
  };

  const handleOpen = () => {
    setMenuOpen(true);
  };

  const addFeedback = (data) => {
    // ref.doc(data.id).set({...data})
    firebase.firestore().collection("Feedback").doc('Feedback2').collection(data.feedbackType).add(
      {...data,
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
  }


  return (
    <>
      <DialogTitle id="Feedback-Modal">Feedback</DialogTitle>
      <DialogContent className={classes.padding}>
        <div className = {classes.input} style = {{display: submitted ? 'none' : 'block', margin: 0}}>
        <Grid container>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              className={classes.mainContent}
            >
              <Grid item xs={10}>
                 <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Feedback Category</InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={menuOpen}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={values.feedbackType}
                    onChange = {(e)=> {handleChange('feedbackType', e)}}
                    className = {classes.select}
                  >
                    <MenuItem value = {'Bug'}>Bug/Crash</MenuItem>
                    <MenuItem value = {'New Feature'}>New Feature Recomendation</MenuItem>
                    <MenuItem value = {'Interface'}>Interface Feedback</MenuItem>
                    <MenuItem value = {'General'}>General</MenuItem>
                    <MenuItem value = {'Other'}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <FormControl component="fieldset">
                <FormLabel component="legend">Design Software Experience</FormLabel>
                  <div>
                   <FormControlLabel
                     control =
                      {  <Checkbox
                        checked={stateContains('blender')}
                        onChange={(e)=>{handleCheckbox('blender', e)}}
                        value="blender"
                      />}
                      label = 'Blender'
                    />
                  <FormControlLabel
                    control =
                    {<Checkbox
                      checked={stateContains('photoshop')}
                      onChange={(e)=>{handleCheckbox('photoshop', e)}}
                      value="photoshop"
                    />}
                    label = "Photoshop"
                  />
                  <FormControlLabel
                    control =
                      { <Checkbox
                      checked={stateContains('Illustrator')}
                      onChange={(e)=>{handleCheckbox('Illustrator', e)}}
                      value="Illustrator"
                    />}
                    label = "Illustrator"
                  />
                  <FormControlLabel
                    control =
                      { <Checkbox
                      checked={stateContains('Maya')}
                      onChange={(e)=>{handleCheckbox('Maya', e)}}
                      value="Maya"
                    />}
                    label = "Maya"
                  />
                  <FormControlLabel
                    control =
                      { <Checkbox
                      checked={stateContains('After Effects')}
                      onChange={(e)=>{handleCheckbox('After Effects', e)}}
                      value="After Effects"
                    />}
                    label = "After Effects"
                  />
                  <FormControlLabel
                    control =
                      { <Checkbox
                      checked={stateContains('Unity')}
                      onChange={(e)=>{handleCheckbox('Unity', e)}}
                      value="Unity"
                    />}
                    label = "Unity"
                  />
                  <FormControlLabel
                    control =
                      { <Checkbox
                      checked={stateContains('Substance Designer')}
                      onChange={(e)=>{handleCheckbox('Substance Designer', e)}}
                      value="Substance Designer"
                    />}
                    label = "Substance Designer"
                  />
                  <FormControlLabel
                    control =
                      { <Checkbox
                      checked={stateContains('Substance Painter')}
                      onChange={(e)=>{handleCheckbox('Substance Painter', e)}}
                      value="Substance Painter"
                    />}
                    label = "Substance Painter"
                  />
                  <FormControlLabel
                    control =
                      { <Checkbox
                      checked={stateContains('Unreal Engine')}
                      onChange={(e)=>{handleCheckbox('Unreal Engine', e)}}
                      value="Unreal Engine"
                    />}
                    label = "Unreal Engine"
                  />
                  </div>
              <Divider />
                <FormLabel component="legend">Node Experience</FormLabel>
                  <RadioGroup
                    onChange = {(e)=> {handleChange('nodeExperience', e)}}
                    className = {classes.radioGroup}
                    aria-label="Node Experience"
                    name="Node Experience"
                    value={values.nodeExperience} >
                    <FormControlLabel value= {'No Experience'} control={<Radio />} label="No Experience" />
                    <FormControlLabel value= {'A little Experience'} control={<Radio />} label="A little Experience" />
                    <FormControlLabel value= {'Casual'} control={<Radio />} label="Casual" />
                    <FormControlLabel value= {'Proficient'} control={<Radio />} label="Proficient" />
                    <FormControlLabel value= {'Experience'} control={<Radio />} label="Experience" />
                    <FormControlLabel value= {'Expert'} control={<Radio />} label="Expert" />
                  </RadioGroup>
              </FormControl>
              <Divider />
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="dense"
                  multiline
                  rows="5"
                  variant="outlined"
                  label="feedback"
                  id="additional-info"
                  onInput = {(e)=> {handleChange('feedback', e)}}
                  value = {values.feedback}
                />
              </Grid>
              <Divider/>
              <Grid item xs = {3}>
                <button onClick = {handleSubmit}>Submit</button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </div>
        <div className = {classes.sucsess} style = {{display: submitted ? 'block' : 'none'}}>
          <span> <strong>PATTERN</strong></span>
          Thanks for you feedback!
          {/*<GameOfLifeShader />*/}
        </div>
      </DialogContent>
    </>



  );
}

export default withStyles(styles)(WireInfo);
