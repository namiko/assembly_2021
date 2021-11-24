
let limit = 5;
let isFiring:boolean;

export const initTeamPlay = function (){
    let received:any = WA.state.loadVariable('isFiring');
    isFiring = JSON.parse(received);

    if(isFiring){
        WA.room.showLayer('feuerwerk_1');
        WA.room.showLayer('feuerwerk_2');
        WA.room.showLayer('feuerwerk_3');
    }else{
        WA.room.hideLayer('feuerwerk_1');
        WA.room.hideLayer('feuerwerk_2');
        WA.room.hideLayer('feuerwerk_3');
    }

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

    WA.room.onEnterZone('tE', () =>{
        writeToVar('e', false);
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

    WA.room.onLeaveZone('tE', () =>{
        writeToVar('e', true);
    })

    WA.state.onVariableChange('teamCounter').subscribe((value: any) => {
        console.log(value);
        if(!isFiring){
            startFirework(value);
        }
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
        setTimeout(endFirework,300000);
    }
}

let endFirework = function (){
    WA.room.hideLayer('feuerwerk_1');
    WA.room.hideLayer('feuerwerk_2');
    WA.room.hideLayer('feuerwerk_3');
    isFiring = false;
    WA.state.saveVariable('isFiring', isFiring);
    let counter;
    let x:any = WA.state.loadVariable('teamCounter');
    counter = x;

    counter.players = {};
    counter.count = 0;

    WA.state.saveVariable('teamCounter', counter);

}