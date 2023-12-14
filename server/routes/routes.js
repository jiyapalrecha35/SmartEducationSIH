const { verify } = require('jsonwebtoken');
const { signUp, logIn, getQuestions, submitExam } = require('../controllers/controllers');

const router = require('express').Router();
router.post('/signup',signUp);
router.post('/login',logIn);
router.post('/verify',verify);
router.get('/exam/:examID',getQuestions);
router.post('/submitexam/:examID',submitExam);

module.exports = {
    router
}