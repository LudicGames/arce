import { Vector2 } from '@ludic/ludic'
import { Entity } from '@ludic/ein'

import PositionComponent from '../components/PositionComponent'
import TileStateComponent from '../components/TileStateComponent'

import Hex from '../utils/Hex'

export default class Tile extends Entity {
  constructor(hex: Hex, tileType: string = 'build', active: boolean = false){
    super()
    this.add(new PositionComponent(hex.position.x, hex.position.y))
    this.add(new TileStateComponent(hex, active, tileType))
  }
}
