import { Component } from '@ludic/ein'
import Player from '../entities/Player'

export default class TileStateComponent extends Component {
  active: boolean
  sideLength: number
  tileType: string
  color: string
  playersOn: Player[]

  constructor(active: boolean = false, sideLength: number = 3, tileType: string = 'build'){
    super()
    this.active = active
    this.sideLength = sideLength
    this.tileType = tileType
    this.playersOn: []

    if(this.tileType == 'build'){
      this.color = 'rgba(230, 126, 34,1.0)'
    } else {
      this.color = 'green'
    }
  }
}
