// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
    // Declare 2 vars to capture S3 object details
    var s3ObjKey = event.Records[0].s3.object.key
    var s3ObjTime = event.Records[0].eventTime
    console.log("This is a test")
    console.log(event)
    //Write values to DynamoDB
    var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    
    var params = {
      TableName: 'cloud9-LambdaExampleFn-LambdaExampleFnTable-15BDIACS6B7OH',
      Item: {
        'id' : {S: s3ObjKey},
        's3time' : {S: s3ObjTime}
      }
    };
    
    // Call DynamoDB to add the item to the table
    ddb.putItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
    
    callback();
};
