// //@flow
// import React, { Component } from "react";
// import { Uniform, Node, NearestCopy } from "gl-react";
// import { Surface } from "gl-react-dom";
// import { shaders } from "../gol";
// import timeLoop from "./timeLoop";
// {/*import gliderGunImage from "./glider-gun-64.png";*/}
//
// const GameOfLifeLoop = timeLoop(
//   ({ tick, size }) => (
//     <Node
//       shader={shaders.GameOfLife}
//       width={size}
//       height={size}
//       backbuffering
//       sync
//
//     />
//   ),
//   { refreshRate: 20 }
// );
//
// export default class GameOfLifeShader extends Component {
//   render() {
//     return (
//       <Surface
//         width={500}
//         height={500}
//
//       >
//         <NearestCopy>
//           <GameOfLifeLoop size={64} />
//         </NearestCopy>
//       </Surface>
//     );
//   }
// }
