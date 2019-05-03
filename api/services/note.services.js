const noteModel = require("../model/note.model");

const notificationModel = require("../model/notification.model");
const send=require("../../send")
/**
 *
 * @param {*} data
 * @param {*} callback
 */
exports.createNote = (data, callback) => {
  noteModel.addNotes(data, (err, result) => {
    // console.log("note service DATA---->",data);

    if (err) {
      console.log("service error---->note<CREATE NOTE>");
      callback(err);
    } else {
      console.log("note service RESULT---->", result);
      callback(null, result);
    }
  });
};
/**
 *
 * @param {*} data
 * @param {*} callback
 */
exports.getNotes = (data, callback) => {
  noteModel.getNotes(data, (err, result) => {
    if (err) {
      console.log("service error---->note<GET NOTE>");
      callback(err);
    } else {
      // console.log("In service", result);
      callback(null, result);
    }
  });
};

exports.updateColor = (paramID, paramData, callback) => {
  // console.log("in services", paramID, paramData);
  noteModel.updateColor(paramID, paramData, (err, result) => {
    if (err) {
      console.log("service error--->note<UPDATE COLOR>");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};

exports.reminder = (paramID, paramData, callback) => {
  console.log("in services REMINDER---->", paramID, paramData);
  noteModel.reminder(paramID, paramData, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};

exports.isPinned = (paramID, paramData, callback) => {
  noteModel.isPinned(paramID, paramData, (err, result) => {
      if (err) {
          console.log("service error");
          callback(err);
      } else {
          return callback(null, result)
      }
  })
}

exports.isArchived = (paramID, paramData, callback) => {
  console.log("in services ARCHIVE---->", paramID, paramData);
  noteModel.isArchived(paramID, paramData, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};

exports.isTrashed = (paramID, paramData, callback) => {
  console.log("in services Trash---->", paramID, paramData);
  noteModel.isTrashed(paramID, paramData, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};

exports.editTitle = (paramID, paramData, callback) => {
  console.log("in services", paramID, paramData);
  noteModel.editTitle(paramID, paramData, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};
/**
 *
 * @param {*} paramID
 * @param {*} paramData
 * @param {*} callback
 */
exports.editDescription = (paramID, paramData, callback) => {
  console.log("in services", paramID, paramData);
  noteModel.editDescription(paramID, paramData, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};

exports.deleteNote = (noteID, callback) => {
  noteModel.deleteNote(noteID, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};

exports.notification = (req, callback) => {
    notificationModel.notification(req, (err, result) => {
    if (err) {
      console.log("service error in notification");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
}

exports.sendNotification = (user_id, callback) => {
    notificationModel.sendNotification(user_id, (err, result) => {
    if (err) {
      console.log("service error in sendNotification");
      callback(err);
    } else {
        send.SendPushNotify(result)
      return callback(null, result);
    }
  });
}



exports.addLabel = (labelData, callback) => {
  noteModel.addLabel(labelData, (err, result) => {
    if (err) {
      console.log("service error in addLabel");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};

exports.getLabels = (labelData, callback) => {
  noteModel.getLabels(labelData, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      console.log("response result in NOTE Services---->",result);
      return callback(null, result);
    }
  });
};

exports.deleteLabel = (labelData, callback) => {
  noteModel.deleteLabel(labelData, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};

exports.updateLabel = (labelData, callback) => {
  console.log("labelData",labelData);
  
  noteModel.updateLabel(labelData, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};


exports.checkReminders=()=>{
  var date1=new Date(),
  date2=new Date(date1);
  date2.setMinutes(date1.getMinutes()+1);
  date1=date1.toLocaleString();
  date2=date2.toLocaleString();
  
  noteModel.getReminders(date1,date2,(err,result)=>{
    if(err){
      console.log("service error in checkReminders");      
    }else{
      if(Array.isArray(result)){
        var temp=result[0][0].split(",");
        var userId=temp[0];
        var title=temp[1];
        var body=temp[2]; 
        notificationModel.sendNotification(userId,(err,result)=>{
          if(err){
            console.log("service error");            
          }
          else{
            console.log(result);
            send.SendPushNotify(result,title,body)           
          }
        })       
      }
    }
  })

}


exports.saveLabelToNote = (paramData, callback) => {
  if (paramData.pull) {
      noteModel.deleteLabelToNote(paramData, (err, result) => {
          if (err) {
              console.log("service error");
              callback(err);
          } else {
              return callback(null, result)
          }
      })
  }
  else {
      noteModel.saveLabelToNote(paramData, (err, result) => {
          if (err) {
              console.log("service error");
              callback(err);
          } else {
              return callback(null, result)
          }
      })
  }
}

exports.deleteLabelToNote = (paramData, callback) => {
  noteModel.deleteLabelToNote(paramData, (err, result) => {
      if (err) {
          console.log("service error");
          callback(err);
      } else {
          return callback(null, result)
      }
  })
}