import {getRandomField} from "./Utilities";

let limit = 2;
let isFiring:boolean;
let currentWiped:any;

let subscriptions:any[] = [];

export const initTeamPlay = function (){
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

    setTriggers();

    WA.state.onVariableChange('teamCounter').subscribe((value: any) => {
        console.log(value);
        if(!isFiring){
            startFirework(value);
        }
    });

    WA.state.onVariableChange('wiped').subscribe((value: any) => {
        WA.room.setTiles([{x: currentWiped[0].x, y: currentWiped[0].y, tile: 0, layer: 'TeamLayer/TeamA'}]);
        WA.room.setTiles([{x: currentWiped[1].x, y: currentWiped[1].y, tile: 0, layer: 'TeamLayer/TeamB'}]);
        WA.room.setTiles([{x: currentWiped[2].x, y: currentWiped[2].y, tile: 0, layer: 'TeamLayer/TeamC'}]);
        WA.room.setTiles([{x: currentWiped[3].x, y: currentWiped[3].y, tile: 0, layer: 'TeamLayer/TeamD'}]);
        WA.room.setTiles([{x: currentWiped[4].x, y: currentWiped[4].y, tile: 0, layer: 'TeamLayer/TeamE'}]);

        currentWiped = value;


        WA.room.setTiles([{x: value[0].x, y: value[0].y, tile: 'marker', layer: 'TeamLayer/TeamA'}]);
        WA.room.setTiles([{x: value[1].x, y: value[1].y, tile: 'marker', layer: 'TeamLayer/TeamB'}]);
        WA.room.setTiles([{x: value[2].x, y: value[2].y, tile: 'marker', layer: 'TeamLayer/TeamC'}]);
        WA.room.setTiles([{x: value[3].x, y: value[3].y, tile: 'marker', layer: 'TeamLayer/TeamD'}]);
        WA.room.setTiles([{x: value[4].x, y: value[4].y, tile: 'marker', layer: 'TeamLayer/TeamE'}]);
    });
}

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

let startFirework = function (value:any){
    if(value.count === limit){
        WA.room.showLayer('feuerwerk_1');
        WA.room.showLayer('feuerwerk_2');
        WA.room.showLayer('feuerwerk_3');
        isFiring = true;
        WA.state.saveVariable('isFiring', isFiring);

        getRandomField();
        spreadBadge();
        clearPlayers();

        setTimeout(endFirework,300000);
    }
}

let spreadBadge = function (){

}

let clearPlayers = function(){
    let counter;
    let x:any = WA.state.loadVariable('teamCounter');
    counter = x;

    counter.players = {};
    counter.count = 0;

    WA.state.saveVariable('teamCounter', counter);
}

let endFirework = function (){
    WA.room.hideLayer('feuerwerk_1');
    WA.room.hideLayer('feuerwerk_2');
    WA.room.hideLayer('feuerwerk_3');
    isFiring = false;
    WA.state.saveVariable('isFiring', isFiring);

}


let setTriggers = function () {
    subscriptions.push(WA.room.onEnterLayer('TeamLayer/TeamA').subscribe((va:any) =>{
        console.log(va);
        writeToVar('a', false);

    }))


    subscriptions.push(WA.room.onEnterLayer('TeamLayer/TeamB').subscribe(() =>{
        writeToVar('b', false);

    }))

    subscriptions.push(WA.room.onEnterLayer('TeamLayer/TeamC').subscribe(() =>{
        writeToVar('c', false);

    }))

    subscriptions.push(WA.room.onEnterLayer('TeamLayer/TeamD').subscribe(() =>{
        writeToVar('d', false);

    }))

    subscriptions.push(WA.room.onEnterLayer('TeamLayer/TeamE').subscribe(() =>{
        writeToVar('e', false);

    }))


    subscriptions.push(WA.room.onLeaveLayer('TeamLayer/TeamA').subscribe(() =>{
        writeToVar('a', true);

    }))

    subscriptions.push(WA.room.onLeaveLayer('TeamLayer/TeamB').subscribe(() =>{
        writeToVar('b', true);

    }))

    subscriptions.push(WA.room.onLeaveLayer('TeamLayer/TeamC').subscribe(() =>{
        writeToVar('c', true);

    }))

    subscriptions.push(WA.room.onLeaveLayer('TeamLayer/TeamD').subscribe(() =>{
        writeToVar('d', true);

    }))

    subscriptions.push(WA.room.onLeaveLayer('TeamLayer/TeamE').subscribe(() =>{
        writeToVar('e', true);

    }))
}

