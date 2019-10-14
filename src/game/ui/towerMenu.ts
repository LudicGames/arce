import { styleMap } from 'lit-html/directives/style-map'
import { html, TemplateResult } from 'lit-html'
import { Vector2 } from '@ludic/ludic'


export default class TowerMenu {

  position = new Vector2()
  visible = true

  get style(){
    return {
      display: this.visible ? 'initial' : 'none',
      left: `${this.position.x}px`,
      top: `${this.position.y}px`,
    }
  }

  render() {
    return html`
      <style>
        .tower-menu {
          position: absolute;
        }
      </style>
      <div class="tower-menu" style=${styleMap(this.style)}>hello world</div>
    `
  }
}