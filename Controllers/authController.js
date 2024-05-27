const { v4: uuidv4 } = require("uuid");
const { invalidRequiredConstraint } = require("../utils/responseStd");
const { admin: firebase, firebaseAuth } = require("../utils/firebase");
const { signInWithEmailAndPassword } = require("firebase/auth");
const moment = require("moment");

class AuthController {
  registerValidation = (schema) => async (req, res, next) => {
    try {
      await schema.validate(req.body);
      return next();
    } catch (e) {
      return res.status(400).json(invalidRequiredConstraint(e.message));
    }
  };

  loginValidation = (schema) => async (req, res, next) => {
    try {
      await schema.validate(req.body);
      return next();
    } catch (e) {
      return res.status(400).json(invalidRequiredConstraint(e.message));
    }
  };

  getUserUid = async (req) => {
    try {
      const userUid = await signInWithEmailAndPassword(
        firebaseAuth,
        req.body.email,
        req.body.password
      );
      const { reloadUserInfo, stsTokenManager } = userUid.user;

      return {
        uuid: reloadUserInfo.localId,
        email: reloadUserInfo.email,
        username: reloadUserInfo.displayName,
        tokenSession: stsTokenManager.accessToken,
        timestamp: moment().add(7, "hours").format("YYYY-MM-DD HH:mm:ss"),
      };
    } catch (err) {
      console.log(`Error getting user: ${err}`);
      return -1;
    }
  };

  register = async (req, res) => {
    const { username, email, password } = req.body;
    const body = {
      uid: uuidv4(),
      displayName: username,
      email,
      password,
    };
    try {
      const userUid = await firebase.auth().createUser(body);
      return res.status(201).json({
        status: 201,
        message: "User created successfully",
        data: [{ uuid: userUid.uid }],
      });
    } catch (err) {
      console.log(`Error creating user: ${err}`);
      return res.status(400).json({
        status: 400,
        message: err.message,
        data: [],
      });
    }
  };

  login = async (req, res) => {
    const userUid = await this.getUserUid(req);
    if (userUid !== -1)
      return res.status(200).json({
        status: 200,
        message: "User logged in successfully",
        data: [
          {
            ...userUid,
          },
        ],
      });
    return res.status(400).json({
      status: 400,
      message: "User is not found",
      data: [],
    });
  };
}

module.exports = AuthController;
