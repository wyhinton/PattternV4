import Toolbar from './Toolbar'
import { makeStyles } from '@material-ui/core/styles';
import ThreeViewport from './ThreeViewport'



const useStyles = makeStyles((theme)=>({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  toolBarContainer: {
    width: '100%',
    height: '40px',
  },
  threeView: {
    height: 150,
    width: 150,
    position: 'absolute',
    top: 50,
    right: 50
  }

}));


export function Viewport(){
  const classes = useStyles();

  return (
    <div className = {classes.root}>
    <div className = {classes.threeView}>
    <ThreeViewport />
    </div>
      <div className = {classes.toolBarContainer}>
        <Toolbar />
      </div>

    </div>
  )
}

export default Viewport
