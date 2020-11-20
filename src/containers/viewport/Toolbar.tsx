import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Download from './Download'
const useStyles = makeStyles((theme)=>({
  root: {
    border: 0,
    borderRadius: 3,
    height: '5%',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
  }
}));

export function Toolbar(){
  const classes = useStyles();

  return (
    <Grid container spacing = {3} className = {classes.root}>
      <Grid item xs = {3} >
        <Download />
      </Grid>
    </Grid>
  )

}

export default Toolbar
