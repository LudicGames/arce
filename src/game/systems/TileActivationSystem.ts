import intersects from 'intersects'
import Ludic, { Camera } from '@ludic/ludic'
import {ComponentMapper, Family, Entity, System, Engine} from '@ludic/ein'

import PositionComponent from '../components/PositionComponent'
import TileStateComponent from '../components/TileStateComponent'
import PlayerStateComponent from '../components/PlayerStateComponent'

export default class TileActivationSystem extends System {
  private pm: ComponentMapper<PositionComponent> = ComponentMapper.getFor(PositionComponent)
  private psm: ComponentMapper<PlayerStateComponent> = ComponentMapper.getFor(PlayerStateComponent)
  private tsm: ComponentMapper<TileStateComponent> = ComponentMapper.getFor(TileStateComponent)

  public entities: Entity[]
  public components = [PositionComponent]
  public family: Family

  camera: Camera

  constructor(){
    super()
    this.family = Family.all(this.components).get()
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
    if(this.engine) {
      this.entities = this.engine.getEntitiesFor(this.family)
    }

    // Player entities
    const players =  this.entities.filter(entity => !!this.psm.get(entity))
    const tiles   =  this.entities.filter(entity => !!this.tsm.get(entity))

    if(players.length){
      let playerInfo = players.map(player => {
        const playerPos = this.pm.get(player)
        const playerState = this.psm.get(player)
        const centerPointX = playerPos.x + (playerState.size / 2)
        const centerPointY = playerPos.y + (playerState.size / 2)
        return {
          player: player,
          closestTile: null,
          closestTileDistance: null,
          cX: centerPointX,
          cY: centerPointY,
        }
      })

      tiles.forEach((tile: Entity) => {
        let tileState: TileStateComponent = this.tsm.get(tile)
        let tilePos: PositionComponent = this.pm.get(tile)
        let x = tilePos.x
        let y = tilePos.y

        playerInfo.forEach(p => {
          // Calc distance from current Tile
          let distance = Math.sqrt((Math.pow((x - p.cX), 2) + Math.pow((y - p.cY), 2)))
          if(p.closestTileDistance == null || p.closestTileDistance > distance){
            p.closestTileDistance = distance
            p.closestTile = tile
          }
        })
      })

      // Set active tile if either player is closest
      tiles.forEach(tile => {
        let tileState: TileStateComponent = this.tsm.get(tile)
        tileState.playersOn = []
        tileState.active = false

        playerInfo.forEach(p => {
          if(p.closestTile == tile){
            tileState.active = true
            tileState.playersOn.push(p.player)
          }
        })
      })

      // Set the players active tile
      playerInfo.forEach(p => {
        const playerState = this.psm.get(p.player)
        playerState.currentTile = p.closestTile
      })
    }
  }
}
