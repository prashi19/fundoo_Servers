var jwt = require("jsonwebtoken");
exports.checkToken = (req, res, next) => {
  var token1 = req.headers["token"];
  /**
   * decode token
   **/
  if (token1) {
    console.log("AUTHENTICATION ---> inside if loop");
    /**
     * verifies secret and checks exp
     **/
    jwt.verify(token1, "secretkey", (err, decoded) => {
      if (err) {
        console.log("IN AUTH no valid");
        return res.send({
          success: false,
          message: "Token is not valid"
        });
      } else {
        console.log("IN AUTH vlid");

        req.decoded = decoded;
        next();
      }
    });
  } else {
    console.log("no token");

    /**
     * if there is no token return an error
     **/
    return res.send({
      success: false,
      message: "No token provided."
    });
  }
};

exports.checkTokenAuth = (req, res, next) => {

   //console.log("reuest===>--------------------------------------------------------------------------", req.headers['token']);
    //console.log("reuest===>", req.headers);
   var token1 = req.headers['token'];
  //  console.log("token1---->",token1);
   
   /**
    * 
    **/
   if (token1) {
       /**
        * @description:verifies secret and checks expression
        **/
       jwt.verify(token1, 'secretkey-auth', (err, decoded) => {
           if (err) {
               return res.status(401).send({
                   status: false,
                   message: 'Unauthorised access, please provide valid token!'
               });
           } else {
               req.decoded = decoded;
               next();
           }
       });
   } else {
       /**
        * @description:if there is no token return an error
        **/
       return res.send({
           status: false,
           message: 'No token provided!!'
       });
}
};
