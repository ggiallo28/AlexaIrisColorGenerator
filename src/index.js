'use strict';
const APP_ID = "08e1cabe-2583-40d3-afb8-3f9203cf8e93";
const Alexa = require('alexa-sdk');
const Utils = require('./Utils');
const utils = new Utils('dev');

function removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
}

function result2Speech(result, initial_size){
    let speechOutput = utils.name(result[0])[1];
    for (var i=1; i<result.length-1; i++){
        speechOutput = speechOutput+', '+utils.name(result[i])[1];
    }
    speechOutput = result.length == 1 ? initial_size + " livelli di " + speechOutput : speechOutput+', e '+utils.name(result[result.length-1])[1];
    return speechOutput;
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
    result = removeDuplicates(result);
    let speechOutput = result2Speech(result, initial_size);

    this.attributes.speechOutput = this.t('COMBINATION', speechOutput);
    let cardTitle = input_type;
    let self = this;
    utils.hex2png(result, function(imageObj){
            self.emit(':tellWithCard', self.attributes.speechOutput, cardTitle, self.attributes.speechOutput, imageObj);
    });
}

const generatecolor = function(){
    let color_hex = utils.hex();
    let color_name = utils.name(color_hex);
    let articolo = color_name[1].charAt(0).match(/[aeiou]/i) ? ' l\'' : ' il ';
    this.attributes.speechOutput = this.t('COLOR_MESSAGE', articolo + color_name[1]);
    let cardTitle = color_name[1];
    let self = this;
    utils.hex2png(color_hex, function(imageObj){
            self.emit(':tellWithCard', self.attributes.speechOutput, cardTitle, self.attributes.speechOutput, imageObj);
    });
}

const skill_name = 'Iris';
const languageStrings = {
    'it-IT': {
        translation: {
            ARTICLE: function(name){name.charAt(0).match(/[aeiou]/i) ? ' l\'' : ' il ';},
            SKILL_NAME: skill_name,
            COLOR_UNKNOWN: skill_name +' non conosce questo colore. Prova a ripetere specificando la codifica Rosso, Verde e Blu. Ad esempio puoi dire, Alexa, Chiedi a '+skill_name+' Genera una combinazione complementare con il 255 0 0 <amazon:effect name="whispered">Questo strano codice è il Rosso </amazon:effect> oppure, Alexa, chiedi a '+skill_name+' genera una combinazione 0 0 255 casuale <amazon:effect name="whispered">Nel caso tu voglia una combinazione casuale con il Blu</amazon:effect> Chiaro, no?',
            COMBINATION_UNKNOWN: skill_name +' supporta soltanto le combinazioni di colori: Complementari, Complementari e Divisi, Triadico, Clash, Tetradico, 4 Toni, 5 Toni, 6 Toni, Neutri, Analoghi.',
            IDNU: 'Non ho capito',
            COLOR_MESSAGE: skill_name +' ti consiglia, %s .',
            COMBINATION: skill_name +' Crede che %s, siano perfetti, insieme.',
            HELP_MESSAGE: 'Ciao, ti parlo a nome di '+skill_name+'. Puoi generare un colore dicendo: Alexa, Chiedi a '+skill_name+' di generare un colore casuale, oppure, Alexa, Chiedi a '+skill_name+' Genera una combinazione casuale. Ora, come posso aiutarti?',
            HELP_REPROMT: skill_name +' può generare un singolo colore, oppure combinazioni casuali. Le combinazioni di colori supportate sono: Complementari, Complementari e Divisi, Triadico, Clash, Tetradico, 4 Toni, 5 Toni, 6 Toni, Neutri, Analoghi. Puoi dire frasi come: Alexa, Chiedi a '+skill_name+' di generare una combinazione complementare con il Rosso. Ora, come posso aiutarti?',
            STOP_MESSAGE: skill_name +' ti saluta!'
        }
    }
};

const handlers = {
    'RandomColorIntent': function () {
        generatecolor.apply(this);
    },
    'GenerateCombinationIntent': function (){
        combination.apply(this);
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
