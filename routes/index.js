const express = require('express');

const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/Userscontroller');
const AuthController = require('../controllers/AuthController');
const FilesController = require('../controllers/FilesController');

const router = express.Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);