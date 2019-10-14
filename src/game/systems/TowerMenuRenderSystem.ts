import { System, World } from 'ecsy'
import { TowerMenuComponent, GamepadComponent, PlayerStateComponent, PositionComponent, CameraComponent, InputFocus } from '../components'
import { QueryType } from '/src/ecsy'
import Ludic, { Vector2 } from '@ludic/ludic'
import { render, html } from 'lit-html'

export default class TowerMenuRenderSystem extends System {



  world!: World
  queries!: {
    camera: QueryType
    components: QueryType
  }

  containerId: '#tower-menu-render-container'
  container: HTMLDivElement

  init(){
    // initialize our rendering container
    this.container = document.body.querySelector(this.containerId)
    if(!this.container){
      const uiContainer = document.body.querySelector("#ui-container")
      this.container = document.createElement('div')
      this.container.id = this.containerId
      uiContainer.appendChild(this.container)
    }
  }
  
  execute(){
    
    this.queries.components.added.forEach(ent => {
      const {value: component} = ent.getComponent(TowerMenuComponent)
      const {value: camera} = this.queries.camera.results[0].getComponent(CameraComponent)
      const pos = ent.getComponent(PositionComponent)
      component.position = camera.getPixelPointFromWorldPoint(new Vector2(pos.x, pos.y))
    })

    this.renderMenus()
  }

  renderMenus(){
    const templates = this.queries.components.results.map(ent => ent.getComponent(TowerMenuComponent).value.render())
    render(html`${templates}`, this.container)
  }
}

// @ts-ignore
TowerMenuRenderSystem.queries = {
  camera: {components: [CameraComponent]},
  components: {
    components: [TowerMenuComponent, InputFocus],
    listen: {
      added: true,
      removed: true,
    }
  }
}