import { SingletonComponent } from '@ludic/ein'
import { WebGLRenderer } from 'three'

export class RendererComponent extends SingletonComponent {
  renderer: WebGLRenderer
}