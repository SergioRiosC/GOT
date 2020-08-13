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
    CREATE TABLE GOT.`+ repository_Name +` (
        commitID INT NOT NULL,
        filesChanged VARCHAR(300) NOT NULL,
        repID INT NOT NULL,
        PRIMARY KEY (commitID),
        FOREIGN KEY (repID) REFERENCES GOT.repositories (repositoryID)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION);`;

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