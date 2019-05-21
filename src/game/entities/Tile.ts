import { Vector2 } from '@ludic/ludic'
import { Entity } from '@ludic/ein'

import PositionComponent from '../components/PositionComponent'
import TileStateComponent from '../components/TileStateComponent'

import { Coordinate } from '../utils/Map'

export default class Tile extends Entity {
  constructor(coordinate: Coordinate, position: Vector2, sideLength: number, tileType: string = 'build', active: boolean = false){
    super()
    this.add(new PositionComponent(position.x, position.y))
    this.add(new TileStateComponent(coordinate, active, sideLength, tileType))
  }
}
