import {getRandomField, redeem} from "./Utilities";

let limit = 1;
let isFiring:boolean;
let currentWiped:any;

let subscriptions:any[] = [];


/**
 * set initial Variables and layer visibilities
 */
export const initTeamPlay = function (){

    WA.room.hideLayer('TeamAnimation/AniA');
    WA.room.hideLayer('TeamAnimation/AniB');
    WA.room.hideLayer('TeamAnimation/AniC');
    WA.room.hideLayer('TeamAnimation/AniD');
    WA.room.hideLayer('TeamAnimation/AniE');

    let received:any = WA.state.loadVariable('isFiring');
    isFiring = JSON.parse(received);

    let initial: any = WA.state.loadVariable('wiped');
    let wiped;
    if(typeof initial === 'string' ){
        wiped = JSON.parse(initial);
    }else{
        wiped = initial;
    }

    currentWiped = wiped;

    if(isFiring){
        WA.room.showLayer('feuerwerk_1');
        WA.room.showLayer('feuerwerk_2');
        WA.room.showLayer('feuerwerk_3');
    }else{
        WA.room.hideLayer('feuerwerk_1');
        WA.room.hideLayer('feuerwerk_2');
        WA.room.hideLayer('feuerwerk_3');
    }

    WA.room.setTiles([{x: wiped[0].x, y: wiped[0].y, tile: 'marker', layer: 'TeamLayer/TeamA'}]);
    WA.room.setTiles([{x: wiped[1].x, y: wiped[1].y, tile: 'marker', layer: 'TeamLayer/TeamB'}]);
    WA.room.setTiles([{x: wiped[2].x, y: wiped[2].y, tile: 'marker', layer: 'TeamLayer/TeamC'}]);
    WA.room.setTiles([{x: wiped[3].x, y: wiped[3].y, tile: 'marker', layer: 'TeamLayer/TeamD'}]);
    WA.room.setTiles([{x: wiped[4].x, y: wiped[4].y, tile: 'marker', layer: 'TeamLayer/TeamE'}]);

    WA.room.setTiles([{x: wiped[0].x, y: wiped[0].y, tile: 'found', layer: 'TeamAnimation/AniA'}]);
    WA.room.setTiles([{x: wiped[1].x, y: wiped[1].y, tile: 'found', layer: 'TeamAnimation/AniB'}]);
    WA.room.setTiles([{x: wiped[2].x, y: wiped[2].y, tile: 'found', layer: 'TeamAnimation/AniC'}]);
    WA.room.setTiles([{x: wiped[3].x, y: wiped[3].y, tile: 'found', layer: 'TeamAnimation/AniD'}]);
    WA.room.setTiles([{x: wiped[4].x, y: wiped[4].y, tile: 'found', layer: 'TeamAnimation/AniE'}]);

    setTriggers();

    WA.state.onVariableChange('teamCounter').subscribe((value: any) => {
        if(!isFiring){
            startFirework(value);
        }
    });

    /**
     * Rearanging secret tiles to find
     */
    WA.state.onVariableChange('wiped').subscribe((value: any) => {
        WA.room.setTiles([{x: currentWiped[0].x, y: currentWiped[0].y, tile: 0, layer: 'TeamLayer/TeamA'}]);
        WA.room.setTiles([{x: currentWiped[1].x, y: currentWiped[1].y, tile: 0, layer: 'TeamLayer/TeamB'}]);
        WA.room.setTiles([{x: currentWiped[2].x, y: currentWiped[2].y, tile: 0, layer: 'TeamLayer/TeamC'}]);
        WA.room.setTiles([{x: currentWiped[3].x, y: currentWiped[3].y, tile: 0, layer: 'TeamLayer/TeamD'}]);
        WA.room.setTiles([{x: currentWiped[4].x, y: currentWiped[4].y, tile: 0, layer: 'TeamLayer/TeamE'}]);

        WA.room.setTiles([{x: currentWiped[0].x, y: currentWiped[0].y, tile: 0, layer: 'TeamAnimation/AniA'}]);
        WA.room.setTiles([{x: currentWiped[1].x, y: currentWiped[1].y, tile: 0, layer: 'TeamAnimation/AniB'}]);
        WA.room.setTiles([{x: currentWiped[2].x, y: currentWiped[2].y, tile: 0, layer: 'TeamAnimation/AniC'}]);
        WA.room.setTiles([{x: currentWiped[3].x, y: currentWiped[3].y, tile: 0, layer: 'TeamAnimation/AniD'}]);
        WA.room.setTiles([{x: currentWiped[4].x, y: currentWiped[4].y, tile: 0, layer: 'TeamAnimation/AniE'}]);

        currentWiped = value;


        WA.room.setTiles([{x: value[0].x, y: value[0].y, tile: 'marker', layer: 'TeamLayer/TeamA'}]);
        WA.room.setTiles([{x: value[1].x, y: value[1].y, tile: 'marker', layer: 'TeamLayer/TeamB'}]);
        WA.room.setTiles([{x: value[2].x, y: value[2].y, tile: 'marker', layer: 'TeamLayer/TeamC'}]);
        WA.room.setTiles([{x: value[3].x, y: value[3].y, tile: 'marker', layer: 'TeamLayer/TeamD'}]);
        WA.room.setTiles([{x: value[4].x, y: value[4].y, tile: 'marker', layer: 'TeamLayer/TeamE'}]);

        WA.room.setTiles([{x: value[0].x, y: value[0].y, tile: 'found', layer: 'TeamAnimation/AniA'}]);
        WA.room.setTiles([{x: value[1].x, y: value[1].y, tile: 'found', layer: 'TeamAnimation/AniB'}]);
        WA.room.setTiles([{x: value[2].x, y: value[2].y, tile: 'found', layer: 'TeamAnimation/AniC'}]);
        WA.room.setTiles([{x: value[3].x, y: value[3].y, tile: 'found', layer: 'TeamAnimation/AniD'}]);
        WA.room.setTiles([{x: value[4].x, y: value[4].y, tile: 'found', layer: 'TeamAnimation/AniE'}]);
    });
}

