import { Component } from '@ludic/ein'
import Player from '../entities/Player'
import Hex from '../utils/Hex'

export default class TileStateComponent extends Component {
  hex: Hex
  active: boolean
  tileType: string
  // color: string
  playersOn: Player[]
  building: boolean = false

  private _color: string
  private _fill: string

  constructor(hex: Hex, active: boolean = false, tileType: string = 'build'){
    super()
    this.hex = hex
    this.active = active
    this.tileType = tileType
    this.playersOn = []

    if(this.tileType == 'build'){
      this._color = 'rgba(230, 126, 34, .2)'
    } else {
      this._color = 'green'
    }
  }

  get color(): string {
    return this.building ? 'green' : 'rgba(230, 126, 34, 0.2)'
  }

  get fill(): string {
    return this.active ? 'rgba(230, 126, 34, .3)' : 'rgba(0, 0, 0, .0)'
  }
}
