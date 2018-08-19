const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const SELECT_ALL_STUDENTS_QUERY = 'select * from Students';
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
    res.send('Go to /students to see students');
});

app.get('/students/add', (req, res) => {
    const {name, batch, date} = req.query;
    console.log(date);
    const INSERT_STUDENTS_QUERY = `INSERT INTO Students(Name, Batch, CreatedDate) values('${name}', ${batch}, '${date}')`;
    connection.query(INSERT_STUDENTS_QUERY, (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.send('successfully added student')
        }
        });
});

app.get('/students/update', (req, res) => {
    const {rollno, name, batch, date} = req.query;
    //console.log(date);
    const INSERT_STUDENTS_QUERY = `UPDATE Students SET Name = '${name}', Batch = ${batch}, CreatedDate = '${date}'WHERE RollNo = ${rollno}`;
    connection.query(INSERT_STUDENTS_QUERY, (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.send('successfully added student')
        }
        });
});

app.get('/students/delete', (req, res) => {
    const {rollno} = req.query;
    const DELETE_STUDENTS_QUERY = `DELETE FROM Students where RollNo = ${rollno}`;
    connection.query(DELETE_STUDENTS_QUERY, (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.send('successfully deleted student')
        }
        });
});

app.get('/students/deleteMultiple', (req, res) => {
    const {rollno} = req.query;
    const DELETE_STUDENTS_QUERY = `DELETE FROM Students where RollNo IN (${rollno})`;
    connection.query(DELETE_STUDENTS_QUERY, (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.send('successfully deleted multiple students')
        }
        });
});

app.get('/students', (req, res) => {
    connection.query(SELECT_ALL_STUDENTS_QUERY, (err, results) => {
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