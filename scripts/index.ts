/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";
import {initTeamPlay} from "./Teamplay";
import {initInteractions} from "./Interaction";
import {initDaytimes} from "./Daytimes";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));


/**
 * Initialize other scripts
 */
WA.onInit().then(() => {
    initTeamPlay();
    initDaytimes()
    initInteractions();
});



