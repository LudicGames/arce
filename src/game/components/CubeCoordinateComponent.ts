import { Component } from 'ecsy'

export default class CubeCoordinateComponent extends Component {
  x: number
  y: number
  z: number

  constructor(){
    super()
    this.reset()
  }

  reset(){
    this.x = 0
    this.y = 0
    this.z = 0
  }
}
