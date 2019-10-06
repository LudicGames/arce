import { System, Family, EntityListener, Entity, ComponentMapper, Signal, Listener } from '@ludic/ein'
import Ludic from '@ludic/ludic'
import Player from '/src/game/entities/Player'
import GamepadComponent from '/src/game/components/GamepadComponent'
import PlayerStateComponent from '/src/game/components/PlayerStateComponent'
import MechComponent from '/src/game/components/MechComponent'
import PositionComponent from '/src/game/components/PositionComponent'
import { MechComponentMapper, GamepadComponentMapper } from '/src/game/components/mappers'

export default class CharacterSelectSystem extends System implements EntityListener {

  private players = new Map<string, any>()
  private family: Family
  private mechFamily: Family

  private playerMechMap = new WeakMap<object, Player>()
  private playerState = new WeakMap<Player, PlayerSelectState>()

  private positionMapper = new ComponentMapper(PositionComponent)
  private gamepadMapper = new ComponentMapper(GamepadComponent)

  private readySignal = new Signal<{[key: number]: string}>()

  constructor(){
    super()
    this.family = Family.all([GamepadComponent, PlayerStateComponent]).get()
    this.mechFamily = Family.all([MechComponent, PositionComponent]).exclude([GamepadComponent]).get()
  }

  addedToEngine(){
    this.engine.addEntityListener(this, 1, this.family)
  }

  entityAdded(player: Player){
    // player added, attach to first empty mech
    const mech = this.getNextEmptyMech()
    this.playerMechMap.set(mech, player)
    this.playerState.set(player, {moving: false, toggling: false})
  }
  entityRemoved(entity: Entity){

  }

  public listenForReady(cb: Listener<{[key: number]: string}>['receive']){
    this.readySignal.add({receive: cb})
  }

  private getMechs(){
    // sorted left to right
    return this.engine.getEntitiesFor(this.mechFamily).slice().sort((mechA, mechB) => {
      const posA = this.positionMapper.get(mechA)
      const posB = this.positionMapper.get(mechB)
      return posA.x - posB.x
    })
  }

  private getPlayers(){
    return this.engine.getEntitiesFor(this.family)
  }

  public update(){
    this.getMechs().forEach((mech, ix) => {
      // get the player for this mech and set its pos to the mech's
      const player = this.playerMechMap.get(mech)
      const mechPos = this.positionMapper.get(mech)
      if(player != null){
        const pos = this.positionMapper.get(player)
        pos.x = mechPos.x + 1.2
        pos.y = mechPos.y - 3

        const gp = this.gamepadMapper.get(player)
        const gamepad = Ludic.input.gamepad.get(gp.index)
        const playerSelectState = this.playerState.get(player)
        const playerSelectedMech = MechComponentMapper.get(player)

        const leftOrRight = gamepad.left.pressed || gamepad.right.pressed

        // move the gamepad indicator using the dpad
        if(!playerSelectState.moving && playerSelectedMech == null){
          if(gamepad.right.pressed) {
            playerSelectState.moving = true
            // find the next available mech for this player to move to
            const nextMech = this.getNextEmptyMech(ix)
            // swap this player and mech mapping
            this.playerMechMap.delete(mech)
            this.playerMechMap.set(nextMech, player)
          } else if(gamepad.left.pressed) {
            playerSelectState.moving = true
            // find the next available mech for this player to move to
            const nextMech = this.getNextEmptyMech(ix, true)
            // swap this player and mech mapping
            this.playerMechMap.delete(mech)
            this.playerMechMap.set(nextMech, player)
          }
        }
        // reset moving when not using dpad
        if(!leftOrRight && playerSelectState.moving){
          playerSelectState.moving = false
        }

        // check for character select
        if(gamepad.cross.buttonUp){
          playerSelectState.toggling = true
          const mechComponent = MechComponentMapper.get(mech)
          // toggle the mech component on the player entity
          if(playerSelectedMech != null){
            player.remove(MechComponent)
          } else {
            player.add(new MechComponent(mechComponent.type))
          }
        }

        if(gamepad.start.buttonUp){
          this.ready()
        }
      }
    })
  }

  private getNextEmptyMech(after?: number, last: boolean = false){
    let mechs = this.getMechs().slice()
    if(last){
      mechs.reverse() // in-place
    }
    // if we have after value, cycle the mechs array
    if(after != null){
      const end = last ? mechs.length - after : after
      const rmItems = mechs.splice(0, end)
      mechs.push(...rmItems)
    }
    return mechs.find((mech) => !this.playerMechMap.has(mech))
  }

  private ready(){
    this.setProcessing(false)
    // create a data packet of player gamepad indexes to player mech data
    const data = this.getPlayers().map(player => [GamepadComponentMapper.get(player).index, MechComponentMapper.get(player).type])
      .reduce((data, [index, type]: [number, string])=> ({...data, [index]: type}), {})
    this.readySignal.dispatch(data)
  }

}

interface PlayerSelectState {
  moving: boolean
  toggling: boolean
}
