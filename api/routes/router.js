/******************************************************************************
 *  @Purpose        : To provide routes to each webpages.
 *  @file           : routes.js
 *  @author         : PRASHANTH S
 *  @version        : v0.1
 *  @since          : 09-02-2019
 ******************************************************************************/
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
// const noteController= require("../controllers/note.controllers")
middle = require("../authentication/authentication");
const upload = require('../services/fileUpload');
// Contact routes
router.post("/login", userController.login);
router.post("/register", userController.registration);
router.post("/forgot", userController.forgotPassword);
router.post("/resetPassword/:token",middle.checkToken,userController.setPassword);
// router.post('/createNote', middle.checkTokenAuth, noteController.createNote);
// router.get('/getNotes', middle.checkTokenAuth, noteController.getNotes);
// router.put('/updateColor', middle.checkTokenAuth, noteController.updateColor);
// router.put('/reminder', middle.checkTokenAuth, noteController.reminder);
// router.put('/isArchived', middle.checkTokenAuth, noteController.isArchived);
// router.put('/isTrashed', middle.checkTokenAuth, noteController.isTrashed);
router.put('/setProfilePic', middle.checkTokenAuth, upload.single('image'), userController.setProfilePic);
// Export API routes
module.exports = router;
