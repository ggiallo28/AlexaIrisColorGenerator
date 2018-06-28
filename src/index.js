'use strict';
const APP_ID = "08e1cabe-2583-40d3-afb8-3f9203cf8e93";
const Alexa = require('alexa-sdk');
const Utils = require('./Utils');
const utils = new Utils('dev');

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
          color_hex = utils.name2hex(color_name, utils.getNames());
          if ( color_hex == undefined ) throw Error ('color_hex undefined');
        }else{
            color_hex = utils.hex();
            while ( color_hex == '000000' ) color_hex = utils.hex();
        }
    }
    catch(error) {
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

    let speechOutput = utils.name(result[0])[1];
    for (var i=1; i<result.length-1; i++){
        speechOutput = speechOutput+', '+utils.name(result[i])[1];
    }
    speechOutput = speechOutput+', e '+utils.name(result[result.length-1])[1];

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

const languageStrings = {
    'it-IT': {
        translation: {
            ARTICLE: function(name){name.charAt(0).match(/[aeiou]/i) ? ' l\'' : ' il ';},
            SKILL_NAME: 'Iris',
            COLOR_UNKNOWN: '<p>Iris non conosce questo colore.</p><p>Prova a ripetere specificando la codifica Rosso, Verde e Blu</p><p>Ad esempio puoi dire </p> <p>Alexa, Chiedi a Iris Genera una combinazione complementare con il 255 0 0 <amazon:effect name="whispered">Questo strano codice è il Rosso </amazon:effect></p> oppure <p> Alexa, chiedi a Iris genera una combinazione 0 0 255 casuale <amazon:effect name="whispered">Nel caso tu voglia una combinazione casuale con il Blu</amazon:effect></p><p> Chiaro, no?</p>',
            COMBINATION_UNKNOWN: '<p>Iris supporta soltanto le combinazioni di colori: Complementari, Complementari e Divisi, Triadico, Clash, Tetradico, 4 Toni, 5 Toni, 6 Toni, Neutri, Analoghi</p> Nessuna di queste ti piace?',
            IDNU: 'Non ho capito',
            COLOR_MESSAGE: 'Iris ti consiglia <p>%s</p>',
            COMBINATION: '<p>Iris Crede che %s </p><p> siano perfetti</p><p> insieme</p>',
            HELP_MESSAGE: '<p> Ciao, ti parlo a nome di Iris </p> <p> Puoi generare un colore dicendo: </p> <p> Alexa, Chiedi a Iris di generare un colore casuale </p> oppure <p> Alexa, Chiedi a Iris Genera una combinazione casuale </p> <p> Ora, come posso aiutarti? </p>',
            HELP_REPROMT: '<p> Iris può generare un singolo colore, oppure combinazioni casuali. </p> <p> Le combinazioni di colori supportate sono: Complementari, Complementari e Divisi, Triadico, Clash, Tetradico, 4 Toni, 5 Toni, 6 Toni, Neutri, Analoghi </p> puoi dire frasi come: <p> Alexa, Chiedi a Iris di generare una combinazione complementare con il Rosso </p> <p> Ora, come posso aiutarti? </p>',
            STOP_MESSAGE: 'Iris ti saluta!'
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
    const alexa = Alexa.handler(event, context);
    alexa.appId = "amzn1.ask.skill." + APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
