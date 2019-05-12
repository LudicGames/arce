import { Component } from '@ludic/ein'
import Tile from '../entities/Tile'

export default class PlayerStateComponent extends Component {
  speed: number
  size: number
  vibrating: boolean
  playerType: string
  color: string
  currentTile: Tile

  constructor(size: number = 2, playerType: string = 'type1'){
    super()

    this.speed = 0.5
    this.size = size
    this.vibrating = false
    this.playerType = playerType

    if(this.playerType == 'type1'){
      this.color = 'rgba(192, 57, 43,1.0)'
    } else {
      this.color = 'orange'
    }
  }
}
