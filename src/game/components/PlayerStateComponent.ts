import { Component } from 'ecsy'
import Tile from '../entities/Tile'

export default class PlayerStateComponent extends Component {
  size: number
  vibrating: boolean
  playerType: string
  color: string
  currentTile: Tile
  boosting: boolean
  boostMultiplier = 1.2
  building: boolean = false

  private _speed = 0.5

  constructor(size: number = 1, playerType: string = 'type1'){
    super()

    this.size = size
    this.vibrating = false
    this.playerType = playerType

    if(this.playerType == 'type1'){
      this.color = 'rgba(192, 57, 43,1.0)'
    } else {
      this.color = 'orange'
    }
  }

  get speed(): number {
    return this.boosting ? this._speed * this.boostMultiplier : this._speed
  }
}
