const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/**
 * @description:Creating note schema using mongoose
 **/
var noteSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User_id required"],
      ref: "Note"
    },
    title: {
      type: String,
      required: [true, "Title required"]
    },
    description: {
      type: String,
      required: [true, "Description required"]
    },
    color: {
      type: String,
      required: [true, "Color required"]
    },
    reminder: {
      type: String
    },
    pinned: {
      type: Boolean
    },
    archive: {
      type: Boolean
    },
    trash: {
      type: Boolean
    },
    label: [
      {
        type: String,
        ref: labelSchema
      }
    ],
    sequence:{
      type:Number
    },
  },
  {
    timestamps: true
  }
);
var note = mongoose.model("Note", noteSchema);

function noteModel() { }
/**
 * @description:it will add the notes data using note schema and save the data into the database
 * @param {*request from frontend} objectNote
 * @param {*response to backend} callback
 */
noteModel.prototype.addNotes = (objectNote, callback) => {
  console.log("in add notes", objectNote.body);

  const noteModel = new note(objectNote.body);
  console.log("note model object body---->", objectNote.body);

  noteModel.save((err, result) => {
    console.log("REsult------------------------------>", result);

    if (err) {
      callback(err);
    } else {
      console.log("note model result---->", result);
      callback(null, result);
    }
  });
};
/**
 * @description:it will get the notes using userId and find the notes with data
 * @param {*request from frontend} id
 * @param {*response to backend} callback
 */
noteModel.prototype.getNotes = (id, callback) => {
  note.find(
    {
      userId: id.decoded.payload.user_id
    },
    (err, result) => {
      if (err) {
        console.log("MODEL ERROR ");
        
        callback(err);
      } else {
        console.log("MODEL SUCCESS ");

        callback(null, result);
      }
    }
  );
};

noteModel.prototype.updateColor = (noteID, updateParams, callback) => {
  note.findOneAndUpdate(
    {
      _id: noteID
    },
    {
      $set: {
        color: updateParams
      }
    },
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        return callback(null, updateParams);
      }
    }
  );
};

noteModel.prototype.reminder = (noteID, reminderParams, callback) => {
  note.findOneAndUpdate(
    {
      _id: noteID
    },
    {
      $set: {
        reminder: reminderParams
      }
    },
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        return callback(null, reminderParams);
      }
    }
  );
};

noteModel.prototype.isPinned = (noteID, pinParams, callback) => {
  note.findOneAndUpdate({
    _id: noteID
  }, {
      $set: {
        pinned: pinParams,
        trash: false,
        archive: false
      }
    },
    (err, result) => {
      if (err) {
        callback(err)
      } else {
        return callback(null, pinParams)
      }
    });
};

noteModel.prototype.isArchived = (noteID, archiveNote, callback) => {
  note.findOneAndUpdate(
    {
      _id: noteID
    },
    {
      $set: {
        archive: archiveNote,
        trash: false
      }
    },
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        return callback(null, archiveNote);
      }
    }
  );
};

noteModel.prototype.isTrashed = (noteID, trashNote, callback) => {
  note.findOneAndUpdate(
    {
      _id: noteID
    },
    {
      $set: {
        trash: trashNote
      }
    },
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        return callback(null, trashNote);
      }
    }
  );
};

noteModel.prototype.editTitle = (noteID, titleParams, callback) => {
  note.findOneAndUpdate(
    {
      _id: noteID
    },
    {
      $set: {
        title: titleParams
      }
    },
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        return callback(null, titleParams);
      }
    }
  );
};
/**
 *
 * @param {*} noteID
 * @param {*} descParams
 * @param {*} callback
 */
noteModel.prototype.editDescription = (noteID, descParams, callback) => {
  note.findOneAndUpdate(
    {
      _id: noteID
    },
    {
      $set: {
        description: descParams
      }
    },
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        return callback(null, descParams);
      }
    }
  );
};

noteModel.prototype.deleteNote = (data, callback) => {
  note.deleteOne(
    {
      _id: data.body.noteID
    },
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        const obj = {
          status: 200,
          msg: "note is deleted successfully"
        };
        return callback(null, obj);
      }
    }
  );
};

var labelSchema = new mongoose.Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "UserSchema"
    },
    label: {
      type: String,
      require: [true, "Label require"],
      unique: true
    }
  },
  {
    timestamps: true
  }
);
var label = mongoose.model("Label", labelSchema);

noteModel.prototype.addLabel = (labelData, callback) => {
  console.log("ultimate save", labelData);
  const Data = new label(labelData);
  Data.save((err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      console.log("label result", result);
      return callback(null, result);
    }
  });
};

