import express from 'express';
import transactions from './src/scripts/transactions.json';

const app = express();
app.use(express.static('public'));

function filterTransactions(statuses,types){
    return function (transaction) {
     var hasStatus = statuses ? statuses.includes(transaction.status) : true ;
     var hasType = types ? types.includes(transaction.type) : true;
     return hasStatus && hasType	  
   }
}
 app.get('/transactions', function (req, res) {
  var {status , pageNumber, type} = req.query;
  var limit = 5 ;
  var filtered = transactions.filter(filterTransactions(status,type));
  var start= pageNumber ? pageNumber*limit : 0 ;
  var end = start+limit;
  var paginated = filtered.slice(start,end)
  var numberOfPages = Math.ceil(filtered.length/limit);
  //var links = getLinks(pageNumber,start,end,filtered);
  var response = {data:paginated,numberOfPages}
  res.send(response)
});

app.listen(8080, () => {
  console.log('Sales History app listening on port 8080');
});
