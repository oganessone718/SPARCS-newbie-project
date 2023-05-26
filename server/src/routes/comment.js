const express = require('express');
var CommentModel = require("../models/comment");

const router = express.Router();

class CommentDB {
    static _inst_;
    static getInst = () => {
        if ( !CommentDB._inst_ ) CommentDB._inst_ = new CommentDB();
        return CommentDB._inst_;
    }

    constructor() { console.log("[Comment-DB] DB Init Completed"); }

    getComment = async (mjName) => {
        try {
            const res = await CommentModel.find({mjName: mjName.mjName});
            return { success: true, data: res };
        } catch (e) {
            console.log(`[Comment-DB] Select Error: ${ e }`);
            return { success: false, data: `DB Error - ${ e }` };
        }
    }

    addComment = async (user) => {
        const { mjName, ID, nickName, comment } = user;
        try {
            const newItem = new CommentModel({
                mjName: mjName,
                ID: ID,
                nickName: nickName,
                comment: comment
            });
            const save = newItem.save();
            return true;
        } catch (e) {
            console.log(`[Account-DB] SignUp Error: ${e}`);
            return false;
        }
    };

    deleteComment = async ( info ) => {
        try {
            const ODeleteFiler = { ID: info.id };
            const res = await CommentModel.deleteOne(ODeleteFiler);
            return true;
        } catch (e) {
            console.log(`[MJ-DB] Delete Error: ${ e }`);
            return false;
        }
    }

}

const commentDBInst = CommentDB.getInst();

router.post('/getComment', async (req, res) => {
    try {
        const dbRes = await commentDBInst.getComment({
            mjName: req.body.mjName,
        });
        return res.status(200).json(dbRes.data);
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post("/addComment", async (req, res) => {
    try {
        const CommentInfo = await commentDBInst.addComment({
        mjName: req.body.mjName,
        ID: req.body.ID,
        nickName: req.body.nickName,
        comment: req.body.comment
    });
    if (CommentInfo) res.status(200).json({ success: true });
    else res.status(500).json({ error: "MJ SignUp Error" });
    } catch (e) {
    return res.status(500).json({ error: e });
    }
});

router.post("/deleteComment", async (req, res) => {
    try {
        const CommentInfo = await commentDBInst.deleteComment({
        id: req.body.id
        });
        if (CommentInfo) res.status(200).json({ success: true });
        else res.status(500).json({ error: "Comment SignUp Error" });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

module.exports = router;