console.log("dnd character injected!");
import { Character } from './dndbeyond/character.js';
import { waitForElm } from './dndbeyond/base.js';
waitForElm(".ddbc-character-tidbits__heading").then((elem) => {
    let character = new Character();
    console.log(character);
});
