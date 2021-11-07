/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

var currentPopup: any = undefined;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();


WA.onInit().then(() => {
    console.log('Current player name: ', WA.player.name);
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
    })

    WA.room.onLeaveZone('SnowSteps', () =>{
        isOnSnow = false;
    })


    WA.player.onPlayerMove(event => {
        if(isOnSnow){
            if(event.moving){
                snowsound.play(config);
            }
            else{
                snowsound.stop();
            }
        }

    })


});



