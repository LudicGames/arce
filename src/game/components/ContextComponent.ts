import { Component } from '@ludic/ein'
import { Scene, PerspectiveCamera, WebGLRenderer, OrthographicCamera } from 'three'

export class ContextComponent extends Component {
  scene: Scene
  camera: OrthographicCamera
  renderer: WebGLRenderer
}
