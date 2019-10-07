import Ludic, { Camera } from '@ludic/ludic'
import {ComponentMapper, Family, Entity, System, Engine} from '@ludic/ein'

import { CastleState, EnemyState, Position } from './components'

import Player from '../entities/Player'
import Enemy from '../entities/Enemy'
import Tile from '../entities/Tile'
import Castle from '../entities/Castle'

import { Vector2Normalize } from '../utils/Euclid'
import Hex, { CubeCoordinate, OffsetCoordinate } from '../utils/Hex'

export default class CastleDamageSystem extends System {
  private csm: ComponentMapper<CastleStateComponent> = ComponentMapper.getFor(CastleStateComponent)
  private esm: ComponentMapper<EnemyStateComponent> = ComponentMapper.getFor(EnemyStateComponent)
  private pm: ComponentMapper<PositionComponent> = ComponentMapper.getFor(PositionComponent)

  public entities: Entity[]
  public components = [CastleStateComponent, EnemyStateComponent]
  public family: Family

  constructor(){
    super()
    this.family = Family.one(this.components).get()
  }

  public addedToEngine(engine: Engine): void {
    this.entities = engine.getEntitiesFor(this.family)
    this.engine = engine
  }

  public removedFromEngine(engine: Engine): void {
    this.entities = []
  }

  public update(deltaTime: number): void {
    const ctx = Ludic.canvas.context
    this.entities = this.engine.getEntitiesFor(this.family)

    const castles: Castle[] = this.entities.filter(entity => !!this.csm.get(entity))
    const enemies: Enemy[]  = this.entities.filter(entity => !!this.esm.get(entity))

    if(castles.length){
      let cPos = this.pm.get(castles[0])
      let cState = this.csm.get(castles[0])

      enemies.forEach(enemy => {
        let ePos = this.pm.get(enemy)

        // If an enemy touches (aprox) the castle
        if(Math.abs(cPos.x - ePos.x) < .05 && Math.abs(cPos.y - ePos.y) < .05){

          // Reduce castle health
          cState.health -= 1

          // Remove the enemy entity
          enemy.removing = true
          this.engine.removeEntity(enemy)
        }
      })
    }
  }
}
