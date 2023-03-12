const express = require("express");
const router = express.Router();
const clientsModel = require("../../model/clients.model");
const ResponseError = require("../../module/ResponseError");
const bcrypt = require("../../config/bcrypt");
const clientValidation = require("../../validation/clientValidation");
const jwt = require("../../config/jwt");
const mwAuth = require("../../middleware/mw.token.auth");
const mwIsAdmin = require("../../middleware/mw.IsAdmin");

//new client registration API open to all users
router.post("/register", async (req, res) => {
  try {
    const validateData = await clientValidation.validateRegisterSchema(
      req.body
    );
    const isRegister = await clientsModel.findByMail(validateData.email);
    if (isRegister) {
      throw new ResponseError("DB", ["This mail is in use, try login."]);
    }
    validateData.password = await bcrypt.encryptPass(validateData.password);
    await clientsModel.createNewClient(validateData);
    res.json({
      msg: `new user ${
        validateData.fName + " " + validateData.lName
      } was created, welcome ${validateData.fName}.`,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//login API every registered user
router.post("/login", async (req, res) => {
  try {
    const validateData = await clientValidation.validateLoginSchema(req.body);
    const isRegister = await clientsModel.findByMail(validateData.email);
    if (!isRegister) {
      throw new ResponseError("DB", [
        "invalid email or password, please try again",
      ]);
    }
    if (isRegister.accountSecurity.accountBlocked)
      throw new ResponseError("server", ["blocked account"]);
    const isPassword = await bcrypt.cmpEncryption(
      validateData.password,
      isRegister.password
    );
    if (!isPassword) {
      isRegister.accountSecurity.failedAttempts++;
      if (
        Date.now() - isRegister.accountSecurity.lastLoginAttempt.getTime() <
        900000
      ) {
        if (isRegister.accountSecurity.failedAttempts > 3) {
          await clientsModel.blockAccount(isRegister._id);
        } else {
          await clientsModel.setFailedAttempt(
            isRegister._id,
            isRegister.accountSecurity.failedAttempts
          );
        }
      } else {
        await clientsModel.setFailedAttempt(isRegister._id, 1);
      }
      throw new ResponseError("DB", [
        "invalid email or password, please try again",
      ]);
    }
    const token = await jwt.initializeToken({ id: isRegister._id });
    res.json({ msg: `welcome back ${isRegister.fName}`, token });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// update or change own password all users with valid token
router.patch("/resetpassword", mwAuth, async (req, res) => {
  try {
    const validateData = await clientValidation.validateNewPassSchema(req.body);
    if (validateData.password === validateData.repeatPassword) {
      validateData.password = await bcrypt.encryptPass(validateData.password);
      await clientsModel.setNewPass(req.userData, validateData.password);
      res.json({ msg: "password saved successfully" });
    } else {
      throw new ResponseError("server", ["passwords are not the same"]);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

// open blocked account - only admin can get access
router.patch("/unblock", mwIsAdmin, async (req, res) => {
  try {
    const validateData = await clientValidation.validateUnBlockSchema(req.body);
    const isRegister = await clientsModel.findByMail(validateData.email);
    if (!isRegister) {
      throw new ResponseError("DB", ["invalid email try again"]);
    }
    await clientsModel.unblockAccount(isRegister._id);
    res.json({
      msg: `Unblocked User ${isRegister.fName + " " + isRegister.lName}`,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// update or change own general user information - all users with valid token
router.put("/editclient", mwAuth, async (req, res) => {
  try {
    const validateData = await clientValidation.validateEditClient(req.body);
    updateClient = await clientsModel.editClient(req.userData, {
      ...validateData,
    });
    res.json({ msg: "client updated" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
