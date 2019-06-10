import { UIComponent } from 'ludic-ui'
import { styleMap } from 'lit-html/directives/style-map'
import { html as litHtml, TemplateResult } from 'lit-html'
import { Vector2 } from '@ludic/ludic'
import { LitHtml } from './litRenderer';
// import { TemplateResult } from 'lit-html';
// import { TemplateResult } from 'lit-html';


export default class TowerMenu extends UIComponent {

  position = new Vector2()
  visible = true

  get style(){
    return {
      display: this.visible ? 'initial' : 'none',
      left: `${this.position.x}px`,
      top: `${this.position.y}px`,
    }
  }

  render(html: any): any {
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