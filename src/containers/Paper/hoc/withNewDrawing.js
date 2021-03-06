import React, { Component } from 'react'
import randomColor from 'randomcolor'
import randomInt from 'random-int'

export default function withNewDrawing(WrappedComponent) {

  return class extends Component {

    newDrawing = (e) => {
      console.log('circle mouseDown')
      this.props.deselectItem()
      const paper = e.tool._scope
      console.log('clicked point is', e.point);
      const circle = new paper.Path.Circle({
        center: e.point,
        fillColor: randomColor(),
        radius: randomInt(10, 60),
      })
      const item = this.props.addItem(circle.layer, {
        type: 'Circle',
        pathData: circle.getPathData(),
        fillColor: circle.fillColor.toCSS(true),
      })
      console.log(circle)
      console.log(circle.getPathData())
      circle.remove()
      this.props.selectItem(item)
    }
    componentDidMount() {
        console.log('mounted circle tooll', {...this.props});
    }
    render() {

      return (

        <WrappedComponent
          {...this.props}

          newDrawing={this.newDrawing}
        />
      )
    }

  }

}
