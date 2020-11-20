import React from "react";
import withNodeButtons from "./withNodeButtons";
import ActiveButton from '../CustomButtons/CloseButton';
import { compose } from 'recompose'
import NodeHeader from './NodeHeader';
import { makeStyles  } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
   buttonHolder: {
     height: '30px',
     width: '100%'
   }
}));

const Modifier = props => {
  const classes = useStyles();


  // const test = {...props}

  // const headerProps = { testProp, id, index, active, type, nodeId }
    const { testProp, id, index, active, type, nodeId, activate } = props
  return (


    <div>
      <NodeHeader {...props} />
        <strong style = {{overflowWrap: 'break-word'}}>{JSON.stringify(props)}</strong>
    </div>);
};

export default compose(
    withNodeButtons
)(Modifier)
