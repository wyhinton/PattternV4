class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }
  _onMouseMove(e) {
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }
  render() {
    const { x, y } = this.state;
    return <div className="container">
      <div>
        <img onMouseMove={this._onMouseMove.bind(this)} width="100" height="150" src="http://www.mariogiannini.com/wp-content/uploads/2017/10/Photo-200x300.jpg" />
      </div>
      <h1>{ x } { y }</h1><br/>
    </div>;
  }
}

/*
 * Render the above component into the div#app
 */
React.render(<Application />, document.getElementById('app'));
