import { Entity } from '@ludic/ein'
import CastleStateComponent from '../components/CastleStateComponent'

export default class Castle extends Entity {
  constructor(tile: Tile){
    super()
    this.add(new CastleStateComponent(tile))
  }
}
