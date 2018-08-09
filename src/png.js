const Utils = require('./Utils');
const utils = new Utils('dev');



event = {
    "version": "1.0",
    "session": {
        "new": true,
        "sessionId": "amzn1.echo-api.session.466e9d2f-b02f-41eb-b806-d5ec1db92427",
        "application": {
            "applicationId": "amzn1.ask.skill.08e1cabe-2583-40d3-afb8-3f9203cf8e93"
        },
        "user": {
            "userId": "amzn1.ask.account.AEHNA3DLIYN6E7QE4TLIFTRIYFOOTUPOABHD7ZVQ3KW47IT6XM67KNTROGABN2QWV7X4RLNGAOP64VS3DP32IMQWZ3HV3E6AU4KWZNEA73U73B6RXMVM3J5HGUCC32WHBPN7ZYSFSJNN6PXLNJ7OIDC6W44UQ2VOA5AV74YLBYGVIDM5DRCS4KHHGGFTXYEOPQVIRAPCKMAS3SI"
        }
    },
    "context": {
        "System": {
            "application": {
                "applicationId": "amzn1.ask.skill.08e1cabe-2583-40d3-afb8-3f9203cf8e93"
            },
            "user": {
                "userId": "amzn1.ask.account.AEHNA3DLIYN6E7QE4TLIFTRIYFOOTUPOABHD7ZVQ3KW47IT6XM67KNTROGABN2QWV7X4RLNGAOP64VS3DP32IMQWZ3HV3E6AU4KWZNEA73U73B6RXMVM3J5HGUCC32WHBPN7ZYSFSJNN6PXLNJ7OIDC6W44UQ2VOA5AV74YLBYGVIDM5DRCS4KHHGGFTXYEOPQVIRAPCKMAS3SI"
            },
            "device": {
                "deviceId": "amzn1.ask.device.AEQY62F4K4KA546RSBXM6AROVG3ONK65YSQLRLOFX3EIE3OPZXS75HLJ7WXRSP5BQONYIQHWPCX3JGKUFZ7RE6KSMFWCFFCHB77NK3EBJXOLPRP35XS3VDZ7J5WDHYBC2W4RT5KKE6I4H3DO4T4O4YNGSW2XKRTREQDIAN3FFQOX56JRRMEEQ",
                "supportedInterfaces": {}
            },
            "apiEndpoint": "https://api.eu.amazonalexa.com",
            "apiAccessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJhdWQiOiJodHRwczovL2FwaS5hbWF6b25hbGV4YS5jb20iLCJpc3MiOiJBbGV4YVNraWxsS2l0Iiwic3ViIjoiYW16bjEuYXNrLnNraWxsLjA4ZTFjYWJlLTI1ODMtNDBkMy1hZmI4LTNmOTIwM2NmOGU5MyIsImV4cCI6MTUzMzgyODg5MCwiaWF0IjoxNTMzODI1MjkwLCJuYmYiOjE1MzM4MjUyOTAsInByaXZhdGVDbGFpbXMiOnsiY29uc2VudFRva2VuIjpudWxsLCJkZXZpY2VJZCI6ImFtem4xLmFzay5kZXZpY2UuQUVRWTYyRjRLNEtBNTQ2UlNCWE02QVJPVkczT05LNjVZU1FMUkxPRlgzRUlFM09QWlhTNzVITEo3V1hSU1A1QlFPTllJUUhXUENYM0pHS1VGWjdSRTZLU01GV0NGRkNIQjc3TkszRUJKWE9MUFJQMzVYUzNWRFo3SjVXREhZQkMyVzRSVDVLS0U2STRIM0RPNFQ0TzRZTkdTVzJYS1JUUkVRRElBTjNGRlFPWDU2SlJSTUVFUSIsInVzZXJJZCI6ImFtem4xLmFzay5hY2NvdW50LkFFSE5BM0RMSVlONkU3UUU0VExJRlRSSVlGT09UVVBPQUJIRDdaVlEzS1c0N0lUNlhNNjdLTlRST0dBQk4yUVdWN1g0UkxOR0FPUDY0VlMzRFAzMklNUVdaM0hWM0U2QVU0S1daTkVBNzNVNzNCNlJYTVZNM0o1SEdVQ0MzMldIQlBON1pZU0ZTSk5ONlBYTE5KN09JREM2VzQ0VVEyVk9BNUFWNzRZTEJZR1ZJRE01RFJDUzRLSEhHR0ZUWFlFT1BRVklSQVBDS01BUzNTSSJ9fQ.XkqM4iLjr5ECVf09XD59u26mj8cCjqI47PQFYOpctGJ1F5BfxOdt6DS6_wWxA405k5pzkSi4AXQjTsOMdtG0inwx969VtmW0IuchOpzpnbiXwEynf9mOq299aVs2DWFJ_vrK7_L3bTHb5VjCkMJ16VvCP7M23P8uMpBeTBHJgIOQglmwuprG9Giznlimow1zch3Me2gLm-XpTLK7vljKsbXVdfkiCNu81mLFXSDpthimrQTDZSY7VLRa2J30wMZsK7NAhq811qX3LXQrO_9VvV1rGKGoy86j5XCiVhBc2IUkXU7U7SpTl2gyHlKFIXwzSld7tYK3bqjpUcShdbmKFw"
        }
    },
    "request": {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.fd0e2cef-f301-4b14-bfd3-d601caca89d8",
        "timestamp": "2018-08-09T14:34:50Z",
        "locale": "it-IT",
        "intent": {
            "name": "GenerateCombinationIntent",
            "confirmationStatus": "NONE",
            "slots": {
                "Red": {
                    "name": "Red",
                    "value": "0",
                    "confirmationStatus": "NONE"
                },
                "Tipologia": {
                    "name": "Tipologia",
                    "confirmationStatus": "NONE"
                },
                "Colore": {
                    "name": "Colore",
                    "confirmationStatus": "NONE"
                },
                "Blue": {
                    "name": "Blue",
                    "value": "0",
                    "confirmationStatus": "NONE"
                },
                "Green": {
                    "name": "Green",
                    "value": "0",
                    "confirmationStatus": "NONE"
                }
            }
        },
        "dialogState": "STARTED"
    }
}

const intentObj = event.request.intent;
const resolutions_type = intentObj.slots.Tipologia.resolutions;
const resolutions_color_name = intentObj.slots.Colore.resolutions;
    let Red = intentObj.slots.Red;
    let Green = intentObj.slots.Green;
    let Blue = intentObj.slots.Blue;
if ( Red && Green && Blue && parseInt(Red.value) >=0 && parseInt(Green.value)>=0 && parseInt(Blue.value)>=0){
    color_hex = utils.rgb2hex(parseInt(Red.value),parseInt(Green.value), parseInt(Blue.value));
    rgb_back = utils.hex2rgb(color_hex)
    if ( rgb_back.r == rgb_back.g && rgb_back.b == rgb_back.r){
        rgb_back.r = 255 - rgb_back.r;
        rgb_back.g = 255 - rgb_back.g;
        rgb_back.b = 255 - rgb_back.b;
        let color_hex_opposite = utils.rgb2hex(rgb_back.r,rgb_back.g,rgb_back.b);
        result = ['#'+color_hex, '#'+color_hex_opposite];
        console.log(result)
    }
}
