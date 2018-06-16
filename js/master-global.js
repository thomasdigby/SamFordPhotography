//----------------------------------------------------------------------
//	MASTER JS
//
//----------------------------------------------------------------------

//	Dependencies
var gallery = require('./project/gallery');
var imageList = require('./project/image-list');
var Frdialogmodal = require('fr-dialogmodal');
var Frtabs = require('fr-tabs');


//	Main
gallery();
imageList();
console.log(gallery, Frdialogmodal, Frtabs);