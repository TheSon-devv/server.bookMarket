const express = require('express')
const app = express()
const bodyParser = require('body-parser')


const port = 3000

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


var mysql = require('mysql')
var con = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "thesonk7",
	database : "EmployDB",
	multipleStatements : true
});

con.connect( (err) => {
	if (err) throw err;
	console.log('Connected !')
});

//Customer------------------------------------------------------
app.get('/employdb/customer',(req,res) => {
	con.query('SELECT * FROM customer',(err,rows,fields) => {
		if(!err) 
			res.send(rows);
		else
			console.log(err);
	})
});



app.delete('/employdb/customer/:id',(req,res) => {
	con.query('DELETE FROM customer WHERE idCustomer = ?',[req.params.id],(err,rows,fields) => {
		if(!err) 
			res.json('Delete customer successfully');
		else
			console.log(err);
	})
});

app.post('/employdb/customer',(req,res) => {
	let emp = req.body;
	var sql = "SET @idCustomer = ? ;SET @nameCustomer = ?;SET @phone = ?;SET @address = ? ;SET @sex = ?;SET @sile = ?; \
	CALL EmployAddOrEditCustomer(@idCustomer,@nameCustomer,@phone,@address,@sex,@sile);";
	con.query(sql,[emp.idCustomer,emp.nameCustomer,emp.phone,emp.address,emp.sex,emp.sile],(err,rows,fields) => {
		if(!err) {
			rows.forEach(element => {
				if(element.constructor == Array)
				res.json('Post customer successful id : ' + element[0].idCustomer);
			});
			console.log(req.body);
		}
		else
			console.log(err);
	})
});


app.put('/employdb/customer',(req,res) => {
	let emp = req.body;
	var sql = "SET @idCustomer = ? ;SET @nameCustomer = ?;SET @phone = ?;SET @address = ? ;SET @sex = ?;SET @sile = ?; \
	CALL EmployAddOrEditCustomer(@idCustomer,@nameCustomer,@phone,@address,@sex,@sile);";
	con.query(sql,[emp.idCustomer,emp.nameCustomer,emp.phone,emp.address,emp.sex,emp.sile],(err,rows,fields) => {
		if(!err) 
			res.json('Updated customer successfull');
		else
			console.log(err);
	})
});
//Customer----------------------------------------


//Book---------------------------------------------------

app.get('/employdb/book',(req,res) => {
	con.query('SELECT * FROM book',(err,rows,fields) => {
		if(!err) 
			res.send(rows);
		else
			console.log(err);
	})
});

app.post('/employdb/book',(req,res) => {
	let emp = req.body;
	var sql = "SET @idBook = ? ;SET @nameBook = ?;SET @price = ?;SET @exist = ? ;SET @sale = ?;SET @input = ?; \
	CALL EmployAddOrEditBook(@idBook,@nameBook,@price,@exist,@sale,@input);";
	con.query(sql,[emp.idBook,emp.nameBook,emp.price,emp.exist,emp.sale,emp.input],(err,rows,fields) => {
		if(!err) {
			rows.forEach(element => {
				if(element.constructor == Array)
				res.json('Post book successfully id : ' + element[0].idBook);
			});
			console.log(req.body);
		}
		else
			console.log(err);
	})
});

app.put('/employdb/book',(req,res) => {
	let emp = req.body;
	var sql = "SET @idBook = ? ;SET @nameBook = ?;SET @price = ?;SET @exist = ? ;SET @sale = ?;SET @input = ?; \
	CALL EmployAddOrEditBook(@idBook,@nameBook,@price,@exist,@sale,@input);";
	con.query(sql,[emp.idBook,emp.nameBook,emp.price,emp.exist,emp.sale,emp.input],(err,rows,fields) => {
		if(!err) {
			res.json('Updated book successfull');
		}
		else
			console.log(err);
	})
});

app.delete('/employdb/book/:id',(req,res) => {
	con.query('DELETE FROM book WHERE idBook = ?',[req.params.id],(err,rows,fields) => {
		if(!err) 
			res.json('Delete book successfully');
		else
			console.log(err);
	})
});
//Book---------------------------------------------------

//Bill---------------------------------------------------

app.get('/employdb/bill',(req,res) => {
	con.query('SELECT bill.*,customer.nameCustomer,customer.phone,book.nameBook,book.price FROM bill,book,customer WHERE customer.idCustomer=bill.idCustomer AND book.idBook=bill.idBook;',(err,rows,fields) => {
		if(!err) 
			res.send(rows);
		else
			console.log(err);
	})
});

app.post('/employdb/bill',(req,res) => {
	let emp = req.body;
	var sql = "SET @idBill = ? ;SET @maBill = ?;SET @date = ?;SET @time = ? ;SET @idCustomer = ?;SET @idBook = ?; \
	CALL EmployAddOrEditBill(@idBill,@maBill,@date,@time,@idCustomer,@idBook);";
	con.query(sql,[emp.idBill,emp.maBill,emp.date,emp.time,emp.idCustomer,emp.idBook],(err,rows,fields) => {
		if(!err) {
			rows.forEach(element => {
				if(element.constructor == Array)
				res.json('Post bill successful : ' + element[0].idBill);
			});
			console.log(req.body);
		}
		else
			console.log(err);
	})
});

app.put('/employdb/bill',(req,res) => {
	let emp = req.body;
	var sql = "SET @idBill = ? ;SET @maBill = ?;SET @date = ?;SET @time = ? ;SET @idCustomer = ?;SET @idBook = ?; \
	CALL EmployAddOrEditBill(@idBill,@maBill,@date,@time,@idCustomer,@idBook);";
	con.query(sql,[emp.idBill,emp.maBill,emp.date,emp.time,emp.idCustomer,emp.idBook],(err,rows,fields) => {
		if(!err) {
			res.json('Updated bill successful');
		}
		else
			console.log(err);
	})
});

app.delete('/employdb/bill/:id',(req,res) => {
	con.query('DELETE FROM bill WHERE idBill = ?',[req.params.id],(err,rows,fields) => {
		if(!err) 
			res.json('Delete bill successfully');
		else
			console.log(err);
	})
});
//Bill---------------------------------------------------


app.listen(port , () => {
	console.log(`Example app listening at http://localhost:${port}`)
});