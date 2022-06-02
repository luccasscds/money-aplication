const mongoose = require('mongoose');

// const user = 'lucass';
// const password = '4iMNgJiPChsPDKRO';
const dataBase = 'db_finance';

module.exports = mongoose.connect(`mongodb://localhost/${dataBase}`);

// module.exports = mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.sbd56.mongodb.net/${dataBase}?retryWrites=true&w=majority`);