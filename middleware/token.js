const jwt = require("jsonwebtoken");
module.exports = {
  /**
   * importing token
   * @param {*} payload
   */
  GenerateToken(payload) {
    const token = jwt.sign({ payload }, "secretkey", { expiresIn: 86400 });
    const obj = {
      success: true,
      message: "Token Generated Successfully!!",
      token: token
    };
    return obj;
  },

  GenerateTokenAuth(payload) {
    const token = jwt.sign({ payload }, "secretkey-auth", {
      expiresIn: "1D"
    });
    const obj = {
      status: true,
      message: "Token Generated Successfully!!",
      token: token
    };
    return obj;
  }
};
