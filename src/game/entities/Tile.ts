import { Entity } from '@ludic/ein'

import PositionComponent from '../components/PositionComponent'
import TileStateComponent from '../components/TileStateComponent'

export default class Tile extends Entity {
  constructor(x: number, y: number, sideLength: number, tileType: string = 'build', active: boolean = false){
    super()
    this.add(new PositionComponent(x, y))
    this.add(new TileStateComponent(active, sideLength, tileType))
  }
}
