import React, { memo, useEffect } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Panel from '../Panel'
import DragHandleIcon from '@material-ui/icons/DragHandle';

export default memo(({ data }) => {
  useEffect(()=>{
    console.log('re rendering source node');
  })
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
      >Sources</div>
    <div className = "nodrag">
    {data.content}
    </div>
    {data.outputs.map((output, index)=>(
      <Handle
        type = "target"
        position = {output.position}
        id = {output.id}
        style = {{left: `${output.left}`}}
        key = {index}
        />
      ))
    }
  </div>
  );
});
