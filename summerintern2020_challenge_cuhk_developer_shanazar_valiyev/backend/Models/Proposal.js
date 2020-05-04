const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let formSchema = new Schema({
  projectname: {
    type: String
  },
  goal: {
    type: String
  },
  desc: {
    type: String
  },
  date: {
    type: String   
  },
  location: {
    type: String
  },
  obj: {
    type: String
  }
}, {
    collection: 'forms'
  })

module.exports = mongoose.model('Form', formSchema)