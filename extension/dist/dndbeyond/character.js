var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Character {
    constructor() {
        this.updateInfo();
        this.activateQuickRolls();
    }
    updateInfo() {
        if (!this.m_Name) {
            this.m_Name = $(".ddbc-character-tidbits__heading h1").text();
        }
        if (!this.m_Race) {
            this.m_Race = $(".ddbc-character-summary__race").text();
        }
        if (!this.m_Classes) {
            const jClasses = $(".ddbc-character-summary__classes");
            this.m_Classes = new Map();
            if (jClasses.length > 0) {
                const classes = jClasses.text().split(" / ");
                for (let class_ of classes) {
                    const parts = class_.split(" ");
                    const name = parts.slice(0, -1).join(" ");
                    const level = parts.slice(-1)[0];
                    this.m_Classes.set(name, parseInt(level));
                }
            }
        }
        let abilities = $(".ct-quick-info__ability,.ddbc-quick-info__ability");
        if (abilities.length == 0)
            abilities = $(".ct-main-mobile__ability,.ddbc-main-mobile__ability");
        if (abilities.length == 0)
            abilities = $(".ct-main-tablet__ability,.ddbc-main-tablet__ability");
        if (abilities.length > 0)
            this.m_Abilities = [];
        for (let ability of abilities.toArray()) {
            const name = $(ability).find(".ct-ability-summary__heading .ct-ability-summary__label,.ddbc-ability-summary__heading .ddbc-ability-summary__label").text();
            const abbr = $(ability).find(".ct-ability-summary__heading .ct-ability-summary__abbr,.ddbc-ability-summary__heading .ddbc-ability-summary__abbr").text().toUpperCase();
            let stringModifier = $(ability).find(".ct-ability-summary__primary .ct-signed-number,.ddbc-ability-summary__primary .ddbc-signed-number").text();
            let stringValue = $(ability).find(".ct-ability-summary__secondary,.ddbc-ability-summary__secondary").text();
            if (stringModifier == "") {
                stringModifier = $(ability).find(".ct-ability-summary__secondary .ct-signed-number,.ddbc-ability-summary__secondary .ddbc-signed-number").text();
                stringValue = $(ability).find(".ct-ability-summary__primary,.ddbc-ability-summary__primary").text();
            }
            let value = parseInt(stringValue);
            let modifier = parseInt(stringModifier);
            this.m_Abilities.push({ name, abbr, value, modifier });
        }
    }
    activateQuickRolls() {
        const skills = $(".ct-skills .ct-skills__list .ct-skills__col--modifier,.ddbc-skills .ddbc-skills__list .ddbc-skills__col--modifier");
        for (let skill of skills.toArray()) {
            this.activeToolTipListener($(skill), (element) => {
                const name = element.closest(".ct-skills__item,.ddbc-skills__item")
                    .find(".ct-skills__col--skill,.ddbc-skills__col--skill")
                    .trigger('click').text();
                let pane;
                let paneClass;
                // If same skill, clicking will be a noop && it won't modify the document;
                for (paneClass of ["ct-skill-pane", "ct-custom-skill-pane"]) {
                    pane = $("." + paneClass);
                    if (pane.length > 0)
                        break;
                }
                const paneName = pane.find(".ct-sidebar__heading ." + paneClass + "__header-name").text();
                if (name == paneName)
                    this.execute(paneClass);
            });
        }
    }
    activeToolTipListener(element, callback) {
        element.on('mouseenter', (e) => {
            element.off('click').on('click', (e) => {
                if ($(e.currentTarget).hasClass('integrated-dice__container') || $(e.currentTarget).find(".integrated-dice__container").length > 0) {
                    e.stopPropagation();
                }
                callback(element);
            });
        });
    }
    execute(paneClass) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Executing panel: " + paneClass);
            try {
                if (["ct-skill-pane", "ct-custom-skill-pane"].includes(paneClass))
                    yield this.rollSkillCheck(paneClass);
            }
            finally {
            }
        });
    }
    rollSkillCheck(paneClass) {
        return __awaiter(this, void 0, void 0, function* () {
            const skillName = $("." + paneClass + "__header-name").text();
            let ability = $("." + paneClass + "__header-ability").text();
            let modifier = $("." + paneClass + "__header-modifier").text();
            const proficiency = $("." + paneClass + "__header-icon .ct-tooltip,." + paneClass + "__header-icon .ddbc-tooltip").attr("data-original-title");
            console.log("Skill " + skillName + "(" + ability + ") : " + modifier);
            const rollProperties = { skill: skillName, ability, modifier, proficiency };
            return this.sendRoll("skill", "1d20" + modifier, rollProperties);
        });
    }
    sendRoll(rollType, fallback, args) {
        let message = "/roll " + "1d20" + args.modifier + " " + args.skill;
        document.dispatchEvent(new CustomEvent("DND_Roll", { detail: { message: message } }));
    }
}
