var mongoose = require('mongoose'),
    Application = mongoose.model('Application'),
    ObjectId = mongoose.Types.ObjectId;

exports.view = function(req, res, next) {
  Application.find({}, function(err, applications) {
    if(err) {
      res.status(500);
      res.json({
        type: false,
        data: 'Error Occured: ' + err
      });
    } else {
      if(applications) {
        res.status(200);
        res.json({
          type: true,
          data: applications
        });
      } else {
        res.json({
          type: false,
          data: 'No Applications Found'
        });
      }
    }
  });
}
