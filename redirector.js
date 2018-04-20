let fs = require('fs');
let [node, script, ...args] = process.argv;

let read_file = (args[0] !== undefined) ? args[0] : false;
let write_file = (args[1] !== undefined) ? args[1] : false;

// logit
log = console.log;

if(args[0] === 'help' || args[0] === '-help'){
    log(`I am the redirector, I create redirections from csv files`);
    log(`give me a read file in argv1 and an output file in argv2, like so:\n`);
    log(`:~$ node redirection.js input-urls.csv my-output.csv\n`);
    log(`give me nothing and that is just what you'll get in return`);
    return;
}

if(!read_file || !write_file){
    if(!read_file){
        log(`You didn't give us read file, you need 'help'`)
    }else{
        log(`You didn't give us write file, you need '-help'`)
    }
    return;
}
// log(read_file + '\n');
// log(write_file + '\n');

/*-- CHANGE THESE TO REDIRECT WHATEVER YOU NEED --*/
// Set your regex to search for and your string to use as replacement
const REGEX_SEARCH = /\/(\d\d[0-9].)\/([0-9].)\/([0-9].)/;
const REPLACE_WITH = '/blog';
/*-- CHANGE THESE TO REDIRECT WHATEVER YOU NEED --*/

/*
*   This reads files! Give it a file and do WHAT??!?!?
*/
const readDo = function(read_file, what_callback){        
        fs.readFile( read_file, 'utf8', (error, data) => {
            // trap error
            if(error) throw error;
            // do what you came here for!
            what_callback(data);
        });// end fs.readFile()
}// end readDo()

const writeFile = function( write_what, what_file ){
    fs.appendFile( what_file, write_what, (err) => {
        if (err) throw err;
        console.log(`'${write_what}' written to ${what_file}`);
    });
}// end writeFile()

/*
*   Iterates over your rows
*/
const loopRows = function(csvdata){
    let rows = csvdata.split('\n');
    // remove the top of the array, headers in our case
    rows.shift();
    // spit out rows
    // log(rows);

    rows.map(loopColumns);
}// end loopRows

/*
*   This loops the columns and does important things
*/
const loopColumns = function(rowData){
    let columns = rowData.split(',');
    let oldUlr = columns[0];
    columns = columns.map(col => col.replace(/['"]+/g, ''));
    let newUrl = columns.map( col => stringCleaning(col, REGEX_SEARCH, REPLACE_WITH));
    // log(`${newUrl[0]}\n`);
    if(oldUlr !== ''){
        writeFile(`"${oldUlr}","${newUrl[0]}","301","plain"\n`, write_file);
    }
}// end loopColumns
/*
*   This is the special sauce that transforms your column strings if a search is found!
*/
const stringCleaning = function(string, search, replace){
    return string.replace(search, replace);
}// end stringCleaning()

// This story starts with a murder!
fs.unlink(write_file, (err) => {
    // removed the file we're writing to just in case
    if (err) {
        log(`${write_file} doesn't exist yet`);
    }else{
        log(`${write_file} was deleted`);
    };

    // set the first line
    writeFile(`Origin,Target,Type,Format\n`, write_file);
    // do all the things a redirector should do
    readDo(read_file, loopRows);
    
});
