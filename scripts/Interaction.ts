import {Sound} from "@workadventure/iframe-api-typings/Api/iframe/Sound/Sound";

let latestSteps = new Array();
let isOnSnow = false;
let isOnWater = false;
let snowsound: Sound;
let watersound: Sound;

export const initInteractions = () => {
    snowsound = WA.sound.loadSound("assets/mp3/67243__robban87__snowstep_shortened.mp3");
	watersound = WA.sound.loadSound("assets/mp3/204035__duckduckpony__footsteps-water-light-008_shortened.mp3");
    doSound();
}


/**
 * fiddling out which step tile should be drawn where
 * @param event moveEvent of player
 */
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

/**
 * Adding tiles with foot trails on the snowy part of the map
 * @param event move event of the player
 */
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

/**
 * Playing sound , triggered by movement depending on players position
 */
let doSound = function (){
    let config = {
        volume : 0.2,
        loop : false,
        rate : 1,
        detune : 1,
        delay : 0,
        seek : 0,
        mute : false
    }

    WA.room.onEnterLayer('SnowSteps').subscribe(() =>{
        isOnSnow = true;

    })

    WA.room.onLeaveLayer('SnowSteps').subscribe(() =>{
        isOnSnow = false;

        latestSteps.forEach(function (removable){
            WA.room.setTiles([{x: removable.x, y: removable.y, tile: null, layer: 'footsteps'}])
        })
    })


    WA.room.onEnterLayer('WaterSteps').subscribe(() =>{
        isOnWater = true;

    })

    WA.room.onLeaveLayer('WaterSteps').subscribe(() =>{
        isOnWater = false;
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
        }else if(isOnWater){
			if(event.moving){
                watersound.play(config);
            }
            else{
                watersound.stop();
            }
		}

    })
}