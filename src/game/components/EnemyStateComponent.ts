import { Component } from '@ludic/ein'
import { EnemyWave, EnemyGroup } from '../utils/Waves'

import Hex from '../utils/Hex'

export default class EnemyStateComponent extends Component {
  currentHex: Hex
  previousHex: Hex
  health: number
  speed: number
  color: string
  size: number
  type: string
  wave: EnemyWave
  group: EnemyGroup

  constructor(hex: Hex, wave: EnemyWave, group: EnemyGroup, type: string = "1", speed: number = .1, health: number = 10, size: number = 1){
    super()

    this.currentHex = hex
    this.previousHex = null
    this.wave = wave
    this.group = group
    this.type = type
    this.speed = speed
    this.health = health
    this.color = 'red'
    this.size = size
  }
}
