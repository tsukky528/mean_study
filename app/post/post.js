var mongoose = require('mongoose');

module.exports = mongoose.model('Post', {
    name: String,
    text: String
});