/**
 * Writing/Deleting the name of ployer who entered the secret team layer
 * @param valName players Name who entered/left a teamplay layer
 * @param del should the players name be deleted from list
 */
let writeToVar = function(valName:string, del:boolean){
    let value = WA.player.name;

    let counter;
    let x:any = WA.state.loadVariable('teamCounter');
    if(typeof x === 'string' ){
        counter = JSON.parse(x);
        counter['count'] = 0
        counter['players'] = {};
    }else{
        counter = x;
    }

    let currentPlayer = counter.players[valName];


    /* checking if player is cheating by entering the map with multiple browsers */
    if(currentPlayer === value && del && counter.count > 0){
        counter['players'][valName] = null;
        counter.count = counter.count - 1;
    }

    if(!currentPlayer){
        let cheater = false;

        for(let player in counter.players){
            if(player != valName && counter.players[player] === value){
                cheater = true;
            }
        }

        if(cheater){
            console.log('no, no, no cheating!')
        }else{
            counter['players'][valName] = value;
            counter.count = counter.count + 1;
        }

    }

    WA.state.saveVariable('teamCounter', counter);
}

/**
 * start the firework if enough secret fields are occupied
 * @param value counterVariable content
 */
let startFirework = function (value:any){

    if(value.count === limit){
        WA.room.showLayer('feuerwerk_1');
        WA.room.showLayer('feuerwerk_2');
        WA.room.showLayer('feuerwerk_3');
        isFiring = true;
        WA.state.saveVariable('isFiring', isFiring);

        getRandomField();

        spreadBadge(value);
        clearPlayers();

        setTimeout(endFirework,120000);
    }
}
/**
 * giving badges to players, that triggered the Firework
 */
let spreadBadge = function (value:any){
    let name = WA.player.name;
    for(let player in value.players){
        if(value.players[player] === name){
            redeem("VP3LdPJhDk35EuSp0RinaYuCKElJiYbVRmtE6uspfqcFL7g3KT", true);
        }
    }
}

/**
 * reset all counters an layers to start game over
 */
let clearPlayers = function(){
    let counter;
    let x:any = WA.state.loadVariable('teamCounter');
    counter = x;

    counter.players = {};
    counter.count = 0;

    WA.state.saveVariable('teamCounter', counter);
    WA.room.hideLayer('TeamAnimation/AniA');
    WA.room.hideLayer('TeamAnimation/AniB');
    WA.room.hideLayer('TeamAnimation/AniC');
    WA.room.hideLayer('TeamAnimation/AniD');
    WA.room.hideLayer('TeamAnimation/AniE');
}

/**
 * hide firework layers
 */
let endFirework = function (){
    WA.room.hideLayer('feuerwerk_1');
    WA.room.hideLayer('feuerwerk_2');
    WA.room.hideLayer('feuerwerk_3');
    isFiring = false;
    WA.state.saveVariable('isFiring', isFiring);

}

/**
 * add Listeners to secret teamplay layers
 */
let setTriggers = function () {
    subscriptions.push(WA.room.onEnterLayer('TeamLayer/TeamA').subscribe(() =>{
        WA.room.showLayer('TeamAnimation/AniA');
        writeToVar('a', false);

    }))


    subscriptions.push(WA.room.onEnterLayer('TeamLayer/TeamB').subscribe(() =>{
        WA.room.showLayer('TeamAnimation/AniB');
        writeToVar('b', false);

    }))

    subscriptions.push(WA.room.onEnterLayer('TeamLayer/TeamC').subscribe(() =>{
        WA.room.showLayer('TeamAnimation/AniC');
        writeToVar('c', false);

    }))

    subscriptions.push(WA.room.onEnterLayer('TeamLayer/TeamD').subscribe(() =>{
        WA.room.showLayer('TeamAnimation/AniD');
        writeToVar('d', false);

    }))

    subscriptions.push(WA.room.onEnterLayer('TeamLayer/TeamE').subscribe(() =>{
        WA.room.showLayer('TeamAnimation/AniE');
        writeToVar('e', false);

    }))


    subscriptions.push(WA.room.onLeaveLayer('TeamLayer/TeamA').subscribe(() =>{
        WA.room.hideLayer('TeamAnimation/AniA');
        writeToVar('a', true);

    }))

    subscriptions.push(WA.room.onLeaveLayer('TeamLayer/TeamB').subscribe(() =>{
        WA.room.hideLayer('TeamAnimation/AniB');
        writeToVar('b', true);

    }))

    subscriptions.push(WA.room.onLeaveLayer('TeamLayer/TeamC').subscribe(() =>{
        WA.room.hideLayer('TeamAnimation/AniC');
        writeToVar('c', true);

    }))

    subscriptions.push(WA.room.onLeaveLayer('TeamLayer/TeamD').subscribe(() =>{
        WA.room.hideLayer('TeamAnimation/AniD');
        writeToVar('d', true);

    }))

    subscriptions.push(WA.room.onLeaveLayer('TeamLayer/TeamE').subscribe(() =>{
        WA.room.hideLayer('TeamAnimation/AniE');
        writeToVar('e', true);

    }))
}

