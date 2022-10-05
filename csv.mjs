import { parse } from '@vanillaes/csv';
import { createConnection } from 'mysql';
import { readFile } from 'fs';


let con = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'XXXXXXXXXXXXXXXXXXX'
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
});


readFile('C:/Users/danrs/Dropbox/PSU/Fall 2022/CMPSC 483W/CSVs/studentsFinal.csv', 'utf8', function(err, data) {
    let students = parse(data.toString());
    console.log(students);
});
