const express = require("express");
const router = express.Router()
//import controller
const {sendFeedback} = require("../controllers/Feedback");

//define api routes
router.post("/sendFeedback", sendFeedback);


module.exports = router;
