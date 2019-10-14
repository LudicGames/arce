import { System } from 'ecsy'
import { UIComponent } from '/src/game/components'
import { QueryType } from '/src/ecsy'

export default class UIRenderSystem extends System {

  queries!: {
    components: QueryType
  }

  execute(){
    this.queries.components.results.forEach(ent => {
      console.log('render ui')
    })
  }
}

// @ts-ignore
UIRenderSystem.queries = {
  components: {components: [UIComponent]}
}