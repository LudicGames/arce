import {ComponentMapper, Family, Entity, System, Engine} from '@ludic/ein'

import Tile from '../entities/Tile'
import { EnemyWave, EnemyGroup } from '../utils/waves'

import EnemyStateComponent from '../components/EnemyStateComponent'
import PositionComponent from '../components/PositionComponent'
import MovementComponent from '../components/MovementComponent'

const pm: ComponentMapper<PositionComponent> = ComponentMapper.getFor(PositionComponent)

export default class Enemy extends Entity {

  constructor(tile: Tile, wave: EnemyWave, group: EnemyGroup, type: string = "1"){
    super()

    const pos = pm.get(tile)
    this.add(new PositionComponent(pos.x, pos.y))
    this.add(new MovementComponent())
    this.add(new EnemyStateComponent(tile, wave, group, type))
  }
}
