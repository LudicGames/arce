import Ludic from '@ludic/ludic'
import {  } from '../components'
import { System, World, Entity } from 'ecsy'
import { QueryType } from '/src/ecsy'

export default class TileInitSystem extends System {
  enabled: boolean
  engine: World

  queries: {
    entities: QueryType
    camera: QueryType
  }

  execute(deltaTime: number): void {

    this.enabled = false
  }

}

// @ts-ignore
TileInitSystem.queries = {
  config: { components: [TileMapConfig]},
}
