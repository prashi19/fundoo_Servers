const userService = require("../services/user.services");
const token = require("../../middleware/token");
const sendMail = require("../../middleware/nodemailer");
/**
 *
 * @param {*} req
 * @param {*} res
 */
exports.login = (req, res) => {
  try {
    req.checkBody("Email", "Invaild Email").isEmail();
    req.checkBody("Password", "Invaild Password").isLength({
      min: 6
    });
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      userService.login(req.body, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.message = "Login Failed";
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.message = "Login Successful";
          responseResult.result = result;
          console.log("controller result---->",result);
          
          const payload = {
            user_id: result._id,
            firstName: result.firstName,
            Email: result.Email,
            sucess: true
          };
          console.log("payload--->",payload);
          const obj = token.GenerateTokenAuth(payload);
          responseResult.token = obj;
          console.log("token ======>",obj);
          console.log("response result token------>",responseResult.token)

          res.status(200).send(responseResult);
          // console.log("Response result----------->",responseResult);
          
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
exports.registration = (req, res) => {
  try {
    req
      .checkBody("firstName", "Invalid firstname")
      .isLength({
        min: 3
      })
      .isAlpha();
    req
      .checkBody("lastName", "Invalid lastname")
      .isLength({
        min: 1
      })
      .isAlpha();
    req.checkBody("Email", "Invalid email").isEmail();
    req.checkBody("Password", "Invalid password").isLength({
      min: 6
    });
    var errors = req.validationErrors();
    var responseResult = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      userService.registration(req.body, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.message = "Registration Failed";
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.message = "Registration Successful";
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
exports.forgotPassword = (req, res) => {
  try {
    req.checkBody("Email", "Invalid email").isEmail();
    var responseResult = {};
    userService.forgotPassword(req, (err, result) => {
      console.log("result=====>", result);
      if (err) {
        responseResult.success = false;
        responseResult.error = err;
        res.status(500).send(responseResult);
      } else {
        responseResult.success = true;
        responseResult.result = result;
        console.log("Data in controller=====>", result._id);
        const payload = {
          user_id: responseResult.result._id
        };
        // console.log(payload);
        const obj = token.GenerateToken(payload);
        const url = `http://localhost:3000/resetPassword/${obj.token}`;
        sendMail.sendEMailFunction(url);
        res.status(200).send(url);
      }
    });
  } catch (err) {
    res.send(err);
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
exports.setPassword = (req, res) => {
  try {
    console.log(req.body);
    console.log("Controll");

    req.checkBody("Password", "Invaild Password").isLength({
      min: 6
    });
    var errors = req.validationErrors();
    var responseResult = {};
    if (errors) {
      console.log("USER CONTR False");

      response.status = false;
      response.error = errors;
      res.status(422).send(response);
    } else {
      var responseResult = {};
      userService.resetPassword(req, (err, result) => {
        if (err) {
          console.log("Failed in controller");

          responseResult.success = false;
          responseResult.error = err;
          responseResult.message = "Password reset failed";
          res.status(500).send(responseResult);
        } else {
          console.log("in user controller token is verified giving response");
          responseResult.success = true;
          responseResult.message = "Password reset successfull";
          responseResult.result = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
};
/****************************** */

exports.setProfilePic = (req, res) => {
  try {
      // console.log("req-------------------->",req.decoded);
      // console.log("req-------------------->",req.file.location)
      var responseResult = {};
      userId = req.decoded.payload.user_id;
      let image = (req.file.location)
      userService.setProfilePic(userId, image, (err, result) => {
          // console.log("imageeeeeeeeeeeeeeeeeeeeeeee=>", result);
          if (err) {
              responseResult.success = false;
              responseResult.error = err;
              res.status(500).send(responseResult)
          } else {
              responseResult.status = true;
              responseResult.data = result;
              res.status(200).send(responseResult);
          }
      })
  } catch (error) {
      res.send(error);
  }
}

