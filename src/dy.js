var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-1"
});

var docClient = new AWS.DynamoDB.DocumentClient();
var dynamoParams = {
    TableName : "ColorTable",
    KeyConditionExpression: "#id = :user_id and #cl = :color",
    ExpressionAttributeNames:{
        "#id": "UserId",
        "#cl": "Name"
    },
    ExpressionAttributeValues: {
        ":user_id": ""+1+"",
        ":color" : "Verde"
    }
};

var params = {
    TableName:"ColorTable",
    Item:{
        "UserId": "1",
        "Name": "Verde",
        "Hex": "00FF00"
    }
};

let colors = [];
docClient.query(dynamoParams, function(err, data) {
    if (err) {
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        if (  data.Items.length == 0 ){ // Il colore non esiste
            console.log("Adding a new item...");
            docClient.put(params, function(err, data) {
                if (err) {
                    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Added item:", JSON.stringify(data, null, 2));
                }
            });
        }else{ // Il colore esiste
            console.log("KO");
        }
    }
});
