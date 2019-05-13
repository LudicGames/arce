import { Component } from '@ludic/ein'
import Tile from '../entities/Tile'

export default class EnemyStateComponent extends Component {
  currentTile: Tile
  health: number
  speed: number
  color: string

  constructor(currentTile: Tile, speed: number = .25, health: number = 10){
    super()

    this.currentTile = tile
    this.speed = speed
    this.health = health
    this.color = 'red'
  }
}
