const express = require('express');
const auth = require('./auth');


module.exports = function(server){
    // open routes
    const openApi = express.Router();
    server.use('/oapi', openApi);
    
    const AuthService = require('../api/user/authService');
    openApi.post('/login', AuthService.login);
    openApi.post('/signup', AuthService.signup);
    openApi.post('/validateToken', AuthService.validateToken);
    

    // protect routers api
    const protectApi = express.Router();
    server.use('/api', protectApi);

    protectApi.use(auth);
    
    const billingCycleService = require('../api/billingCycle/billingCycleService');
    billingCycleService.register(protectApi, '/billingCycles');

    const billingSummaryService = require('../api/billingSummary/billingSummaryService');
    protectApi.route('/billingSummary').get(billingSummaryService.getSummary);
}