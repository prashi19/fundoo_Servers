const noteService = require("../services/note.services");
/**
 * @description:it handles the creating note data
 * @param {*request from frontend} req
 * @param {*response from backend} res
 */
exports.createNote = (req, res) => {
  try {
    console.log("---------------------------------------", req.body);

    // console.log("note controller REQUEST---->", req);
    req
      .checkBody("title", "Title should not be empty")
      .not()
      .isEmpty();
    req
      .checkBody("description", "Description should not be empty")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      // console.log("note controller ERROR", error);
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      noteService.createNote(req, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.message = "Failed to create note";
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {

          var userNote = {};
          responseResult.status = true;
          responseResult.message = "card saved..";
          responseResult.data = result;

          res.status(200).send(responseResult);
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
};
/**
 * @description:it handles get the created note with data
 * @param {*request from frontend} req
 * @param {*response from backend} res
 */
exports.getNotes = (req, res) => {
  try {
    var responseResult = {};
    noteService.getNotes(req, (err, result) => {
      if (err) {
        responseResult.status = false;
        responseResult.message = "Failed to generate note";
        responseResult.error = err;
        res.status(500).send(responseResult);
      } else {
        responseResult.status = true;
        responseResult.message = "List of notes:";
        responseResult.data = result;
        res.status(200).send(responseResult);
      }
    });
  } catch (error) {
    res.send(err);
  }
};

/******** */

exports.updateColor = (req, res) => {
  try {
    req
      .checkBody("noteID", "noteID required")
      .not()
      .isEmpty();
    req
      .checkBody("color", "color should not be empty")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      noteID = req.body.noteID;
      color = req.body.color;
      noteService.updateColor(noteID, color, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.reminder = (req, res) => {
  try {
    req
      .checkBody("noteID", "noteID required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      noteID = req.body.noteID;
      reminder = req.body.reminder;
      noteService.reminder(noteID, reminder, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.isPinned = (req, res) => {
  try {
      req.checkBody('noteID', 'noteID required').not().isEmpty();
      var errors = req.validationErrors();
      var response = {};
      if (errors) {
          response.status = false;
          response.error = errors;
          return res.status(422).send(response);
      } else {
          var responseResult = {};
          noteID = req.body.noteID;
          pinned = req.body.pinned;
          noteService.isPinned(noteID, pinned, (err, result) => {
              if (err) {
                  responseResult.status = false;
                  responseResult.error = err;
                  res.status(500).send(responseResult);
              } else {
                  responseResult.status = true;
                  responseResult.data = result;
                  res.status(200).send(responseResult);
              }
          })
      }
  } catch (error) {
      res.send(error)
  }
}

exports.isArchived = (req, res) => {
  try {
    req
      .checkBody("noteID", "noteID required")
      .not()
      .isEmpty();
    req
      .checkBody("archive", "archive required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      noteID = req.body.noteID;
      archive = req.body.archive;
      noteService.isArchived(noteID, archive, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.isTrashed = (req, res) => {
  try {
    req
      .checkBody("noteID", "noteID required")
      .not()
      .isEmpty();
    req
      .checkBody("trash", "trash required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      noteID = req.body.noteID;
      trash = req.body.trash;
      noteService.isTrashed(noteID, trash, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.editTitle = (req, res) => {
  try {
    req
      .checkBody("noteID", "noteID required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      noteID = req.body.noteID;
      title = req.body.title;
      noteService.editTitle(noteID, title, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
exports.editDescription = (req, res) => {
  try {
    req
      .checkBody("noteID", "noteID required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      noteID = req.body.noteID;
      description = req.body.description;
      noteService.editDescription(noteID, description, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.deleteNote = (req, res) => {
  try {
    req
      .checkBody("noteID", "noteID required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      noteID = req.body.noteID;
      noteService.deleteNote(req, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.notification = (req, res) => {
  try {
    req
      .checkBody("pushToken", "pushToken requires")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
   
      
      noteService.notification(req, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (err) {}
};


exports.sendNotification = (req, res) => {
  try {
      var responseResult = {};
      var user_id=req.params.userid;
      console.log(user_id);
      console.log("userid",req.params.userid);
      
      noteService.sendNotification(user_id, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    } catch (err) {}
};

exports.addLabel = (req, res) => {
  try {
    req
      .checkBody("label", "label required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      const labelData = {
        userID: req.decoded.payload.user_id,
        label: req.body.label
      };
      noteService.addLabel(labelData, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.getLabels = (req, res) => {
  try {
    // req.checkBody('userID', 'userID required').not().isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      const labelData = {
        userID: req.decoded.payload.user_id
      };
      noteService.getLabels(labelData, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          console.log("response result in NOTE CONTROLLER---->",responseResult);
          
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.deleteLabel = (req, res) => {
  try {
    req
      .checkBody("labelID", "labelID required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      const labelData = {
        labelID: req.body.labelID
      };
      noteService.deleteLabel(labelData, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.updateLabel = (req, res) => {
  try {
    req
      .checkBody("labelID", "labelID required")
      .not()
      .isEmpty();
    req
      .checkBody("editLabel", "editLabel required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      const labelData = {
        editLabel: req.body.editLabel,
        labelID: req.body.labelID
      };
      noteService.updateLabel(labelData, (err, result) => {
        console.log("labelDAta",labelData);     
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};


exports.saveLabelToNote = (req, res) => {
  try {
      req.checkBody('noteID', 'noteID required').not().isEmpty();
      var errors = req.validationErrors();
      var response = {};
      if (errors) {
          response.status = false;
          response.error = errors;
          return res.status(422).send(response);
      } else {
          var responseResult = {};
          noteID = req.body.noteID;
          noteService.saveLabelToNote(req.body, (err, result) => {
              if (err) {
                  responseResult.status = false;
                  responseResult.error = err;
                  res.status(500).send(responseResult);
              } else {
                  responseResult.status = true;
                  responseResult.data = result;
                  res.status(200).send(responseResult);
              }
          })
      }
  } catch (error) {
      res.send(error)
  }
}


exports.deleteLabelToNote = (req, res) => {
  try {
      console.log("hbgksbkb",req.body);
      
      req.checkBody('noteID', 'noteID required').not().isEmpty();
      var errors = req.validationErrors();
      var response = {};
      if (errors) {
        console.log("err in controller");
        
          response.status = false;
          response.error = errors;
          return res.status(422).send(response);
      } else {
          var responseResult = {};
          
          noteID = req.body.noteID;
          noteService.deleteLabelToNote(req.body, (err, result) => {
              if (err) {
                  responseResult.status = false;
                  responseResult.error = err;
                  res.status(500).send(responseResult);
              } else {
                  responseResult.status = true;
                  responseResult.data = result;
                  console.log(responseResult);         
                  res.status(200).send(responseResult);
              }
          })
      }
  } catch (error) {
      res.send(error)
  }
}
