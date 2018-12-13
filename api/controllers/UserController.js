/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Hashids = require('hashids');
const hashids = new Hashids(`this is unique salt`, 10);
const stdlib = require('sails-stdlib');
const time = require('moment-timezone');

module.exports = {
  async signup(req, res){
    if (_.any(['name', 'email', 'password'], attr => !req.body[attr] || req.body[attr].trim().length === 0 )) {
      return res.badRequest({error: 'The provided fullName, password and/or email address are invalid.'});
    }
    try{
      // TODO : Improve logic to generate unique username for new users.

      // TODO : save timezone based on user location.
     let record =  await User.create({
        email: req.body.email,
        password: await stdlib('passwords').hashPassword(req.body.password),
        name: req.body.name,
        userName: req.body.username ? req.body.username : req.body.email.replace(/@.*$/,""),
        timezone: req.body.timezone ? req.body.timezone : time.tz.guess()
      })
      .intercept('E_UNIQUE', 'Email or Username Already in use').fetch();
      return res.json(200, record);
	  
    }catch(err){
      return res.badRequest({error: err.message}, null, err);
    }
  },

  async login(req, res){
    //console.log(req.body);
    if (_.any(['email', 'password'], attr => !req.body[attr] || req.body[attr].trim().length === 0 )) {
      return res.badRequest({error: 'The provided password and/or email address are invalid.'});
    }
    try{
      //Check if email exits
     let record = await User.findOne({
        email: req.body.email,
      });

      if(!record){
        throw {message: 'Invalid Email Address'};
      }

      //Verify password
      await stdlib('passwords').checkPassword(req.body.password, record.password);

      return res.status(200).json(record);

    }catch(err){
      return res.badRequest({error: err.message}, null, err);
    }
  },

  async update(req, res){
    if (_.any(['username', 'timezone'], attr => !req.body[attr] || req.body[attr].trim().length === 0 )) {
      return res.badRequest({error: 'The provided username and/or timezone are invalid.'});
    }
    try{
      if(!req.params.id){
        throw {message: 'Missing User Id'};
      }

     //Update user with given id
     let record = await User.update({ id: req.params.id})
     .set({
      userName: req.body.username,
      timezone: req.body.timezone
     }).fetch();

      if(record){
        return res.status(200).json(record);
      }else{
        return res.badRequest({error: 'Some Thing Went Wrong While Updating'}, null, err);
      }

    }catch(err){
      return res.badRequest({error: err.message}, null, err);
    }
  },

  async get(req, res){
    try{
     //Update user with given id
     let record = await User.find();

      if(record){
        return res.status(200).json(record);
      }else{
        return res.badRequest({error: 'Some Thing Went Wrong While Updating'}, null, err);
      }

    }catch(err){
      return res.badRequest({error: err.message}, null, err);
    }
  },
  
  async getUser(req, res){
	  if(!req.params.username){
        throw {message: 'Missing User Name'};
      }
    try{	
     //Update user with given id
     let record = await User.find({userName: req.params.username});

      if(record){
        return res.status(200).json(record);
      }else{
        return res.badRequest({error: 'No user found'}, null, err);
      }

    }catch(err){
      return res.badRequest({error: err.message}, null, err);
    }
  },
  
  async reset(req, res){
    if (_.any(['email', 'password'], attr => !req.body[attr] || req.body[attr].trim().length === 0 )) {
      return res.badRequest({error: 'The provided email and/or password are invalid.'});
    }
    try{	
     //Update user with given id
     let record = await User.update({ email: req.body.email})
     .set({
		password: await stdlib('passwords').hashPassword(req.body.password),
     }).fetch();

      if(record){
        return res.status(200).json(record);
      }else{
        return res.badRequest({error: 'No user found'}, null, err);
      }

    }catch(err){
      return res.badRequest({error: err.message}, null, err);
    }
  }



};


