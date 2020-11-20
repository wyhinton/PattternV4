import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react'

export function CloseButton(props){

    return(
        <IconButton onClick = {props.onClick}>
          <CloseIcon onCilck = {props.onClick} style = {{padding: 0}} />
        </IconButton>
    )
}

export default CloseButton
