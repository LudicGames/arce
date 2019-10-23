import { System, World, Entity, Not } from 'ecsy'
import { isTowerMenu, GamepadComponent, PlayerStateComponent, PositionComponent, CameraComponent, InputFocus, TowerMenuStateComponent } from '../components'
import { QueryType } from '/src/ecsy'
import Ludic, { Vector2 } from '@ludic/ludic'
import { render, html } from 'lit-html'
import { styleMap } from 'lit-html/directives/style-map'
import { classMap } from 'lit-html/directives/class-map'
import '/src/game/ui/styles/towerMenu.styl'

export default class TowerMenuRenderSystem extends System {



  world!: World
  queries!: {
    camera: QueryType
    components: QueryType
    added: QueryType
  }

  containerId = '#tower-menu-render-container'
  container: HTMLDivElement

  towers = [
    {
      type: 'blue',
    },
    {
      type: 'brown',
    },
    {
      type: 'green',
    },
  ]

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
    // init state components
    this.queries.added.results.forEach(ent => {
      ent.addComponent(TowerMenuStateComponent)
    })
    this.renderMenus()
  }

  renderMenus(){
    const templates = this.queries.components.results.map(ent => this.menuTemplate(ent))
    render(html`${templates}`, this.container)
  }

  menuTemplate(ent: Entity){
    // Styles imported above
    return html`
      <div class=${this.menuClass(ent)} style=${this.menuStyle(ent)}>
        ${this.towers.map((cfg, ix) => html`
          <div class=${this.towerItemClass(ent, ix)} data-type=${cfg.type}>${cfg.type}</div>
        `)}
      </div>
    `
  }

  menuStyle(ent: Entity){
    const {value: camera} = this.queries.camera.results[0].getComponent(CameraComponent)
    const pos = ent.getComponent(PositionComponent)
    const position = camera.getPixelPointFromWorldPoint(new Vector2(pos.x, pos.y))
    const margin = 20
    return styleMap({
      left: `${position.x}px`,
      top: `${position.y-margin}px`,
    })
  }

  menuClass(ent: Entity){
    return classMap({
      'tower-menu': true,
    })
  }

  towerItemClass(ent: Entity, ix: number){
    const state = ent.getComponent(TowerMenuStateComponent)
    return classMap({
      'tower': true,
      'active': state.index == ix,
    })
  }
}

// @ts-ignore
TowerMenuRenderSystem.queries = {
  camera: {components: [CameraComponent]},
  added: {
    components: [isTowerMenu, Not(TowerMenuStateComponent)],
  },
  components: {
    components: [isTowerMenu, InputFocus, TowerMenuStateComponent],
    listen: {
      added: true,
      removed: true,
    }
  }
}