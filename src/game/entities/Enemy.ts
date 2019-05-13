import { Entity } from '@ludic/ein'
import EnemyStateComponent from '../components/EnemyStateComponent'

export default class Enemy extends Entity {
  constructor(tile: Tile){
    super()
    this.add(new EnemyStateComponent(tile))
  }
}
