const Clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey: '24706fc619724752b6498fcdd0689d05'
  })

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)  
	.then(data => res.json(data))
	.catch(err => res.status(400).json('Unable to work with api'))
}  

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entires', 1)
	.returning('entires')
	.then(entries => {
		res.json(entries);
	})
	.catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}