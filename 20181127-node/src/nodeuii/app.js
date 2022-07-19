import Koa from 'koa';
import controllerInit from './controllers/controllerinit';
const router = require('koa-simple-router');
controllerInit.init();