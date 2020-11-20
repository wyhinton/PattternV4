import React, { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Panel from '../Panel'
import DragHandleIcon from '@material-ui/icons/DragHandle';

const useStyles = makeStyles((theme)=>({
  root: {
    border: 1,
    borderColor: 'white',
    width: 10,
    height: 10
  },

}));



export default memo(({ header, label }) => {

  return (
    <div>
      <div
        style={{
          background: "#eee",
          border: "1px solid #ddd",
          padding: 10,
          borderRadius: 5,
          color: 'black'
          // ...styles
        }}
      >{'Slice List'}</div>
        <div className = "nodrag">
     </div>
    </div>
  );
});
