const BillingCycle = require('./billingCycle');
const _ = require('lodash');

BillingCycle.methods(['get', 'post', 'put', 'delete']);
BillingCycle.updateOptions({ new: true, runValidators: true });

BillingCycle.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext);

function sendErrorsOrNext(req, res, next){
    const {bundle} = res.locals;

    if(bundle.errors){
        const errors = parseErrors(bundle.errors);
        res.status(500).json({errors});
    } else {
        next();
    }
}

function parseErrors(nodeResultFulErrors){
    const errors = [];
    _.forIn(nodeResultFulErrors, error => errors.push(error.message));
    return errors;
}

BillingCycle.route('count', (req, res) => {
    BillingCycle.count( (error, value) => {
        if(error) {
            res.status(500).json({errors: [error]});
        }else{
            res.json({value});
        }
    })
})

module.exports = BillingCycle;