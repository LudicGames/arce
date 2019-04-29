
import { Component } from '@ludic/ein'

export type RenderFn = (ctx: CanvasRenderingContext2D, ...args: any[]) => void

export default class RenderComponent implements Component {
	public renderFn: RenderFn

  constructor(renderFn: RenderFn){
    this.renderFn = renderFn
  }
}