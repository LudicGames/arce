import Ludic, { Vector2 } from '@ludic/ludic'
import { System, World, Entity } from 'ecsy'
import { QueryType } from '/src/ecsy'
import { PositionComponent,
         isTileComponent,
         isPlayerComponent,
         SizeComponent,
         EnemyConfigComponent,
         isCastleComponent,
         SpeedComponent,
         PreviousCubeComponent,
         TileStateComponent,
         CubeCoordinateComponent,
       } from '../components'

import { Vector2Normalize } from '../utils/Euclid'
import { Hex, CubeCoordinate, OffsetCoordinate, cube_all_neighbors, vector2_to_cube, cube_to_vector2 } from '../utils/Hex'

export default class TileActivationSystem extends System {
  enabled: boolean
  world: World

  queries: {
    players: QueryType
    tiles:  QueryType
  }

  execute(deltaTime: number): void {
    const players: Entity[] = this.queries.players.changed
    if(!players.length) return

    const tiles: Entity[] = this.queries.tiles.results
    const tileSize: number = tiles[0].getComponent(SizeComponent).value

    let playerCubes: CubeCoordinate[] = []
    players.forEach((player: Entity) => {
      const playerPositionComponent = player.getComponent(PositionComponent)
      const playerPosition: Vector2 = new Vector2(playerPositionComponent.x, playerPositionComponent.y)
      playerCubes.push(vector2_to_cube(playerPosition, tileSize))
    })

    tiles.forEach((tile: Entity) => {
      let state: TileStateComponent = tile.getMutableComponent(TileStateComponent)
      let cube: CubeCoordinateComponent = tile.getComponent(CubeCoordinateComponent)

      state.status = "inactive"
      state.playersOn = 0
      playerCubes.forEach(c => {
        if(c.x == cube.x && c.y == cube.y && c.z == cube.z){
          state.status = "active"
          state.playersOn++
        }
      })
    })
  }
}

// @ts-ignore
TileActivationSystem.queries = {
  players: {
    components: [isPlayerComponent, CubeCoordinateComponent],
    listen: {
      changed: [ CubeCoordinateComponent ]
    },
    mandatory: true
  },
  tiles:  { components: [TileStateComponent], mandatory: true},
}
