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
            const save = newItem.save();
            return true;
        } catch (e) {
            console.log(`[Account-DB] SignUp Error: ${e}`);
            return false;
        }
    };

    likeMJ = async ( name ) => {
        try {
            const OLikeFiler = { name: name.name };
            const res = await MJModel.updateOne(OLikeFiler,{$inc:{like: 1}});
            return true;
        } catch (e) {
            console.log(`[MJ-DB] Insert Error: ${ e }`);
            return false;
        }
    }

    deleteMJ = async ( name ) => {
        try {
            const ODeleteFiler = { name: name.name };
            const res = await MJModel.deleteOne(ODeleteFiler);
            return true;
        } catch (e) {
            console.log(`[MJ-DB] Delete Error: ${ e }`);
            return false;
        }
    }

    editMJ = async ( mj ) => {
        const { oldName, name, location, specificLocation, mjType } = mj;
        try {
            const OEditFiler = { name: oldName };
            const res = await MJModel.updateOne(OEditFiler,{$set:{name: name, location: location, specificLocation: specificLocation, mjType: mjType}});
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

router.post("/deleteMJ", async (req, res) => {
    try {
        const MJInfo = await mjDBInst.deleteMJ({
        name: req.body.name
        });
        if (MJInfo) res.status(200).json({ success: true });
        else res.status(500).json({ error: "MJ SignUp Error" });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post("/likeMJ", async (req, res) => {
    try {
        const MJInfo = await mjDBInst.likeMJ({
            name: req.body.name
        });
        if (MJInfo) res.status(200).json({ success: true });
        else res.status(500).json({ error: "MJ Like Error" });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post("/editMJ", async (req, res) => {
    try {
        const MJInfo = await mjDBInst.editMJ({
            oldName: req.body.oldName,
            name: req.body.name,
            location: req.body.location,
            specificLocation: req.body.specificLocation,
            mjType: req.body.mjType,
        });
        if (MJInfo) res.status(200).json({ success: true });
        else res.status(500).json({ error: "MJ Like Error" });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

module.exports = router;