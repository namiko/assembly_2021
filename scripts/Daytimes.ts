
export const initDaytimes = () => {
    estimateTimeOfDay();
    setInterval(estimateTimeOfDay,600000);
}

export const estimateTimeOfDay = function (){
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

