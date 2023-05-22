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
        const {nickName, id, password} = user;
        try {
            const existNickName = await AccountModel.findOne({nickName: nickName});
            if(existNickName){
                alert("Already Exist NickName. Please change your NickName");
                console.log("[Account-DB] Get Error: Already Exist NickName");
                return false;
            }
            const existID = await AccountModel.findOne({id: id});
            if(existID){
                alert("Already Exist ID. Please change your ID");
                console.log("[Account-DB] Get Error: Already Exist ID");
                return false;
            }
            const newItem = new AccountModel({nickName: nickName, id: id, password: password, MJ: []});
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
        const { nickName, id, password } = req.body;
        const accountInfo = await accountDBInst.signUpAccount({nickName: nickName, id: id, password: password});
        if (accountInfo) res.status(200).json({ success: true });
        else res.status(500).json({ error: "Account SignUp Error"})
    } catch (e) {
        return res.status(500).json({ error: e });
    }
})

module.exports = router;