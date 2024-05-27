const { invalidRequiredConstraint } = require("../utils/responseStd");
const { admin: firebase } = require("../utils/firebase");

const headersVerify = async (req, res, next) => {
  try {
    const headers = req.headers;

    if (
      !headers["access-control-allow-origin"] ||
      !headers["x-frame-options"] ||
      !headers["x-content-type-options"] ||
      !headers["x-xss-protection"]
    ) {
      return res
        .status(400)
        .json(invalidRequiredConstraint("Missing headers."));
    }
    if (
      headers["access-control-allow-origin"] !== "*" ||
      headers["x-frame-options"] !== "deny" ||
      headers["x-content-type-options"] !== "nosniff" ||
      headers["x-xss-protection"] !== "1; mode=block"
    ) {
      return res
        .status(400)
        .json(invalidRequiredConstraint("Invalid headers value."));
    }
    return next();
  } catch (err) {
    console.log(`Error verifying headers: ${err}`);
    return res.status(400).json({
      status: 400,
      message: "Headers Unknown",
      data: [],
    });
  }
};

const authVerify = async (req, res, next) => {
  try {
    const headers = req.headers;
    if (headers["x-original-url"]?.includes("/auth/")) return next();

    const authHeader = headers["authorization"];

    if (!authHeader?.startsWith("Bearer "))
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
        data: [],
      });

    const tokenSession = authHeader?.split("Bearer ")[1];

    if (!tokenSession)
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
        data: [],
      });

    const decodeToken = await firebase.auth().verifyIdToken(tokenSession);
    req.uuid = decodeToken.uid;
    return next();
  } catch (err) {
    console.log(`Error verifying token: ${err}`);
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
      data: [],
    });
  }
};

module.exports = { headersVerify, authVerify };
