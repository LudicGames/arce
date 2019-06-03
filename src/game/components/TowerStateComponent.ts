import { Component } from '@ludic/ein'
import Hex from '../utils/Hex'

export default class TowerStateComponent extends Component {
  hex: Hex
  type: string
  color: string
  size: number

  constructor(hex: Hex, type: string = "1"){
    super()

    this.hex = hex
    this.type = type

    if(type === "1"){
      this.color = 'blue'
      this.size = 1
    } else {
      this.color = 'red'
      this.size = .5
    }
  }
}
