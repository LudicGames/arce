import {ComponentMapper, Family, Entity, System, Engine} from '@ludic/ein'

import Hex from '../utils/Hex'

import PositionComponent from '../components/PositionComponent'
import TowerStateComponent from '../components/TowerStateComponent'

export default class Tower extends Entity {
  constructor(hex: Hex, type: string = "1"){
    super()

    this.add(new PositionComponent(hex.position.x, hex.position.y))
    this.add(new TowerStateComponent(hex, type))
  }
}
