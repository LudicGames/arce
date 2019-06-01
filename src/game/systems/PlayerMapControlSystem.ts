import Ludic, { Vector2 } from '@ludic/ludic'
import { Engine, System, Family, Entity, ComponentMapper, IteratingSystem } from '@ludic/ein'

import GamepadComponent from '../components/GamepadComponent'
import PositionComponent from '../components/PositionComponent'
import PlayerStateComponent from '../components/PlayerStateComponent'
import TileStateComponent from '../components/TileStateComponent'

import Tile from '../entities/Tile'

import { Map, MapTile } from '../utils/Map'
import Hex, { OffsetCoordinate, CubeCoordinate } from '../utils/Hex'
/**
 * This system is in charge of translating gamepad inputs into
 * player movement.
 */
export default class PlayerMapControlSystem extends IteratingSystem {

  pm = new ComponentMapper(PositionComponent)
  gm = new ComponentMapper(GamepadComponent)
  psm = new ComponentMapper(PlayerStateComponent)
  tm = new ComponentMapper(TileStateComponent)

  engine: Engine

  gamepadDeadzone = 0.3

  constructor(engine: Engine){
    super(Family.all([GamepadComponent, PositionComponent, PlayerStateComponent]).get())
    this.engine = engine
  }

  exportMap(){
    let tiles: Tile[] = this.engine.getEntitiesFor(Family.all([TileStateComponent]).get())

    let mapTiles: MapTile[] = tiles.map((t: Tile) => {
      let s = this.tm.get(t)
      return {
        pos: {
          x: s.hex.x,
          y: s.hex.y,
          z: s.hex.z,
        },
        tileType: s.tileType
      }
    })

    let map: Map = {
      tiles: mapTiles,
      castles: [{x:2,  y: 0, z: -2}],
      playerSpawnPoints: [
        {x:1, y: 1, z: -2},
        {x:3, y: -1, z: 2},
      ]
    }

    this.downloadObjectAsJson(map, "mapConfig.json")
  }

  downloadObjectAsJson(exportObj: any, exportName: string){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  processEntity(ent: Entity, deltaTime: number) {
    const p = this.pm.get(ent)
    const g = this.gm.get(ent)
    const state = this.psm.get(ent)
    const gamepad = Ludic.input.gamepad.get(g.index)

    if(p){
      const playerVector = new Vector2(0,0)
      // Update the position based on gamepad actions
      if(gamepad.lx.value >= this.gamepadDeadzone) {
        playerVector.x = gamepad.lx.value
      } else if(gamepad.lx.value <= -this.gamepadDeadzone) {
        playerVector.x = gamepad.lx.value
      }
      if(gamepad.ly.value >= this.gamepadDeadzone) {
        playerVector.y = -gamepad.ly.value
      } else if(gamepad.ly.value <= -this.gamepadDeadzone) {
        playerVector.y = -gamepad.ly.value
      }

      // speed boost
      if(gamepad.circle.buttonDown){
        state.boosting = true
      } else if(gamepad.circle.buttonUp){
        state.boosting = false
      }

      // normalize the player vector and apply speed multiplier
      playerVector.scale(state.speed)
      p.x += playerVector.x
      p.y += playerVector.y


      if(state.currentTile != null){

        let tileState = state.currentTile.getComponent(TileStateComponent)
        let x = gamepad.rx.value
        let y = gamepad.ry.value

        if(x > 0 && y > 0){
          tileState.tileType = "1"
        }
        if(x < 0 && y > 0){
          tileState.tileType = "2"
        }
        if(x > 0 && y < 0){
          tileState.tileType = "3"
        }
        if(x < 0 && y < 0){
          tileState.tileType = "4"
        }

        if(gamepad.home.buttonUp){
          this.exportMap()
        }
      }
    }
  }
}
