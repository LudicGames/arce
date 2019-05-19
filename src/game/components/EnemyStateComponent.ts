import { Component } from '@ludic/ein'
import Tile from '../entities/Tile'
import { EnemyWave, EnemyGroup } from '../utils/waves'

export default class EnemyStateComponent extends Component {
  currentTile: Tile
  health: number
  speed: number
  color: string
  size: number
  type: string
  wave: EnemyWave
  group: EnemyGroup

  constructor(currentTile: Tile, wave: EnemyWave, group: EnemyGroup, type: string = "1", speed: number = .1, health: number = 10, size: number = 1){
    super()

    this.currentTile = currentTile
    this.wave = wave
    this.group = group
    this.type = type
    this.speed = speed
    this.health = health
    this.color = 'red'
    this.size = size
  }
}
