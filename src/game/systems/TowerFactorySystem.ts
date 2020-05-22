import { System, Entity } from '@ludic/ein'

import { isTowerComponent, TowerTypeComponent, CubeCoordinateComponent, isTileComponent, PositionComponent, SizeComponent } from '../components'
import { cube_to_vector2, cube_equal } from '../utils/Hex'

export default class TowerFactorySystem extends System {

  queries!: {
    newTowers: QueryType
    tiles: QueryType
  }

  execute(){

    this.queries.newTowers.added.forEach(tower => {
      const {value: type} = tower.getComponent(TowerTypeComponent)

      if(type == 'blue'){
        this.composeBlueTower(tower)
      }

      const coords = tower.getComponent(CubeCoordinateComponent)
      // find the tile for this coord
      const tile = this.queries.tiles.results.find((tile: Entity) => cube_equal(tile.getComponent(CubeCoordinateComponent), coords))
      if(tile != null){
        const size = tile.getComponent(SizeComponent).value
        const pos = cube_to_vector2({x: coords.x, y: coords.y, z: coords.z}, size)
        tower.addComponent(PositionComponent, pos)
      }
    })
  }

  composeBlueTower(tower: Entity){
    console.log('create blue tower')
  }
}

// @ts-ignore
TowerFactorySystem.queries = {
  newTowers: {
    components: [isTowerComponent, TowerTypeComponent],
    mandatory: true,
    listen: {
      added: true,
    }
  },
  tiles: {
    components: [isTileComponent, CubeCoordinateComponent],
  },
}
