const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const path = require('path');
const { Router } = require('express');
const {Diff}=require('../Diff/diff');
const fs = require('fs');

var repositoryInUse = 'repository';
var repositoryInUseID = 1;

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

    mysqlConnection.query(`
        SELECT route FROM  files where name = '`+path.basename(fileName)+`'
    `, [fileName], (err, rows, fields) => {
        
        if(!err){
            if(rows[0] == undefined){

                mysqlConnection.query(`insert into GOT.files (name, route, repID) values 
                ("`+path.basename(fileName)+`", "`+fileName+`",`+repositoryInUseID+`)` 
                , [fileName], (err, rows, fields) => {
                    if(!err){
                    }else{
                        console.log(err);
                    }
                })

            }
            else{

                Diff(fileName);

            }

            res.json({
                Status: 200
            });

        }else{
            console.log(err);
            throw err;
        }
    });

    console.log("FILENAME= "+fileName);
    
    
});


router.get('/status',(req,res)=>{
    const {fileName} = req.query;
    if(fileName == undefined){
        mysqlConnection.query(`       
            SELECT filesChanged FROM repository ORDER BY commitID DESC LIMIT 0, 1
        `, [fileName], (err, rows, fields) => {
            if(!err){
                res.json({"changes": rows[0]});
            }else{
                console.log(err);
            }

        })

    }
});

router.get("/reset", (req,res)=>{
    const {fileName} = req.query;
    if(fileName != undefined){
        mysqlConnection.query(`       
        SELECT route FROM files where name = '`+path.basename(fileName)+`'
    `, [fileName], (err, rows, fields) => {
        if(!err){
            fs.createReadStream(rows[0]['route']).pipe(fs.createWriteStream(fileName) );
            res.json({"STATUS" : 200});
        }else{
            console.log(err);
        }

    })
    }    
    });

module.exports = router;