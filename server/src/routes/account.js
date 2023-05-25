const express = require("express");
var AccountModel = require("../models/account");

const router = express.Router();

class AccountDB {
  static _inst_;
  static getInst = () => {
    if (!AccountDB._inst_) AccountDB._inst_ = new AccountDB();
    return AccountDB._inst_;
  };

  constructor() {
    console.log("[Account-DB] DB Init Completed");
  }

  signUpAccount = async (user) => {
    const { nickName, id, password } = user;
    try {
      const existNickName = await AccountModel.findOne({ nickName: nickName });
      if (existNickName!==null) {
        console.log("[Account-DB] Get Error: Already Exist NickName");
        return false;
      }
      const existID = await AccountModel.findOne({ accountID: id });
      if (existID!==null) {
        console.log("[Account-DB] Get Error: Already Exist ID");
        return false;
      }
      const newItem = new AccountModel({
        nickName: nickName,
        accountID: id,
        password: password,
        MJ: [],
      });
      const save = newItem.save();
      return true;
    } catch (e) {
      console.log(`[Account-DB] SignUp Error: ${e}`);
      return false;
    }
  };

  loginAccount = async (user) => {
    const { id, password } = user;
    try{
        const existID = await AccountModel.findOne({ accountID: id });
        
        if (existID===null) {
            console.log("[Account-DB] Get Error: No such ID");
            return {success:false};
        }
        if (existID.password==password) {
          console.log("[Account-DB] Login Success");
            return {success:true, accountID:existID.accountID};
        }
        else{
            console.log("[Account-DB] Get Error: Wrong Password");
            return {success:false};
        }
        
    } catch (e) {
        console.log(`[Account-DB] Login Error: ${e}`);
        return {success:false};
    }
  };

  getInfo = async (user) => {
    console.log("user: ");
    console.log(user);
    const { id } = user;
    console.log(id)
    try{
        const Account = await AccountModel.findOne({ accountID: id });
        console.log("getInfo's account "+Account)
        if (Account===null) {
            console.log("[Account-DB] Get Error: No such ID");
            return {success:false};
        }else{
            return {success:true, accountID:Account.accountID, nickName:Account.nickName, MJ:Account.MJ};
        }
        
    } catch (e) {
        console.log(`[Account-DB] Login Error: ${e}`);
        return {success:false};
    }
  };
}

const accountDBInst = AccountDB.getInst();



router.post("/signUp", async (req, res) => {
  try {
    const accountInfo = await accountDBInst.signUpAccount({
      nickName: req.body.NickName,
      id: req.body.ID,
      password: req.body.Password
    });
    if (accountInfo) res.status(200).json({ success: true });
    else res.status(500).json({ error: "Account SignUp Error" });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.post("/login", async (req, res) => {
  try {
    const accountInfo = await accountDBInst.loginAccount({
        id: req.body.ID,
        password: req.body.Password
      }
    );
    
    if (accountInfo)
      return res.status(200).json({ success: true, ID:accountInfo.accountID });
    else return res.status(500).json({ error: "Account Find Error" });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.post("/myPage", async (req, res) => {
  try {
    console.log("WHYRANO");
    const accountInfo = await accountDBInst.getInfo({
        id: req.body.loggedID,
      }
    );
    console.log(accountInfo);
    if (accountInfo.success)
      return res.status(200).json({ ID:accountInfo.accountID, NickName:accountInfo.nickName, MJ:accountInfo.MJ });
    else return res.status(500).json({ error: "Account Find Error" });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

module.exports = router;
