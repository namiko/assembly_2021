/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";
import {Sound} from "@workadventure/iframe-api-typings/Api/iframe/Sound/Sound";
import {getLayersMap} from '@workadventure/scripting-api-extra';

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

let latestSteps = new Array();
let isOnSnow = false;
let snowsound: Sound;

let estimateTimeOfDay = function (){
    const hour = new Date().getUTCHours();

    if(hour>=17 || hour<=9){
        WA.room.showLayer('Daemmerung');
        WA.room.hideLayer('Feuerschimmer');
        WA.room.hideLayer('Beleuchtung');
        WA.room.hideLayer('Abend');
        WA.room.hideLayer('Nacht');
    }
    else if(hour>=20 || hour<=7){
        WA.room.showLayer('Daemmerung');
        WA.room.showLayer('Feuerschimmer');
        WA.room.showLayer('Beleuchtung');
        WA.room.showLayer('Abend');
        WA.room.hideLayer('Nacht');
    }
    else if(hour>=22 || hour<=5){
        WA.room.showLayer('Nacht');
        WA.room.showLayer('Daemmerung');
        WA.room.showLayer('Feuerschimmer');
        WA.room.showLayer('Beleuchtung');
        WA.room.showLayer('Abend');
    }
    else{
        WA.room.hideLayer('Nacht');
        WA.room.hideLayer('Daemmerung');
        WA.room.hideLayer('Feuerschimmer');
        WA.room.hideLayer('Beleuchtung');
        WA.room.hideLayer('Abend');
    }
}

let estimatePosition = function (event:any){
    let xString = 'center';
    let yString = 'center';

    let unroundedX = event.x/32;
    let unroundedY = event.y/32;

    if(!((unroundedX+"").indexOf('.')<0)){
        let x = (unroundedX+"").split(".")[1][0];
        let pX:number = +x;
        if(pX <= 3){
            xString = "left";
        }
        if(pX > 7){
            xString = 'right'
        }
    }

    if(!((unroundedY+"").indexOf('.')<0)){
        let y = (unroundedY+"").split(".")[1][0];
        let pY:number = +y;
        if(pY <= 3){
            yString = "bottom";
        }
        if(pY > 6){
            yString = 'ceil'
        }
    }


    return {vertical: xString, horizontal: yString};
}

let drawSteps = function (event:any){

    let positions = estimatePosition(event);

    let x = Math.trunc(event.x/32);
    let y = Math.round(event.y/32);
    let p = positions.vertical;

    if(event.direction === 'left' || event.direction === 'right'){
        p = positions.horizontal;
    }

    let d = 'step_' + event.direction + '_' + p;

    WA.room.setTiles([{x: x, y: y, tile: d, layer: 'footsteps'}]);


    if(latestSteps.length == 3){
        let removable = latestSteps.shift();
        WA.room.setTiles([{x: removable.x, y: removable.y, tile: null, layer: 'footsteps'}])
    }

    latestSteps.push({x: x, y: y});
}

let doSound = function (){
    let config = {
        volume : 0.5,
        loop : false,
        rate : 1,
        detune : 1,
        delay : 0,
        seek : 0,
        mute : false
    }

    WA.room.onEnterZone('SnowSteps', () =>{
        isOnSnow = true;
    })

    WA.room.onLeaveZone('SnowSteps', () =>{
        isOnSnow = false;

        latestSteps.forEach(function (removable){
            WA.room.setTiles([{x: removable.x, y: removable.y, tile: null, layer: 'footsteps'}])
        })
    })


    WA.player.onPlayerMove(event => {
        if(isOnSnow){
            if(event.moving){
                snowsound.play(config);
                drawSteps(event);
            }
            else{
                snowsound.stop();
            }
        }

    })
}

let teamPlay = function (){
    WA.room.onEnterZone('tA', () =>{
        writeToVar('a', false);
    })

    WA.room.onEnterZone('tB', () =>{
        writeToVar('b', false);
    })


    WA.room.onEnterZone('tC', () =>{
        writeToVar('c', false);
    })

    WA.room.onEnterZone('tD', () =>{
        writeToVar('d', false);
    })

    WA.room.onLeaveZone('tA', () =>{
        writeToVar('a', true);
    })

    WA.room.onLeaveZone('tB', () =>{
        writeToVar('b', true);
    })


    WA.room.onLeaveZone('tC', () =>{
        writeToVar('c', true);
    })

    WA.room.onLeaveZone('tD', () =>{
        writeToVar('d', true);
    })
}

let writeToVar = function(valName:string, del:boolean){
    let value = WA.player.name;

    let counter;
    let x:any = WA.state.loadVariable('teamCounter');
    if(typeof x === 'string' ){
        counter = JSON.parse(x);
        counter['count'] = 0
    }else{
        counter = x;
    }

    let currentPlayer = counter[valName];

    if(currentPlayer === value && del){
            counter[valName] = null;
            counter.count = counter.count - 1;
    }

    if(!currentPlayer){
        counter[valName] = value;
        counter.count = counter.count + 1;
    }



    WA.state.saveVariable('teamCounter', counter);
}




WA.onInit().then(() => {
    estimateTimeOfDay();
    setInterval(estimateTimeOfDay,600000);

    teamPlay();
    WA.state.onVariableChange('teamCounter').subscribe((value: any) => {
        if(value.count === 4){
            WA.room.showLayer('feuerwerk_1');
            WA.room.showLayer('feuerwerk_2');
            WA.room.showLayer('feuerwerk_3');

        }
    });


    snowsound = WA.sound.loadSound("assets/mp3/67243__robban87__snowstep_shortened.mp3");
    doSound();
});



