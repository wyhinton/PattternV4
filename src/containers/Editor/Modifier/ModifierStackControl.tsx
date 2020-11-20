import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


const useStyles = makeStyles((theme)=>({
  root: {
    width: '100%',
    margin: 'auto',
    padding: 0
  },
  button: {
    // borderRight: '1px solid black'
  },
  arrowButtons: {
    borderRadius: 10,
    backgroundColor: theme.palette.primary.light,
    marginRight: 10

  }
}));

export function ModifierStackControl(props){
  console.log(props)
  const classes = useStyles();
  const poopTest = () =>{
    console.log('poooppasdf')
  }
  return (
    <Grid container spacing = {0} className = {classes.root}>
    <Grid item xs = {12} className = {classes.arrowButtons}>
      <Grid container spacing = {0}  >
          <Grid item xs = {6} className = {classes.button}>
              <ArrowDropUpIcon/>
           </Grid>
          <Grid item xs = {6} className = {classes.button}>
              <ArrowDropDownIcon />
          </Grid>
      </Grid>
    </Grid>

    </Grid>
  )
}

export default ModifierStackControl;
