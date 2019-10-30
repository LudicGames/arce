import { Component } from 'ecsy'

export default class PositionComponent extends Component {
	x: number
	y: number

  constructor(){
    super()
    this.reset()
  }

  reset(){
    this.x = 0
    this.y = 0
  }
}
