let isOnPCB = false;
let isShocked = false;
let showPCB = false;
let showPCBLED = false;

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
        if(showPCB){isShocked = true;}
	WA.room.showLayer('shock');
    })

    WA.room.onLeaveLayer('shockArea').subscribe(() =>{
	WA.room.hideLayer('shock');
    })

    WA.room.onEnterLayer('solderStation').subscribe(() =>{
        if(!showPCB && !showPCBLED){
	    showPCB = true;
	    showPCBLED = false;
	    WA.room.showLayer('hat');
	    WA.room.hideLayer('hat_glow');
	}
        if(showPCB && isShocked){
	    showPCB = false;
	    showPCBLED = true;
	    WA.room.hideLayer('hat');
	    WA.room.showLayer('hat_glow');
	}
    })

}