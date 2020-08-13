const lineReader=require('line-reader');
const{exec}=require('child_process');
const fs =require('fs');
const{main} = require('../huffman')

const fname='';
var path=require('path');
var file1='Diff/files/TXT3';
var Name1=path.basename(file1);
var file2='Diff/files/TXT4';
var Name2=path.basename(file2);
var fileSRV='Diff/txtSRV/TXT4';
var cambios=false;
var i=1;
console.log(file1.toString());
console.log(file2);
var modificaciones="";
var nuevosCambios = "";


function Diff(FileC){

    Name2 = path.basename(FileC);
    //fs.createReadStream(FileC).pipe(fs.createWriteStream(file2));


    lineReader.open(FileC, function(err,reader1){
        lineReader.open(file2, function(err,reader2){
            while(reader1.hasNextLine() ||reader2.hasNextLine()){
                reader1.nextLine(function(err, line1){
                    reader2.nextLine(function(err, line2){
                        
                        modificaciones=modificaciones+line2+"\n";
                        if(line1==line2){
                            console.log("iguales");
                        }else{
                            cambios=true;
                            
                            console.log("Existe una diferencia en la linea "+i+" de los archivos");
                            console.log("Archivo llamado "+Name1+" contiene: "+line1+"\n"+
                                        "Archivo llamado "+Name2+" contiene: "+line2);
                            
                            nuevosCambios = nuevosCambios + i + "|" + line1 + "=>" + line2 + ", ";
                            var CambioTXT= i+"|"+line1+"=>"+line2+"\n";
                            fs.appendFile('Cambios.txt',CambioTXT, (error)=>{
                                if(error){throw error;}
                                console.log("Archivo con nuevos cambios guardados");
                                
                            });
                        }
                    });
                });
                i++;
            }
            exec('touch ../changedFiles/'+Name2+'.json');
            //fs.createReadStream('../changedFiles/prefab.json').pipe(fs.createWriteStream('../changedFiles/'+Name2+'.json') );
            main(nuevosCambios,Name2);
            console.log('camb: '+modificaciones);

            if(cambios){
                fs.writeFile(FileC, modificaciones, (err)=>{
                    if(err){throw err;}
                    console.log("Actualizado");
                });
                //fs.createReadStream(file2).pipe(fs.createWriteStream(fileSRV) );
                const ls =exec('cd Diff/txtSRV', function(error, stdout, stderr){ //si se ejecuta con node
                //const ls =exec('cd Diff/txtSRV', function(error, stdout, stderr){//si se ejecuta con npm run dev
                    console.log("CD");
                    if(error){
                        console.log(error.stack);
                        console.log('code: '+error.code);
                        console.log('signal: '+error.signal);
                    }

                    const md5 =exec('md5sum '+fileSRV+' > CHECkSUM', function(error, stdout, stderr){
                        console.log("md5");
                        if(error){
                            console.log(error.stack);
                            console.log('code: '+error.code);
                            console.log('signal: '+error.signal);
                        }
                        console.log('SRDOUT: '+stdout);
                        console.log('STDERR: '+stderr);
                    });

                    md5.on('exit',function( code ){
                        console.log('exit code: '+code);
                    });

                    
                });   
            }
            

        });    
    });
}
module.exports={Diff};

//main("1|hello=>Este, 2|txtx2=>txt2, 3|ajaj=>bajaja");