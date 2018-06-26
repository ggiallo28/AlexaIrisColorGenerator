'use strict';
const APP_ID = "08e1cabe-2583-40d3-afb8-3f9203cf8e93";
const Alexa = require('alexa-sdk');
const Utils = require('./Utils');
const utils = new Utils('dev');
const ColorMatrix = [['Nero', '000000'], ['Blu marino', '000080'], ['Blu', '0000FF'], ['Blu Klein', '002FA7'], ['Blu di Prussia', '003153'], ['Blu elettrico', '003399'], ['Cobalto', '0047AB'], ['Ceruleo', '007BA7'], ['Blu Comando Stellare', '007BB8'], ['Azzurro', '007FFF'], ['Verde ufficio', '008000'], ['Foglia di tè', '008080'], ['Blu Bondi', '0095B6'], ['Giada', '00A86B'], ['Verde Caraibi', '00CC99'], ['Uovo di pettirosso', '00CCCC'], ['Verde', '00FF00'], ['Verde primavera', '00FF7F'], ['Ciano', '00FFFF'], ['Verde pino', '01796F'], ['Carbone', '050402'], ['Ceruleo scuro', '08457E'], ['Turchese chiaro', '08E8DE'], ['Zaffiro', '0F52BA'], ['Turchese scuro', '116062'], ['Blu oltremare', '120A8F'], ['Denim', '1560BD'], ['Verde primavera scuro', '177245'], ['Blu di Persia', '1C39BB'], ['Blu Dodger', '1E90FF'], ['Verde foresta', '228B22'], ['Antracite', '293133'], ['Blu ceruleo', '2A52BE'], ['Verde marino', '2E8B57'], ['Grigio 80%', '2F2F2F'], ['Grigio ardesia scuro', '2F4F4F'], ['Turchese', '30D5C8'], ['Indaco scuro', '310062'], ['Turchese Perla Mistica', '32C6A6'], ['Blu notte', '343A90'], ['Verde marino medio', '3CB371'], ['Bistro', '3D2B1F'], ['Grigio 75%', '404040'], ['Verde Veronese', '40826D'], ['Rubino', '410012'], ['Blu reale', '4169E1'], ['Grigio asparago', '465945'], ['Blu acciaio', '4682B4'], ['Indaco', '4B0082'], ['Grigio 70%', '4F4F4F'], ['Rosso sangue', '500000'], ['Verde smeraldo', '50C878'], ['Terra di Siena bruciata', '531B00'], ['Verde oliva scuro', '556B2F'], ['Scarlatto scuro', '560319'], ['Avio', '5D8AA8'], ['Denim chiaro', '5E86C1'], ['Grigio 60%', '5F5F5F'], ['Blu cadetto', '5F9EA0'], ["Terra d'ombra", '635147'], ['Grigio topo', '646B63'], ['Fiore di granturco', '6495ED'], ['Marrone scuro', '654321'], ['Prugna', '660066'], ['Verde chiaro', '66FF00'], ['Verde olivastro', '6B8E23'], ['Indaco elettrico', '6F00FF'], ['Seppia', '704214'], ['Ardesia', '708090'], ['Testa di moro', '754909'], ['Bronzo antico', '75663F'], ['Grigio ardesia chiaro', '778899'], ['Verde pastello', '77DD77'], ['Tronco', '79443B'], ['Granata', '7B1B02'], ['Chartreuse', '7FFF00'], ['Acquamarina', '7FFFD4'], ['Bordeaux', '800000'], ['Borgogna', '800020'], ['Rosso Falun', '801818'], ['Verde oliva', '808000'], ['Grigio 50%', '808080'], ['Asparago', '87A96B'], ['Ametista', '884DA7'], ["Terra d'ombra bruciata", '8A3324'], ['Viola', '8F00FF'], ['Grigio 40%', '8F8F8F'], ['Verde marino scuro', '8FBC8F'], ['Beige Oliva Chiaro', '908435'], ['Catrame scuro', '918151'], ['Sangria', '92000A'], ['Pistacchio', '93C572'], ['Carminio', '960018'], ['Marrone', '964B00'], ['Uovo di pettirosso chiaro', '96DED1'], ['Castagno scuro', '986960'], ['Marrone pastello', '987654'], ['Verde menta', '98FF98'], ['Melanzana', '990066'], ['Viola melanzana', '991199'], ['Marrone rosso', '993300'], ['Malva', '993366'], ['Malva chiaro', '996666'], ['Rosa Mountbatten', '997A8D'], ['Celeste', '99CBFF'], ['Turchese pallido', '99FFCC'], ['Olivina', '9AB973'], ['Viola chiaro', '9F00FF'], ['Rosso segnale', 'A52019'], ['Rosso fuoco', 'A61022'], ['Verde menta chiaro', 'A6FBB2'], ['Giallo miele', 'A98307'], ['Azzurro Fiordaliso', 'ABCDEF'], ['Celadon', 'ACE1AF'], ['Verde muschio', 'ADDFAD'], ['Verde-giallo', 'ADFF2F'], ['Porpora', 'B20000'], ['Rosso mattone', 'B22222'], ['Grigio 30%', 'B2B2B2'], ['Rame', 'B87333'], ['Solidago scuro', 'B8860B'], ['Rosso Tiziano', 'BA6262'], ['Tè verde scuro', 'BADBAD'], ['Rosso mattone chiaro', 'BD8E80'], ['Kaki scuro', 'BDB76B'], ['Beige Verdastro', 'BEBD7F'], ['Vinaccia', 'C0007F'], ['Mogano', 'C04000'], ['Argento', 'C0C0C0'], ['Ecru', 'C2B280'], ['Kaki', 'C3B091'], ['Rosso cardinale', 'C41E3A'], ['Giallo sabbia', 'C6A664'], ['Rosso violaceo', 'C71585'], ['Rosso veneziano', 'C80815'], ['Lilla', 'C8A2C8'], ['Glicine', 'C9A0DC'], ['Grigio tè verde', 'CADABA'], ['Rosso corsa', 'CC0000'], ['Rosso aragosta', 'CC5500'], ['Ocra', 'CC7722'], ['Incarnato prugna', 'CC8899'], ['Ottone antico', 'CC9966'], ['Pervinca', 'CCCCFF'], ['Lime', 'CCFF00'], ['Tenné', 'CD5700'], ['Castagno', 'CD5C5C'], ['Bronzo', 'CD7F32'], ['Marrone chiaro', 'CD853F'], ['Rosso fragola', 'CE3018'], ['Oro vecchio', 'CFB53B'], ['Grigio rosso chiaro', 'D0AFAE'], ['Tè verde', 'D0F0C0'], ['Pera', 'D1E231'], ['Rosso pompeiano', 'D21F1B'], ['Cioccolato', 'D2691E'], ['Tan', 'D2B48C'], ['Catrame', 'D2B48C'], ['Grigio 20%', 'D2D2D2'], ['Azalea', 'D3305D'], ['Cardo', 'D8BFD8'], ['Orchidea', 'DA70D6'], ['Solidago', 'DAA520'], ['Lavanda pallido', 'DABAD0'], ['Marrone sabbia chiaro', 'DABDAB'], ['Rosa medio', 'DB244F'], ['Rosso violetto chiaro', 'DB7093'], ['Cremisi', 'DC143C'], ['Gainsboro', 'DCDCDC'], ['Castagno chiaro', 'DDADAF'], ['Ciliegia', 'DE3163'], ['Eliotropo', 'DF73FF'], ['Fucsia Bordesto Lillato', 'E0AFEE'], ['Carta da zucchero', 'E0FFFF'], ['Lampone', 'E30B5C'], ['Grigio cenere', 'E4E5E0'], ['Amaranto', 'E52B50'], ['Giallo segnale', 'E5BE01'], ['Platino', 'E5E4E2'], ['Lavanda', 'E6E6FA'], ['Rosa scuro', 'E75480'], ['Terra di Siena', 'E97451'], ['Salmone scuro', 'E9967A'], ['Fulvo', 'EBB55F'], ['Aragosta', 'ED7465'], ['Grigio 10%', 'EFEFEF'], ['Camoscio', 'F0DC82'], ['Kaki chiaro', 'F0E68C'], ['Blu Alice', 'F0F8FF'], ['Bianco Anti Flash', 'F2F3F4'], ['Fucsia', 'F400A1'], ['Sabbia', 'F4A460'], ['Zafferano', 'F4C430'], ['Isabella', 'F4F0EC'], ['Grano', 'F5DEB3'], ['Beige', 'F5F5DC'], ['Bianco Fumo', 'F5F5F5'], ['Giallo Napoli', 'F7E89F'], ['Grigio 5%', 'F7F7F7'], ['Magnolia', 'F8F4FF'], ['Bianco Fantasma', 'F8F8FF'], ['Magenta chiaro', 'F984E5'], ['Rosa pallido', 'FADADD'], ['Pesca-giallo', 'FADFAD'], ['Bianco di Titanio', 'FAEBD7'], ['Lino', 'FAF0E6'], ['Albicocca', 'FBCEB1'], ['Rosa shocking', 'FC0FC0'], ['Anguria', 'FC6C85'], ['Limone', 'FDE910'], ['Bianco di Zinco', 'FEFEE9'], ['Rosso', 'FF0000'], ['Rosa vivo', 'FF007F'], ['Magenta', 'FF00FF'], ['Scarlatto', 'FF2400'], ['Vermiglio', 'FF4D00'], ['Rosso rosa', 'FF6088'], ['Rosso pomodoro', 'FF6347'], ['Corallo', 'FF7F50'], ['Salmone', 'FF8C69'], ['Zafferano profondo', 'FF9933'], ['Rosa arancio', 'FF9966'], ['Arancione', 'FFA500'], ['Ambra', 'FFBF00'], ['Rosa', 'FFC0CB'], ['Mandarino', 'FFCC00'], ['Pesca-arancio', 'FFCC99'], ['Rosa pastello', 'FFD1DC'], ['Oro', 'FFD700'], ['Giallo scuolabus', 'FFD800'], ['Pesca scuro', 'FFDAB9'], ['Bianco Navajo', 'FFDEAD'], ['Biscotto', 'FFE4C4'], ['Pesca', 'FFE5B4'], ['Papaia', 'FFEFD5'], ['Lavanda rosata', 'FFF0F5'], ['Conchiglia', 'FFF5EE'], ['Limone crema', 'FFFACD'], ['Bianco Floreale', 'FFFAF0'], ['Crema', 'FFFDD0'], ['Bianco Antico', 'FFFEEF'], ['Giallo', 'FFFF00'], ['Giallo pastello', 'FFFF66'], ['Avorio', 'FFFFF0'], ['Bianco', 'FFFFFF']];
let MyColorMatrix = [];

