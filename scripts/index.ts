/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";
import {Sound} from "@workadventure/iframe-api-typings/Api/iframe/Sound/Sound";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

let latestSteps = new Array();
let isOnSnow = false;
let snowsound: Sound;

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



WA.onInit().then(() => {
    snowsound = WA.sound.loadSound("assets/mp3/67243__robban87__snowstep_shortened.mp3");
    doSound();
});



