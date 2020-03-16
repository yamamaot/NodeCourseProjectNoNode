
var express = require('express');
var router = express.Router();

let serverOrderList = []; // our "permanent storage" on the web server

// define a constructor to create objects
var ProductObject = function (pProductName, pPrice) {
  this.ProductName = pProductName;
  this.Price = pPrice;
}

var OrderObject = function (pArray){
  this.Array = pArray;
}

// for testing purposes, its nice to preload some data
//serverOrderList.push(new OrderObject[0, 0, 1]);


/* POST to addMovie */
router.post('/addOrder', function(req, res) {
  console.log(req.body);
  serverOrderList.push(req.body);
  console.log(serverOrderList);
  //res.sendStatus(200);
  res.status(200).send(JSON.stringify('success'));
});


/* GET movieList. */
router.get('/orderList', function(req, res) {
  res.json(serverOrderList);
 });

 /* DELETE to deleteMovie. */
 router.delete('/deleteOrder/:Index', function(req, res) {
  let Index = req.params.Index;
  console.log('deleting Order at Index: ' + Index);
  serverOrderList.splice(Index,1);   
   res.status(200).send(JSON.stringify('deleted successfully'));
});


//  router.???('/userlist', function(req, res) {
//  users.update({name: 'foo'}, {name: 'bar'})



module.exports = router;

