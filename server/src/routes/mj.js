const express = require('express');
var MJModel = require("../models/mj");

const router = express.Router();

class MJDB {
    static _inst_;
    static getInst = () => {
        if ( !MJDB._inst_ ) MJDB._inst_ = new MJDB();
        return MJDB._inst_;
    }

    constructor() { console.log("[MJ-DB] DB Init Completed"); }

    getMJ = async ( ) => {
        try {
            const res = await MJModel.find({});
            return { success: true, data: res };
        } catch (e) {
            console.log(`[MJ-DB] Select Error: ${ e }`);
            return { success: false, data: `DB Error - ${ e }` };
        }
    }

    addMJ = async (user) => {
        const { name, location, specificLocation, mjType } = user;
        try {
            const existName = await MJModel.findOne({ name: name });
            if (existName!==null) {
                console.log("[Account-DB] Get Error: Already Exist NickName");
                return false;
            }
            const newItem = new MJModel({
                name: name,
                location: location,
                specificLocation: specificLocation,
                mjType: mjType,
                like: 0,
                comments: [],
            });
            console.log(newItem);
            const save = newItem.save();
            return true;
        } catch (e) {
            console.log(`[Account-DB] SignUp Error: ${e}`);
            return false;
        }
    };

    insertItem = async ( item ) => {
        const { title, content } = item;
        try {
            const newItem = new MJModel({ title, content });
            const res = await newItem.save();
            return true;
        } catch (e) {
            console.log(`[MJ-DB] Insert Error: ${ e }`);
            return false;
        }
    }

    deleteItem = async ( id ) => {
        try {
            const ODeleteFiler = { _id: id };
            const res = await MJModel.deleteOne(ODeleteFiler);
            return true;
        } catch (e) {
            console.log(`[MJ-DB] Delete Error: ${ e }`);
            return false;
        }
    }

    editItem = async ( id, edittitle, editcontent ) => {
        try {
            const OEditFiler = { _id: id };
            const res = await MJModel.updateOne(OEditFiler,{$set:{title: edittitle, content: editcontent}});
            return true;
        } catch (e) {
            console.log(`[MJ-DB] Edit Error: ${ e }`);
            return false;
        }
    }
}

const mjDBInst = MJDB.getInst();

router.get('/getMj', async (req, res) => {
    try {
        const dbRes = await mjDBInst.getMJ();
        console.log(dbRes);
        return res.status(200).json(dbRes.data);
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post("/addMJ", async (req, res) => {
    try {
        const MJInfo = await mjDBInst.addMJ({
        name: req.body.name,
        location: req.body.location,
        specificLocation: req.body.specificLocation,
        mjType: req.body.mjType,
    });
    if (MJInfo) res.status(200).json({ success: true });
    else res.status(500).json({ error: "MJ SignUp Error" });
    } catch (e) {
    return res.status(500).json({ error: e });
    }
});

module.exports = router;