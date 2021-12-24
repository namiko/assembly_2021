let isOnPCB = false;
let isShocked = false;
let showPCB = false;
let showPCBLED = false;
let badgePCB = false;
let resetQuest = false;
let pcbTime = new Date().getTime();
let shockTime = new Date().getTime();
let timePassed = new Date().getTime();
let questTimeout = 3000; /* in milliseconds */

export const initMiniquest = () => {
    WA.room.hideLayer('hat');
    WA.room.hideLayer('hat_glow');
    WA.room.hideLayer('shock');
    doQuest();
}

/**
 * mini-quest PCB solder station:
 * step 1: walk to solder-station to show blank PCB
 * step 2: walk over cable in water to get shocked and show PCB with glowing LEDs
 * step 3: walk back to solder-station to receive badge
 */

let doQuest = function (){

    WA.room.onEnterLayer('shockArea').subscribe(() =>{
	WA.room.showLayer('shock');
        if(showPCB){
	    resetQuest = false;
	    isShocked = true;
	    shockTime = new Date().getTime();
	    showPCB = false;
	    showPCBLED = true;
	    WA.room.hideLayer('hat');
	    WA.room.showLayer('hat_glow');
	}
    })
    WA.room.onLeaveLayer('shockArea').subscribe(() =>{
	WA.room.hideLayer('shock');
	shockTime = new Date().getTime();
    })

    WA.room.onEnterLayer('solderStation').subscribe(() =>{
        if(!showPCB && !showPCBLED){
	    pcbTime = new Date().getTime();
	    resetQuest = false;
	    showPCB = true;
	    showPCBLED = false;
	    WA.room.showLayer('hat');
	    WA.room.hideLayer('hat_glow');
	}
        if(showPCBLED){
	    resetQuest = false;
    	    badgePCB = true;
    	    /* ToDo: give badge */
	}
    })

    WA.player.onPlayerMove(event => {
	timePassed = (new Date().getTime()) - pcbTime;
	if(timePassed>=questTimeout && showPCB){resetQuest=true;}
	timePassed = (new Date().getTime()) - shockTime;
	if(timePassed>=questTimeout && showPCBLED && !badgePCB){resetQuest=true;}
	if(resetQuest){
	    showPCB = false;
	    showPCBLED = false;
	    WA.room.hideLayer('hat');
	    WA.room.hideLayer('hat_glow');
    	}
    })
}