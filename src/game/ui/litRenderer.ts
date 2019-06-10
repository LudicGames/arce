import { UIComponent } from 'ludic-ui'
import { render as litRender, html, TemplateResult } from 'lit-html'

export const render = function render(comp: UIComponent, container: HTMLElement){
  litRender(comp.render(html), container)
}

// export interface LitHtml {
//   (strings: TemplateStringsArray, ...values: unknown[]): TemplateResult
// }

export type LitParams = Parameters<typeof html>
export type LitHtml = (...args: LitParams) => ReturnType<typeof html>