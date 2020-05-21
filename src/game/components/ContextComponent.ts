import { Component } from 'ecsy'
import { Scene, PerspectiveCamera, WebGLRenderer, OrthographicCamera } from 'three'

export class ContextComponent extends Component {
  scene: Scene
  camera: OrthographicCamera
  renderer: WebGLRenderer

  constructor(){
    super()
  }
}