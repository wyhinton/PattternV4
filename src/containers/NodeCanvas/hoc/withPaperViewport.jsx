import React, { Component } from 'react'

export default function withPaperViewport(WrappedComponent) {

  return class extends Component {

  sayHello = (e) =>{
    console.log('HELLO THERE!!!!!');
  }

    render() {

      return (

        <WrappedComponent
          {...this.props}

         sayHello={this.sayHello}
        />
      )
    }

  }

}
