/**
* Tag.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      name: {
          unique: true,
          minLength: 3,
          maxLength: 25
      },
      ideas: {
          collection: 'idea',
          via: 'tags'
      }
  }
};
