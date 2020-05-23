// import { Camera } from '@ludic/ludic'
import { System, Engine, Entity, Query } from '@ludic/ein'

// import { Map, MapTile } from '../utils/Map'
import { CameraComponent,
         MapConfigComponent,
         TileStateComponent,
         SizeComponent,
         CubeCoordinateComponent,
         PositionComponent,
       } from '../components'

import { side_length_from_area, area_from_side_length, offset_to_cube, OffsetCoordinate, CubeCoordinate, hex_vertices, cube_to_vector2 } from '../utils/Hex'
import { ContextComponent } from '../components/ContextComponent'
import {
  PerspectiveCamera,
  OrthographicCamera,
  Shape,
  Vector2,
  ShapeGeometry,
  MeshBasicMaterial,
  Mesh,
  Scene,
  WebGLRenderer,
  BackSide,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  ShapeBufferGeometry,
  Matrix3,
  Matrix4,
  Vector3,
  Euler,
  Quaternion,
  InstancedMesh,
} from 'three'

export default class TileInitSystem extends System {
  blueMaterial = new MeshBasicMaterial( { color: '#607eeb', wireframe: false} )
  redMaterial = new MeshBasicMaterial( { color: 'red', wireframe: false} )
  outlineMaterial = new LineBasicMaterial( { color: 'black' } )

  tileShape: Shape
  geometry: ShapeBufferGeometry
  outlineGeometry: EdgesGeometry
  tileMesh: InstancedMesh

  contextQuery: Query

  constructor(priority: number = 0, enabled: boolean = true) {
    super(priority, enabled)
  }

  onAdded(engine: Engine){
    this.engine = engine
    this.contextQuery = engine.createQuery({
      name: 'context'
    })
  }


  execute(delta: number, time: number): void {
    const camera: OrthographicCamera = this.contextQuery.entities[0].getComponent(ContextComponent).camera
    const renderer: WebGLRenderer = this.contextQuery.entities[0].getComponent(ContextComponent).renderer
    const scene: Scene = this.contextQuery.entities[0].getComponent(ContextComponent).scene

    const canvasSize = renderer.getSize(new Vector2())

    // const ptm: number = renderer.pixelRatio
    // const h: number = Math.ceil(canvasSize.y / ptm)
    // const w: number = Math.ceil(canvasSize.x / ptm)
    const w = camera.right - camera.left
    const h = camera.top - camera.bottom

    // console.log(ptm)
    console.log(w, h)
    console.log(canvasSize)

    // Try to keep golden monitor ratio of 16:9
    const x_ratio = 16 * (4/3)  // 21.33 - The horizontal distance between adjacent hexagon centers is w * 3/4
    const y_ratio = 9           // Packing ratio is 1:1 for height

    const multiplier = 1.7
    const final_x = Math.round(x_ratio * multiplier)
    const final_y = Math.round(y_ratio * multiplier)

    const maxX = Math.round(final_x / 2 + 1)
    const minX = Math.round(-final_x / 2 - 1)

    const maxY = Math.round(final_y / 2 + 2)
    const minY = Math.round(-final_y / 2 - 2)
    // const scale = 0.8

    // const minX = camera.left * scale
    // const maxX = camera.right * scale

    // const minY = camera.bottom * scale
    // const maxY = camera.top * scale

    const tileHeight = h / (final_y - 1)
    const tileWidth = w / (final_x * (3/4))

    console.log(minX)
    console.log(maxX)

    console.log(minY)
    console.log(maxY)

    console.log(tileWidth, tileHeight)


    let sideLength = tileWidth / 2
    let totalTiles = (maxX+1 - minX) * (maxY+1 - minY)
    console.log("tile size", sideLength)

    this.tileShape = new Shape(hex_vertices({size: sideLength}).map(({x, y})=>new Vector2(x, y)))
    this.geometry = new ShapeBufferGeometry(this.tileShape)
    this.outlineGeometry = new EdgesGeometry(this.geometry)
    // This method of rendering is more performant as it batches the geometries into one mesh for one draw call
    // https://threejs.org/docs/index.html#api/en/objects/InstancedMesh
    this.tileMesh = new InstancedMesh(this.geometry, this.blueMaterial, totalTiles)

    let outlineSegments = []

    let actualTiles = 0
    for(let q=minX; q <= maxX; q++){
      for(let r=maxY; r >= minY; r--){
        const position = new Vector2(q, r)
        const matrix = this.createTileMatix(position, sideLength)
        // set the matrix of the geometry in the mesh at index `actualTiles`
        this.tileMesh.setMatrixAt(actualTiles, matrix)

        // create the line segments that draw the outline of each hex
        let tileOutline = new LineSegments(this.outlineGeometry, this.outlineMaterial)
        tileOutline.applyMatrix4(matrix)
        outlineSegments.push(tileOutline)
        
        actualTiles++
      }
    }

    scene.add(this.tileMesh)
    outlineSegments.forEach(outline => scene.add(outline))

    console.log("actual tiles: ", actualTiles, totalTiles)

    this.enabled = false
  }

  createTileMatix(offset: Vector2, size: number): Matrix4 {
    const cubeCoord: CubeCoordinate = offset_to_cube({q: offset.x, r: offset.y})
    const pos: Vector2 = cube_to_vector2({x: cubeCoord.x, y: cubeCoord.y, z: cubeCoord.z}, size)

    let position = new Vector3(pos.x, pos.y, 1)
    let rotation = new Euler()
    let quat = new Quaternion()
    quat.setFromEuler(rotation)
    let scale = new Vector3(1, 1, 1)

    let matrix = new Matrix4()
    matrix.compose(position, quat, scale)

    return matrix
  }
}

