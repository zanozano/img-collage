//  dependencies
const express = require('express');
const app = express();

const expressFileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const fs = require('fs');

// server
app.listen(3000, () => {
	console.log('Server on in port 3000');
});

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// express-fileupload with middleware
app.use(
	expressFileUpload({
		limits: { fileSize: 5000000 },
		abortOnLimit: true,
		responseOnLimit: 'El peso del archivo que intentas subir supera el limite permitido',
	})
);

// public folder
app.use(express.static('public'));

// archivos folder
app.use(express.static('archivos'));

// root / form
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/formulario.html');
});

// get photo collage
app.get('/collage', (req, res) => {
	res.sendFile(__dirname + '/collage.html');
});

// post images
app.post('/collage', (req, res) => {
	const { target_file } = req.files;
	const { posicion } = req.body;
	target_file.mv(`${__dirname}/archivos/imagen-${posicion}.jpg`, (err) => {
		res.sendFile(__dirname + '/collage.html');
	});
});

// get replace image
app.get('/deleteImg/:nombre', (req, res) => {
	const { nombre } = req.params;
	fs.unlink(`${__dirname}/archivos/${nombre}`, (err) => {
		res.redirect('/collage');
	});
});
