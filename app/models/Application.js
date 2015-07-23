var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ApplicationSchema = new Schema({});

// Collection name == issues
mongoose.model('Application', ApplicationSchema);
