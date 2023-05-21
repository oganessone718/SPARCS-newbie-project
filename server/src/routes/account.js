const express = require('express');
var AccountModel = require('../models/account');

const router = express.Router();

class AccountDB {
    static _inst_;
    static getInst = () => {
        if ( !AccountDB._inst_ ) AccountDB._inst_ = new AccountDB();
        return AccountDB._inst_;
    }

    constructor() { console.log("[Account-DB] DB Init Completed"); }

    getAccount = async (user) => {
      const {id, password} = user;
        try {
            const res = await AccountModel.findOne({id: id, password: password});
            if (!res){
              alert("No User. Please check your ID or Password");
              console.log("[Account-DB] Get Error: No User");
              return {success: false};
            }
            return {success: true, account: res};
        } catch (e) {
            console.log(`[Account-DB] login Error: ${ e }`);
            return {success: false};
        }
    }

    signUpAccount = async (user) => {
      const {id, nickName, password} = user;
      try {
          const exist = await AccountModel.findOne({id: id});
          if(exist){
            alert("Already Exist User. Please change your ID");
            console.log("[Account-DB] Get Error: Already Exist User");
            return false;
          }
          const newItem = new AccountModel({id: id, nickName: nickName, password: password, MJ: []});
          newItem.save();
          return true;
      } catch (e) {
          console.log(`[Account-DB] SignUp Error: ${ e }`);
          return false;
      }
  }

}

const accountDBInst = AccountDB.getInst();

router.post('/getInfo', async(req, res) => {
    try {
        const accountInfo = await accountDBInst.getAccount();
        if (accountInfo.success) return res.status(200).json({account: accountInfo.account});
        else return res.status(500).json({ error: "Account Find Error"});
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post('/signUp', async(req, res) => {
    try {
        const { id, nickName, password } = req.body;
        const accountInfo = await accountDBInst.signUpAccount({id: id, nickName: nickName, password: password});
        if (account.success) res.status(200).json({ success: true });
        else res.status(500).json({ error: "Account SignUp Error"})
    } catch (e) {
        return res.status(500).json({ error: e });
    }
})

module.exports = router;