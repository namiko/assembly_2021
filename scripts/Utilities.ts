import {getLayersMap} from "@workadventure/scripting-api-extra/dist";
import {ITiledMapTileLayer} from "@workadventure/tiled-map-type-guard/dist/ITiledMapTileLayer";


/**
 * Getting the area where it is possible for players to move
 */
let getUsedFields = async function (): Promise<any>{
    let fieldData = {
      width:0,
      accessableFields: new Array<number>()
    };

    let accessableFields:Array<number> = [];

    let x = await getLayersMap();
    let y = x.get('begehbar') as ITiledMapTileLayer;

    fieldData.width = y.width;

    for(let i = 0; i < y.data.length; i++){
        if(y.data[i] != 0){
            accessableFields.push(i);
        }
    }

    fieldData.accessableFields = accessableFields;
    return fieldData;

}

/**
 * Getting some random fields of the possible movement fields to relocate firework triggers
 */
export const getRandomField =  function () {
    getUsedFields().then((fieldData) => {
        let newFields: any = [];

        let shuffled = fieldData.accessableFields
            .map((value: any) => ({ value, sort: Math.random() }))
            .sort((a: { sort: number; }, b: { sort: number; }) => a.sort - b.sort)
            .map(({ value }:any) => value)

        let selected = shuffled.slice(0, 5) as Array<number>;

        selected.forEach(function (item) {
            let row = Math.floor(item / fieldData.width);
            let column = item % fieldData.width;

            newFields.push({"x":column,"y":row});
        })

        WA.state.saveVariable('wiped', newFields);
    });
}