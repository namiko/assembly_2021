
export const initDaytimes = () => {
    estimateTimeOfDay();
    setInterval(estimateTimeOfDay,600000);
}

/**
 * showing/hiding layers dependend on current time
 */
export const estimateTimeOfDay = function (){
    const hour = new Date().getUTCHours();

    WA.room.hideLayer('Nacht');
    WA.room.hideLayer('Daemmerung');
    WA.room.hideLayer('Feuerschimmer');
    WA.room.hideLayer('Beleuchtung');
    WA.room.hideLayer('Abend');

    if(hour>=15 || hour<=9){
        WA.room.showLayer('Daemmerung');
        WA.room.hideLayer('Feuerschimmer');
        WA.room.hideLayer('Beleuchtung');
        WA.room.hideLayer('Abend');
        WA.room.hideLayer('Nacht');
    }

    if(hour>=18 || hour<=7){
        WA.room.showLayer('Daemmerung');
        WA.room.showLayer('Feuerschimmer');
        WA.room.showLayer('Beleuchtung');
        WA.room.showLayer('Abend');
        WA.room.hideLayer('Nacht');
    }

    if(hour>=20 || hour<=5){
        WA.room.showLayer('Nacht');
        WA.room.showLayer('Daemmerung');
        WA.room.showLayer('Feuerschimmer');
        WA.room.showLayer('Beleuchtung');
        WA.room.showLayer('Abend');
    }
}