noteModel.prototype.getLabels = (id, callback) => {
  //console.log("in model", id);
  label.find({ userID: id.userID }, (err, result) => {
    if (err) {
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};

noteModel.prototype.deleteLabel = (id, callback) => {
 // console.log("in model", id);
  label.deleteOne({ _id: id.labelID }, (err, result) => {
    if (err) {
      callback(err);
    } else {
      console.log("labels", result);
      return callback(null, result);
    }
  });
};

noteModel.prototype.updateLabel = (changedLabel, callback) => {
  var editLabel = null;
  var labelId = null;
 // console.log("in model", changedLabel);
  if (changedLabel != null) {
    editLabel = changedLabel.editLabel;
    labelId = changedLabel.labelID;
  } else {
    callback("Pinned note not found");
  }
  label.findOneAndUpdate(
    {
      _id: labelId
    },
    {
      $set: {
        label: editLabel
      }
    },
    (err, result) => {
      if (err) {
      //  console.log("in modelerr");
        callback(err);
      } else {
      //  console.log("in modelsuccess");
        return callback(null, changedLabel);
      }
    }
  );
};

noteModel.prototype.saveLabelToNote = (labelParams, callback) => {
  //console.log("in model", labelParams.noteID);
  var labelledNote = null;
  var noteID = null;
  if (labelParams != null) {
    labelledNote = labelParams.label;
    noteID = labelParams.noteID;
  } else {
    callback("Pinned note not found")
  }
  note.findOneAndUpdate(
    {
      _id: noteID
    },
    {
      $push: {
        label: labelledNote,
      }
    },
    (err, result) => {
      if (err) {
        callback(err)
      } else {
       // console.log("in model success");
        let res = result.label;
        res.push(labelledNote);
        return callback(null, res)
      }
    });
};

noteModel.prototype.getReminders = (date1, date2, callback) => {
  note.find((err, result) => {
    if (err) {
      callback(err);
    } else {
      const data = [];
      result.forEach(function (value) {
        if (value.reminder.length > 1) {
          // console.log("Reminders===>",value.reminder);
          // console.log("date1==",date1);
          // console.log("date2==",date2);



          if (value.reminder >= date1 && value.reminder <= date2) {
            console.log("Current Reminders===>", value.reminder);

            userIdReminder = [
              value.userId + ", " + value.title + ", " + value.description
            ];
            data.push(userIdReminder);
          }
        }
      });
      if (data.length > 0) {
        callback(null, data);
      } else {
        // console.log("No reminders found");
        callback(null, "No reminders found");
      }
    }
  });
};


noteModel.prototype.deleteLabelToNote = (labelParams, callback) => {
 // console.log("in model", labelParams.noteID);
  var labelledNote = null;
  var noteID = null;
  if (labelParams != null) {
    labelledNote = labelParams.label;
    noteID = labelParams.noteID;
  } else {
    callback("Pinned note not found")
  }
  note.findOneAndUpdate(
    {
      _id: noteID
    },
    {
      $pull: {
        label: labelledNote,
      }
    },
    (err, result) => {
      if (err) {
        callback(err)
      } else {
        let newArray = result.label;
     //   console.log("in model success result", result);

        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i] === labelledNote) {
            newArray.splice(i, 1);
            return callback(null, newArray)
          }
        }
      }
    });
};



const collabSchema = mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "UserSchema"
    },
    noteID: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
    collabUserID: {
        type: Schema.Types.ObjectId,
        ref: "UserSchema"
    },
},
    {
        timestamps: true
    })
const Collab = mongoose.model('Collaborator', collabSchema);
/**
 * 
 * @param {*} collabData 
 * @param {*} callback 
 */
noteModel.prototype.saveCollaborator = (collabData, callback) => {
    console.log("ultimate save", collabData);
    const Data = new Collab(collabData);
    Data.save((err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            return callback(null, result);
        }
    })
}

noteModel.prototype.getDataByNoteId = (noteID, callback) => {
    Collab.find({ noteID: noteID })
        .populate('userID', { notes: 0, password: 0, __v: 0, resetPasswordExpires: 0, resetPasswordToken: 0 })
        .populate('collabUserID', { notes: 0, password: 0, __v: 0, resetPasswordExpires: 0, resetPasswordToken: 0 })
        .populate('noteID')
        .exec(function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        })
}

noteModel.prototype.getCollabNotesUserId = (userID, callback) => {
    console.log("--------------------------",userID);
    Collab.find({ collabUserID: userID }, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}

noteModel.prototype.getCollabOwnerUserId = (ownerUserId, callback) => {
    Collab.find({ userID: ownerUserId })
        .populate('collabUserID', { notes: 0, password: 0, __v: 0, resetPasswordExpires: 0, resetPasswordToken: 0 })
        .exec(function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        })
}


module.exports = new noteModel();
