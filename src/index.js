'use strict';
const APP_ID = "08e1cabe-2583-40d3-afb8-3f9203cf8e93";
const Alexa = require('alexa-sdk');
const Utils = require('./Utils');
const utils = new Utils('dev');

function removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        let name = utils.name(arr[i])[1];
        if(unique_array.indexOf(name) == -1){
            unique_array.push(name)
        }
    }
    return unique_array
}

function result2Speech(speech, initial_size){
    if ( speech.length == 1 )
        return initial_size + " livelli di " + speech[0];
    speech[speech.length-1] = " e " + speech[speech.length-1];
    return speech.join(', ');
}

function delegateSlotCollection(func) {
    console.log("In delegateSlotCollection");
    console.log("Current dialogState: " + this.event.request.dialogState);

    if(func) {
        if (func(this.event)) {
            this.event.request.dialogState = "COMPLETED";
            return this.event.request.intent.slots;
        }
    }

    if (this.event.request.dialogState === "STARTED") {
        console.log("In STARTED");
        console.log(JSON.stringify(this.event));
        var updatedIntent = this.event.request.intent;
        this.emit(":delegate", updatedIntent);
    } else if (this.event.request.dialogState !== "COMPLETED") {
        console.log("in not completed");
        this.emit(":delegate", updatedIntent);
    } else {
        console.log("In COMPLETED");
        return this.event.request.intent.slots;
    }
    return null;
}

function getSlotValues (filledSlots) {
    //given event.request.intent.slots, a slots values object so you have
    //what synonym the person said - .synonym
    //what that resolved to - .resolved
    //and if it's a word that is in your slot values - .isValidated
    let slotValues = {};

    console.log('The filled slots: ' + JSON.stringify(filledSlots));
    Object.keys(filledSlots).forEach(function(item) {

    var name = filledSlots[item].name;

    if(filledSlots[item]&&
        filledSlots[item].resolutions &&
        filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
        filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
        filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code ) {

        switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
            case "ER_SUCCESS_MATCH":
                slotValues[name] = {
                    "synonym": filledSlots[item].value,
                    "resolved": filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
                    "id": filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.id,
                    "isValidated": true
                };
                break;
            case "ER_SUCCESS_NO_MATCH":
                slotValues[name] = {
                    "synonym": filledSlots[item].value,
                    "resolved": filledSlots[item].value,
                    "isValidated":false
                };
                break;
            }
        } else {
            slotValues[name] = {
                "synonym": filledSlots[item].value,
                "resolved": filledSlots[item].value,
                "isValidated": false
            };
        }
    },this);
    return slotValues;
}

const combination = function(){
    const intentObj = this.event.request.intent;
    const resolutions_type = intentObj.slots.Tipologia.resolutions;
    const resolutions_color_name = intentObj.slots.Colore.resolutions;
    const resolutions_red = intentObj.slots.Red.resolutions;
    const resolutions_green = intentObj.slots.Green.resolutions;
    const resolutions_blue = intentObj.slots.Blue.resolutions;

    let color_hex, color_name;
    try {
        if ( resolutions_red && resolutions_green && resolutions_blue ){
            let R = resolutions_red.resolutionsPerAuthority[0].values[0].value.name;
            let G = resolutions_green.resolutionsPerAuthority[0].values[0].value.name;
            let B = resolutions_blue.resolutionsPerAuthority[0].values[0].value.name;
            color_hex = utils.rgb2hex(R,G,B);
        }else if ( resolutions_color_name ){
          color_name = resolutions_color_name.resolutionsPerAuthority[0].values[0].value.name;
          color_hex = resolutions_color_name.resolutionsPerAuthority[0].values[0].value.id;
          console.log()
          if ( color_hex == undefined ) throw Error ('color_hex undefined');
        }else{
            color_hex = utils.hex();
            while ( color_hex == '000000' ) color_hex = utils.hex();
        }
    }
    catch(error) {
        console.log(error);
        this.attributes.speechOutput = this.t('COLOR_UNKNOWN');
        this.emit(':tell', this.attributes.speechOutput);
    }

    let types = ['complementary', 'splitComplementary', 'triadic', 'clash', 'tetradic', 'fourTone', 'fiveTone', 'sixTone', 'neutral', 'analogous'];
    let input_type = '';
    try {
        if ( resolutions_type ){
            input_type = resolutions_type.resolutionsPerAuthority[0].values[0].value.name;
        }else{
            let val = utils.getRandomInt(0, types.length-1);
            input_type = types[val];
        }
    }catch(error){
        this.attributes.speechOutput = this.t('COMBINATION_UNKNOWN');
        this.emit(':tell', this.attributes.speechOutput);
    }

    if ( resolutions_type ){
        input_type = resolutions_type.resolutionsPerAuthority[0].values[0].value.name;
    }else{
        let val = utils.getRandomInt(0, types.length-1);
        input_type = types[val];
    }
    let cardTitle =  this.t(input_type);
    switch(input_type){
        case 'splitComplementary':
            input_type = input_type + ['', 'CW', 'CCW'][utils.getRandomInt(0, 2)];
            break;
        case 'fourTone':
            input_type = input_type + ['CW', 'CCW'][utils.getRandomInt(0, 1)];
            break;
        case 'fiveTone':
            input_type = input_type + ['A', 'B', 'C', 'D', 'E', 'F'][utils.getRandomInt(0, 1)];
            break;
        case 'sixTone':
            input_type = input_type + ['CW', 'CCW'][utils.getRandomInt(0, 1)];
            break;
        default:
            input_type = input_type;
    }

    let result = utils.harmonize(color_hex, input_type);
    let initial_size = result.length;
    let speech = removeDuplicates(result);
    let speechOutput = result2Speech(speech, initial_size);

    this.attributes.speechOutput = this.t('COMBINATION', speechOutput);
    let self = this;
    utils.hex2png(result, function(imageObj){
            self.emit(':tellWithCard', self.attributes.speechOutput, cardTitle, self.attributes.speechOutput, imageObj);
    });
}


