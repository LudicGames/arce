import {ComponentMapper, Family, Entity, System, Engine} from '@ludic/ein'

import Hex from '../utils/Hex'
import { EnemyWave, EnemyGroup } from '../utils/Waves'

import PositionComponent from '../components/PositionComponent'
import EnemyStateComponent from '../components/EnemyStateComponent'

export default class Enemy extends Entity {
  constructor(hex: Hex, wave: EnemyWave, group: EnemyGroup, type: string = "1"){
    super()

    this.add(new PositionComponent(hex.position.x, hex.position.y))
    this.add(new EnemyStateComponent(hex, wave, group, type))
  }
}