const chosemycolor = function(){
    console.log(this);
    let color_name = 'Giallo';
    let hex_value = utils.name2hex(color_name, utils.getNames());
    MyColorMatrix.push([color_name, hex_value]);
    console.log(MyColorMatrix);
}

const resetmycolor = function(){
    MyColorMatrix = [];
    console.log(MyColorMatrix);
}

const combination = function(){
    /*console.log(this);
    let color_name = '';
    let color_hex = utils.name2hex(color_name,ColorMatrix);
    if (color_name != '' || color_hex == undefined)*/
    let color_hex = utils.hex();
    while (color_hex == "#000000")
        color_hex = utils.hex();
    let types = ['complementary', 'splitComplementary', 'triadic', 'clash', 'tetradic', 'fourTone', 'fiveTone', 'sixTone', 'neutral', 'analogous'];  //Capire come tradurre..
    let val = utils.getRandomInt(0, types.length-1);
    let type = '';
    switch(types[val]){
        case 'splitComplementary':
            type = types[val] + ['', 'CW', 'CCW'][utils.getRandomInt(0, 2)];
            break;
        case 'fourTone':
            type = types[val] + ['CW', 'CCW'][utils.getRandomInt(0, 1)];
            break;
        case 'fiveTone':
            type = types[val] + ['A', 'B', 'C', 'D', 'E', 'F'][utils.getRandomInt(0, 1)];
            break;
        case 'sixTone':
            type = types[val] + ['CW', 'CCW'][utils.getRandomInt(0, 1)];
            break;
        default:
            type = types[val];
    }
    let result = utils.harmonize(color_hex, type);

    let speechOutput = utils.name(result[0])[1];
    for (var i=1; i<result.length-1; i++){
        speechOutput = speechOutput+', '+utils.name(result[i])[1];
    }
    speechOutput = speechOutput+' e '+utils.name(result[result.length-1])[1];

    this.attributes.speechOutput = this.t('COMBINATION', speechOutput);
    let imageObj = utils.hex2png(result);
    let cardTitle = type;
    console.log(this.attributes.speechOutput);
    console.log(cardTitle);
    console.log(imageObj);
    this.emit(':tellWithCard', this.attributes.speechOutput, cardTitle, this.attributes.speechOutput, imageObj);
}

