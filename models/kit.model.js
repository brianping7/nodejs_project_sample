var mongoose = require('mongoose');

var kitListSchema = new mongoose.Schema({
    keyName:String,
    kitYear:String,
    kitType:String,
    brand:String,
    thumbName:String,
    launchDate:String,
    designer:String,
    kitVer:String,
    color:String,
    kitMatchDate:String,
    kitMatchTeam:String,
    kitMatchType:String,
    player:String,
    playerNo:String,
    kitDesc:String,
    teamPicDesc:String,
    likeCnt:Number,
    shirtCost:Number,
    namesetCost:Number,
    badgeCost:Number

});


var config = require('../config/config');


mongoose.connect(config.mongodb,function (err) {
    if (!err) {
        console.log('Connect to mongoDB successful for matchList');
    } else {
        throw err;
    }
});

//console.log(config.mongodb);

var kitList = mongoose.model('kitlist',kitListSchema);

module.exports = kitList;