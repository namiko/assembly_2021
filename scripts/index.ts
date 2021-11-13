/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

var latestSteps = new Array();

WA.onInit().then(() => {
    let snowsound = WA.sound.loadSound("assets/mp3/67243__robban87__snowstep_shortened.mp3");
    let config = {
        volume : 0.5,
        loop : false,
        rate : 1,
        detune : 1,
        delay : 0,
        seek : 0,
        mute : false
    }

    let isOnSnow = false;
    WA.room.onEnterZone('SnowSteps', () =>{
        isOnSnow = true;
        // WA.room.setTiles([{x: 2586, y: 1412, tile: 'step_up', layer: 'footsteps'}]);
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
                let x = Math.round(event.x/32);
                let y = Math.round(event.y/32);
                let d = 'step_' + event.direction;
                console.log(event, x, y, d);

                WA.room.setTiles([{x: x, y: y, tile: d, layer: 'footsteps'}]);


                if(latestSteps.length == 3){
                    let removable = latestSteps.shift();
                    WA.room.setTiles([{x: removable.x, y: removable.y, tile: null, layer: 'footsteps'}])
                }

                latestSteps.push({x: x, y: y});

            }
            else{
                snowsound.stop();
            }
        }

    })


});



