const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var notificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User_id required"],
      ref: "notification"
    },
    pushToken: {
      type: String,
      required: [true, "pushToken required"]
    }
  },
  {
    timestamps: true
  }
);

function notificationModel() {}
var notification = mongoose.model("notification", notificationSchema);
notificationModel.prototype.notification = (req, callback) => {  
  notification.findOneAndUpdate(
    {
      userId: req.body.userId
    },
    {
      $set: {
        pushToken: req.body.pushToken
      }
    },
    { upsert: true, new: true },
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        return callback(null, result);
      }
    }
  );
};

notificationModel.prototype.sendNotification = (user_id, callback) => {
  notification.findOne(
    {
      userId: user_id
    },
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        return callback(null, result.pushToken);
      }
    }
  );
};

module.exports=new notificationModel();
