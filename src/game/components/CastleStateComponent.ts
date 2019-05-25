import { Component } from '@ludic/ein'
import Hex from '../utils/Hex'

export default class CastleStateComponent extends Component {
  hex: Hex
  health: number
  size: number

  constructor(hex: Hex, health: number = 10){
    super()

    this.hex = hex
    this.health = health
    this.size = 2
  }
}
