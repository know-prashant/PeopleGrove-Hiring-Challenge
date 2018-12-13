/**
 * TimeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const stdlib = require('sails-stdlib');
const time = require('moment-timezone');

module.exports = {
  async create(req, res){
    if (_.any(['date', 'time', 'bookedTo'], attr => !req.body[attr] || req.body[attr].trim().length === 0 )) {
      return res.badRequest({error: 'The provided date, time, bookedBy and/or bookedTo are invalid.'});
    }
    try{
		
     //create appointment.
     let record =  await Time.create({
        date: req.body.date,
        time: req.body.time,
        name: req.body.bookedBy ? req.body.bookedBy : 'Anonymous', 
		appointee: req.body.bookedTo
      }).fetch();
      return res.status(200).json(record);
	  
    }catch(err){
      return res.badRequest({error: err.message}, null, err);
    }
  },
  
  async get(req, res){
    if (!req.params.username) {
      return res.badRequest({error: 'The provided username is invalid.'});
    }
    try{
		
     //fetch all appointment for given user.
     let record =  await Time.find({appointee: req.params.username});
     return res.status(200).json(record);
	  
    }catch(err){
      return res.badRequest({error: err.message}, null, err);
    }
  },
  
  async remove(req, res){
    if (!req.params.id) {
      return res.badRequest({error: 'The provided id is invalid.'});
    }
    try{
		
     //fetch all appointment for given user.
     await Time.destroy({id: req.params.id});
     return res.status(200).json('Success');
	  
    }catch(err){
      return res.badRequest({error: err.message}, null, err);
    }
  }
};


