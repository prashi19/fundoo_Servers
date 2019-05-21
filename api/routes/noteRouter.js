const express = require("express");
const router = express.Router();
const noteController= require("../controllers/note.controllers")
middle = require("../authentication/authentication");

router.post('/createNote', middle.checkTokenAuth, noteController.createNote);
router.get('/getNotes', middle.checkTokenAuth, noteController.getNotes);
router.put('/updateColor', middle.checkTokenAuth, noteController.updateColor);
router.put('/reminder', middle.checkTokenAuth, noteController.reminder);
router.put('/isPinned', middle.checkTokenAuth, noteController.isPinned);
router.put('/isArchived', middle.checkTokenAuth, noteController.isArchived);
router.put('/isTrashed', middle.checkTokenAuth, noteController.isTrashed);
router.put('/editTitle', middle.checkTokenAuth, noteController.editTitle);
router.put('/editDescription', middle.checkTokenAuth, noteController.editDescription);
router.post('/pushNotification',middle.checkTokenAuth,noteController.notification);
router.get('/sendNotification/:userid',noteController.sendNotification);
router.post('/deleteNote', middle.checkTokenAuth, noteController.deleteNote);
router.post('/addLabel',middle.checkTokenAuth,noteController.addLabel);
router.get('/getLabels',middle.checkTokenAuth,noteController.getLabels);
router.post('/deleteLabel',middle.checkTokenAuth,noteController.deleteLabel);
router.put('/updateLabel',middle.checkTokenAuth,noteController.updateLabel);
router.post('/saveLabelToNote', middle.checkTokenAuth, noteController.saveLabelToNote);
router.post('/deleteLabelToNote', middle.checkTokenAuth, noteController.deleteLabelToNote);

// router.post('/saveCollaborator', middle.checkTokenAuth, collaboratorController.saveCollaborator);
// router.get('/getCollaboratorDetails', middle.checkTokenAuth, collaboratorController.getCollaboratorDetails);
module.exports = router;
