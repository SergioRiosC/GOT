const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

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


module.exports = router;