const generatecolor = function(){
    let filledSlots;
    try {
        filledSlots = delegateSlotCollection.call(this, function(event) {
            let result = false;
            let slots = event.request.intent.slots;

            if(slots.Mod.resolutions){
                slots.Mod.value = slots.Mod.resolutions.resolutionsPerAuthority[0].values[0].value.name;
                result = true;
            }

            return result;
        });
    }catch(error){
        this.attributes.speechOutput = this.t('DEFAULT_ERROR');
        this.emit(':tell', this.attributes.speechOutput);
    }
    if (!filledSlots) {return;}
    let slotValues = getSlotValues (filledSlots);
    if (!slotValues.Mod) {return;}

    console.log(slotValues);
    let self = this;
    if ( slotValues.Mod.resolved == 'random'){
        let colors = utils.getNames();
        let index = utils.getRandomInt(0, colors.length-1);
        let color_hex = colors[index][0].replace("#","");
        let color_name = colors[index][1];
        let articolo = color_name.charAt(0).match(/[aeiou]/i) ? ' l\'' : ' il ';
        self.attributes.speechOutput = self.t('COLOR_MESSAGE', articolo + color_name);
        let cardTitle = self.t('RANDOM_TITLE');
        utils.hex2png(color_hex, function(imageObj){
                self.emit(':tellWithCard', self.attributes.speechOutput, cardTitle, self.attributes.speechOutput, imageObj);
        });
    }else if ( slotValues.Mod.resolved == 'starred'){
        const { userId } = this.event.session.user;
        utils.listColorDB(userId, function(colors){
            if ( colors.length == 0 ){
                self.attributes.speechOutput = self.t('NO_STARRED_COLOR_MESSAGE');
                self.emit(':tell', self.attributes.speechOutput);
            }else{
                console.log(colors);
                let index = utils.getRandomInt(0, colors.length-1);
                let color_hex = colors[index][0].replace("#","");
                let color_name = colors[index][1];
                let articolo = color_name.charAt(0).match(/[aeiou]/i) ? ' l\'' : ' il ';
                self.attributes.speechOutput = self.t('COLOR_MESSAGE', articolo + color_name);
                let cardTitle = self.t('STARRED_TITLE');
                utils.hex2png(color_hex, function(imageObj){
                    self.emit(':tellWithCard', self.attributes.speechOutput, cardTitle, self.attributes.speechOutput, imageObj);
                });
            }
        });
    }else{
        this.event.request.intent.slots = {
                                            Mod: {
                                                name: "Mod",
                                                confirmationStatus: "NONE"
                                            }
                                        };
        this.event.request.dialogState = "STARTED";
        console.log("In ELSE STARTED");
        console.log(JSON.stringify(this.event));
        var updatedIntent = this.event.request.intent;
        this.emit(":delegate", updatedIntent);
    }
}

