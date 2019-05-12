import { Component } from '@ludic/ein'
import Tile from '../entities/Tile'

export default class CastleStateComponent extends Component {
  tile: Tile
  health: number
  size: number

  constructor(tile: Tile, health: number = 10){
    super()

    this.tile = tile
    this.health = health
    this.size = 2
  }
}
