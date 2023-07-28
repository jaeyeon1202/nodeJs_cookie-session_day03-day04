const express = require("express");
const ctrl = require("../../controller/session/session_ctrl");
const router = express.Router();

router.get("/", ctrl.index);
router.get("/set_session", ctrl.setSession);
router.get("/get_session", ctrl.getSession);
router.get("/del_session", ctrl.delSession);

router.get("/login", ctrl.login);
router.post("/login_check", ctrl.loginCheck); 
//get, post 통신방식 
// get방식으로 쓸거면 router.get
// post 방식으로 쓸거면 router.post

router.get("/success", ctrl.success);
router.get("/logout", ctrl.logout);

module.exports = router;