const removecolor = function(){
    let filledSlots;
    try {
        filledSlots = delegateSlotCollection.call(this, function(event) {
            let result = false;
            let slots = event.request.intent.slots;

            if(slots.Colore.resolutions){
                slots.Colore.value = slots.Colore.resolutions.resolutionsPerAuthority[0].values[0].value.name;
            }

            if(slots.Colore.resolutions &&  slots.Colore.confirmationStatus == "CONFIRMED") {
                result = true;
            }
            return result;
        });
    }catch(error){
        this.attributes.speechOutput = this.t('DEFAULT_ERROR');
        this.emit(':tell', this.attributes.speechOutput);
    }
    if (!filledSlots) {return;}

    let slotValues = getSlotValues (filledSlots);
    if ( slotValues.Colore.isValidated ){
        const name = slotValues.Colore.resolved;
        const { userId } = this.event.session.user;
        let self = this;
        utils.deleteColorDB(userId, name, function(){
            self.attributes.speechOutput = self.t('DELETE_SUCCESS', name, name);
            self.emit(':tell', self.attributes.speechOutput);
        }, function(){
            self.attributes.speechOutput = self.t('DELETE_FAIL', name);
            self.emit(':tell', self.attributes.speechOutput);
        })
    }else{
        this.attributes.speechOutput = this.t('DEFAULT_ERROR');
        console.log(this.attributes.speechOutput);
        this.emit(':tell', this.attributes.speechOutput);
    }
}

const addcolor = function(){
    let filledSlots;
    try {
        filledSlots = delegateSlotCollection.call(this, function(event) {
            let result = false;
            let slots = event.request.intent.slots;

            if(slots.Colore.resolutions){
                slots.Colore.value = slots.Colore.resolutions.resolutionsPerAuthority[0].values[0].value.name;
            }

            if(slots.Colore.resolutions &&  slots.Colore.confirmationStatus == "CONFIRMED") {
                result = true;
            }
            return result;
        });
    }catch(error){
        this.attributes.speechOutput = this.t('DEFAULT_ERROR');
        this.emit(':tell', this.attributes.speechOutput);
    }
    if (!filledSlots) {return;}

    let slotValues = getSlotValues (filledSlots);
    const { userId } = this.event.session.user;
    if ( slotValues.Colore.isValidated ){
        const name = slotValues.Colore.resolved;
        const hex = slotValues.Colore.id;
        let self = this;
        utils.insertColorDB(userId, name, hex, function(){
            console.log('Add item succeeded');
            self.attributes.speechOutput = self.t('ADD_SUCCESS', name, name);
            self.emit(':tell', self.attributes.speechOutput);
        }, function(){
            self.attributes.speechOutput = self.t('ADD_FAIL', name);
            self.emit(':tell', self.attributes.speechOutput);
        })
    }else{
        this.attributes.speechOutput = this.t('DEFAULT_ERROR');
        console.log(this.attributes.speechOutput);
        this.emit(':tell', this.attributes.speechOutput);
    }
}

const starredlist = function(){
    const { userId } = this.event.session.user;
    let self = this;
    utils.listColorDB(userId, function(colors){
        if ( colors.length == 0 ){
            self.attributes.speechOutput = self.t('NO_STARRED_COLOR_MESSAGE');
            self.emit(':tell', self.attributes.speechOutput);
        }else{
            let names = [];
            colors.forEach(function(item) {
                names.push(item[1]);
            });
            let speechOutput = result2Speech(names, 0);
            self.attributes.speechOutput = self.t('STARRED_COLOR_MESSAGE', speechOutput);
            self.emit(':tell', self.attributes.speechOutput);
        }
    });
}

