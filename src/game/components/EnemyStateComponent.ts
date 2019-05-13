import { Component } from '@ludic/ein'
import Tile from '../entities/Tile'

export default class EnemyStateComponent extends Component {
  currentTile: Tile
  health: number
  speed: number
  color: string
  size: number

  constructor(currentTile: Tile, speed: number = .25, health: number = 10, size: number = 1){
    super()

    this.currentTile = currentTile
    this.speed = speed
    this.health = health
    this.color = 'red'
    this.size = size
  }
}