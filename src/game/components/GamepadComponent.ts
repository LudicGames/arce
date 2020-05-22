import { Component } from '@ludic/ein'

export default class GamepadComponent extends Component {
  index: number

  constructor(){
    super()
    this.reset()
  }

  reset(){
    this.index = -1
  }
}
