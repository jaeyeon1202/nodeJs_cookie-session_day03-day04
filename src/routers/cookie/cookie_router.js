const express = require("express");
const ctrl = require("../../controller/cookie/cookie_ctrl");

const router = express.Router();

router.get("/", ctrl.index);
router.get("/popup", ctrl.popup);
router.get("/quiz", ctrl.quiz);
router.get("/quiz_popup",ctrl.quiz_popup);

router.get("/makeCookie", ctrl.makeCookie);

router.get("/cart", ctrl.cart);
router.get("/save1", ctrl.save1); //경로만 사용
router.get("/save2/:goods", ctrl.save2); //localhost:3000/cookie/save2/변수
//변수 사용

router.get("/view_list", ctrl.viewlist);
module.exports = router;