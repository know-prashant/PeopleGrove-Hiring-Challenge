/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'appointment',
  attributes: {

    date: {
      columnName: 'date',
      type: 'string',
      required: true,
      maxLength: 200,
      example: 'Wed Dec 12 2018 15:37:01 GMT+0530 (India Standard Time)'
    },

    name: {
      columnName: 'name',
      type: 'string',
      required: true,
      description: 'Full representation of the nominee\'s name',
      maxLength: 120,
      example: 'Anonymous / Prashant Yadav'
    },
	
	time: {
	  columnName: 'time',
      type: 'string',
      required: true,
      description: 'Appointed time',
      maxLength: 120,
      example: '09:00, 10:00'
	},
	
	appointee : {
	  columnName: 'appointee',
      type: 'string',
      required: true,
      maxLength: 120,
      example: 'Prashant Yadav'
	}
	

  },

};

