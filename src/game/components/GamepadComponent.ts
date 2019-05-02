import { Component } from '@ludic/ein'

export default class GamepadComponent extends Component {
  index: number
  constructor(index: number){
    super()
    this.index = index
  }
}