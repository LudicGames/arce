import { Component } from '@ludic/ein'
import Player from '../entities/Player'

export default class TileStateComponent extends Component {
  active: boolean
  sideLength: number
  tileType: string
  // color: string
  playersOn: Player[]
  building: boolean = false

  private _color: string
  private _fill: string

  constructor(active: boolean = false, sideLength: number = 3, tileType: string = 'build'){
    super()
    this.active = active
    this.sideLength = sideLength
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
