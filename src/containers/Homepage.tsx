import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Editor from './Editor/Editor'
import Viewport from './viewport/Viewport'


const useStyles = makeStyles({
  root: {
    height: '100vh'
  }
});
export function Homepage(){
  const classes = useStyles();

  return (
  <Grid container spacing = {0} className = {classes.root}>

    <Grid item xs = {9}>
      <Viewport />
    </Grid>
    <Grid item xs = {3}>
      <Editor />
    </Grid>
  </Grid>
  )

}

export default Homepage
