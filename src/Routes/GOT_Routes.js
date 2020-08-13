const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');
const { Router } = require('express');
const {Diff}=require('../Diff/diff');
router.post('/repository', (req, res) => {
    
    const { repository_Name} = req.query;
    //console.log(repository_Name);
    //console.log(req);
    
    const query =`
    create table `+ repository_Name +` (
        id int(11) not null auto_increment,
        name varchar(45) default null,
        salary int(11) default null,
        primary key(id)
    );`;

    mysqlConnection.query(query, [repository_Name], (err, rows, fields) => {
        
        if(!err){
            console.log('Repository '+ repository_Name +' created');
            res.json({
                Status: 200
            });
        }else{
            console.log(err);
        }
        
    });
});

router.post('/files', (req, res) => {
    const {fileName}=req.query;
    console.log("FILENAME= "+fileName);
    Diff(fileName);
    res.json({
        Status: 200
    });
    
    /*
    const{exec}=require('child_process');
    const cd=exec('cd Diff' ,function(error, stdout, stderr){
        if(error){
            console.log(error.stack);
            console.log('code: '+error.code);
            console.log('signal: '+error.signal);
        }
    });
    const diff=exec('node dif.js',function(error, stdout, stderr){
        if(error){
            console.log(error.stack);
            console.log('code: '+error.code);
            console.log('signal: '+error.signal);
        }
    });
    */
});


module.exports = router;