const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const SELECT_ALL_PRODUCTS_QUERY = 'select * from Students';
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Passwd@123',
    database: 'mysql'
});

connection.connect(err => {
if(err) {
    return err
}
});

//console.log(connection);

app.use(cors());

app.get('/', (req, res) => {
    res.send('Go to /products to see products');
});

app.get('/products/add', (req, res) => {
    const {rno, name} = req.query;
    const INSERT_PRODUCTS_QUERY = `INSERT INTO Students(RNo, FirstName) values(${rno},'${name}')`;
    connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.send('successfully added product')
        }
        });
});

app.get('/products', (req, res) => {
    connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    });
});

app.listen(4000, () => {
    console.log('Product server listening on 4000 port');
});