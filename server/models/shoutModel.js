var mongoose = require('mongoose');

var shoutSchema = mongoose.Schema({
    shout_text: String,
    user_ip: String,
    user_agent: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Shout', shoutSchema);