const generatecolor = function(){
    let color_hex = utils.hex();
    let color_name = utils.name(color_hex);
    let articolo = color_name[1].charAt(0).match(/[aeiou]/i) ? ' l\'' : ' il ';
    this.attributes.speechOutput = this.t('COLOR_MESSAGE', articolo + color_name[1]);
    //this.emit(':tell', this.attributes.speechOutput);
    let imageObj = utils.hex2png(color_hex);
    let cardTitle = color_name[1];
    console.log(imageObj);
    console.log(cardTitle);
    console.log(this.attributes.speechOutput);
    this.emit(':tellWithCard', this.attributes.speechOutput, cardTitle, this.attributes.speechOutput, imageObj);
}

const languageStrings = {
    'it-IT': {
        translation: {
            //ARTICLE: function(name){name.charAt(0).match(/[aeiou]/i) ? ' l\'' : ' il ';},
            SKILL_NAME: 'Iris',
            COLOR_MESSAGE: 'Iris ti consiglia <p>%s</p>',
            COMBINATION: '<p>Iris Crede che %s </p><p> siano perfetti</p><p> insieme</p>',
            HELP_MESSAGE: "You can generate colors saying, generate random color, or, you can say exit...Now, what can I help you with?",
            HELP_REPROMT: "You can say things like, generate random color, or you can say exit...Now, what can I help you with?",
            STOP_MESSAGE: 'Ciao Ciao!'
        }
    }
};

const handlers = {
/*    'NewSession': function () {
        generatecolor.apply(this);
    },*/
    'RandomColorIntent': function () {
        generatecolor.apply(this);
    },
    'AddColorIntent': function () {
        chosemycolor.apply(this);
    },
    'ResetColorsIntent': function () {
        resetmycolor.apply(this);
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
/*   'Unhandled' : function () {
        generatecolor.apply(this);
    }*/
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = "amzn1.ask.skill." + APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
