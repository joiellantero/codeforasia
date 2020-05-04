let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Form Model
let formSchema = require('../Models/Proposal');

// CREATE Form
router.route('/create-form').post((req, res, next) => {
  formSchema.create(req.body, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// READ Forms
router.route('/').get((req, res) => {
  formSchema.find((error, data) => {
    if (error) {
      console.log(error)
    } else {
      res.json(data)
    }
  })
})

// Get Form
// DOESNT WORK, PROBELM IN FRONTEND 
router.route('/edit-form/:id').get((req, res) => {
  formSchema.findById(req.params.id, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      res.json(data)
      console.log('BEEEEEEP!')
    }
  })
})


// Update Form
router.route('/update-form/:id').put((req, res, next) => {
  formSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      res.json(data)
      console.log('Form updated successfully !')
    }
  })
})

// Delete Form
router.route('/delete-form/:id').delete((req, res, next) => {
  formSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;