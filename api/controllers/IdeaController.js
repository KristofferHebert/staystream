/**
 * IdeaController
 *
 * @description :: Server-side logic for managing ideas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	search: function(req, res){

		var query = req.query.q || ""
		Idea.find()
		.where({
			or: [
				{ name: { contains: query}},
				{ content: { contains: query}}
			]
		})
		.exec(function(err, data){
			if(err) res.json(err)
			res.json(data)
		})
	}
};
