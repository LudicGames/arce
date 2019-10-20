import { System, World, Entity, Not } from 'ecsy'
import { isTowerMenu, GamepadComponent, PlayerStateComponent, PositionComponent, CameraComponent, InputFocus, TowerMenuStateComponent } from '../components'
import { QueryType } from '/src/ecsy'
import Ludic, { Vector2 } from '@ludic/ludic'
import { render, html } from 'lit-html'
import { styleMap } from 'lit-html/directives/style-map'
import { classMap } from 'lit-html/directives/class-map'

export default class TowerMenuRenderSystem extends System {



  world!: World
  queries!: {
    camera: QueryType
    components: QueryType
    added: QueryType
  }

  containerId = '#tower-menu-render-container'
  container: HTMLDivElement

  towers = ['a', 'b', 'c']

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
    return html`
      <style>
        .tower-menu {
          display: flex;
        }
        .tower {
          width: 20px;
          height: 20px;
          background: blue;
          border: 1px solid blue;
          margin-right: 8px;
        }
        .tower.active {
          border-color: red;
        }
      </style>
      <div class="${this.menuClass(ent)}" style=${this.menuStyle(ent)}>
        ${this.towers.map((name, ix) => html`
          <div class="${this.towerItemClass(ent, ix)}">${name}</div>
        `)}
      </div>
    `
  }

  menuStyle(ent: Entity){
    const {value: camera} = this.queries.camera.results[0].getComponent(CameraComponent)
    const pos = ent.getComponent(PositionComponent)
    const position = camera.getPixelPointFromWorldPoint(new Vector2(pos.x, pos.y))
    return styleMap({
      position: 'absolute',
      left: `${position.x-40}px`,
      top: `${position.y-50}px`,
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