const skill_name = 'Dea Iride';
const languageStrings = {
    'it-IT': {
        translation: {
            ARTICLE: function(name){name.charAt(0).match(/[aeiou]/i) ? ' l\'' : ' il ';},
            SKILL_NAME: skill_name,
            HELLO: 'Ciao, sono la '+skill_name+', messaggera delle divinità, e personificazione dell\'arcobaleno. Chiedimi di generare un colore, oppure aiuto, per iniziare',
            COLOR_UNKNOWN: 'La '+skill_name +' non conosce questo colore. Prova a ripetere specificando la codifica Rosso, Verde e Blu. Ad esempio puoi dire, Alexa, Chiedi a '+skill_name+' Genera una combinazione complementare con il 255 0 0 <amazon:effect name="whispered">Questo strano codice è il Rosso </amazon:effect> oppure, Alexa, chiedi a '+skill_name+' genera una combinazione 0 0 255 casuale <amazon:effect name="whispered">Nel caso tu voglia una combinazione casuale con il Blu</amazon:effect> Chiaro, no?',
            COMBINATION_UNKNOWN: 'La '+skill_name +' conosce soltanto le combinazioni di colori: Complementari, Complementari e Divisi, Triadico, Clash, Tetradico, 4 Toni, 5 Toni, 6 Toni, Neutri, Analoghi.',
            IDNU: 'Non ho capito',
            COLOR_MESSAGE: 'La '+skill_name +' ti consiglia, %s .',
            COMBINATION: 'La '+skill_name +' Crede che %s, siano perfetti, insieme.',
            HELP_MESSAGE: 'Ciao, solo la '+skill_name+'. Puoi generare un colore dicendo: Alexa, Chiedi a '+skill_name+' di generare un colore, oppure, Alexa, Chiedi a '+skill_name+' Genera una combinazione casuale. '+skill_name+' può anche salvare i tuoi colori preferiti, basta dire: Alexa, Chiedi a '+skill_name+' aggiungi un colore preferito. Ora, come posso aiutarti?',
            HELP_REPROMT: 'La '+skill_name +' può suggerire un singolo colore casuale o preferito, oppure combinazioni casuali. Le combinazioni di colori supportate sono: Complementari, Complementari e Divisi, Triadico, Clash, Tetradico, 4 Toni, 5 Toni, 6 Toni, Neutri, Analoghi. Puoi dire frasi come: Alexa, Chiedi a '+skill_name+' di generare una combinazione complementare con il Rosso. Ora, come posso aiutarti?',
            STOP_MESSAGE: 'La '+skill_name +' ti saluta!',
            STARRED_COLOR_MESSAGE: 'I tuoi colori preferiti sono: %s . Puoi sceglierne uno casuale dicendo: Alexa, Chiedi a '+skill_name+' un colore',
            NO_STARRED_COLOR_MESSAGE: 'Non hai ancora selezionato dei colori preferiti. Puoi aggiungerne uno dicendo: Alexa, chiedi a '+skill_name+' di aggiungere il Rosso ai miei colori preferiti.',
            ADD_SUCCESS: 'Ok, il colore %s è stato aggiunto! Puoi cancellarlo dicendo: Alexa, Chiedi a '+skill_name+' rimuovi il %s',
            ADD_FAIL: 'Il %s è già in lista! Puoi sapere quali colori sono in lista dicendo: Alexa, Chiedi a '+skill_name+' quali sono i miei colori preferiti',
            DELETE_SUCCESS: 'Ok, il colore %s è stato rimosso! Puoi inserirlo nuovamente dicendo: Alexa, Chiedi a '+skill_name+' aggiungi il colore %s alla lista preferiti',
            DELETE_FAIL: 'Il colore %s non è in lista! Puoi sapere quali colori sono in lista dicendo: Alexa, Chiedi a '+skill_name+' quali sono i miei colori preferiti',
            STARRED_TITLE: 'Colore Preferito',
            RANDOM_TITLE:  'Colore Casuale',
            DEFAULT_ERROR: 'Non conosco questo colore!',
            complementary: 'Combinazione Complementare',
            splitComplementary: 'Combinazione Complementare x2',
            triadic: 'Combinazione Triadica',
            clash: 'Combinazione Clash',
            tetradic: 'Combinazione Tetradica',
            fourTone: 'Combinazione x4 Toni',
            fiveTone: 'Combinazione x5 Toni',
            sixTone: 'Combinazione x6 Toni',
            neutral: 'Combinazione Neutra',
            analogous: 'Combinazione Analoga'
        }
    }
};

const handlers = {
    'LaunchRequest': function (){
        this.emit(':ask', this.t('HELLO'));
    },
    'RandomColorIntent': function () {
        generatecolor.apply(this);
    },
    'GenerateCombinationIntent': function (){
        combination.apply(this);
    },
    'AddColorIntent': function (){
        addcolor.apply(this);
    },
    'ResetColorsIntent': function (){
        removecolor.apply(this);
    },
    'StarredColorListIntent': function (){
        starredlist.apply(this);
    },
    'AMAZON.HelpIntent': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'Unhandled' : function () {
        this.emit(':tell', this.t('IDNU'));
    }
};

exports.handler = (event, context) => {
    console.log(event);
    const alexa = Alexa.handler(event, context);
    alexa.appId = "amzn1.ask.skill." + APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
