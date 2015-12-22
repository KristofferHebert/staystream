/**
 * Idea.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {
        name: {
            type: 'string',
            maxLength: 35
        },
        content: {
            type: 'string',
            minLength: 20,
            maxLength: 400
        },
        stream: {
            model: 'stream'
        },
        tags: {
            collection: 'tag',
            via: 'ideas',
            dominant: true
        },
		owner: {
			type: 'string'
		}
	}
};
