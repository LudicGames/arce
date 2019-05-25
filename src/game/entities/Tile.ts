import { Vector2 } from '@ludic/ludic'
import { Entity } from '@ludic/ein'

import PositionComponent from '../components/PositionComponent'
import TileStateComponent, { TileType } from '../components/TileStateComponent'

import Hex from '../utils/Hex'

export default class Tile extends Entity {
  constructor(hex: Hex, tileType: TileType = '1', active: boolean = false){
    super()
    this.add(new PositionComponent(hex.position.x, hex.position.y))
    this.add(new TileStateComponent(hex, tileType, active))
  }
}
