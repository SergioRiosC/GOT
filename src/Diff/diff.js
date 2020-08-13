const lineReader=require('line-reader');
const{exec}=require('child_process');
const fs =require('fs');
const{main} = require('../huffman')

const fname='';
var path=require('path');
var file1='/home/sergio/Documentos/GitHub/GOT/src/Diff/TXT1';
var Name1=path.basename(file1);
var file2='/home/sergio/Documentos/GitHub/GOT/src/Diff/TXT2';
var Name2=path.basename(file2);
var fileSRV='/home/sergio/Documentos/GitHub/GOT/src/Diff/txtSRV/TXT2';
var cambios=false;
var i=1;
console.log(file1.toString());
console.log(file2);
var modificaciones="";
var nuevosCambios = "";


function Diff(FileC){
fs.createReadStream(FileC).pipe(fs.createWriteStream('/home/sergio/Documentos/GitHub/GOT/src/Diff/TXT2'));


lineReader.open('/home/sergio/Documentos/GitHub/GOT/src/Diff/TXT1', function(err,reader1){
    lineReader.open('/home/sergio/Documentos/GitHub/GOT/src/Diff/TXT2', function(err,reader2){
        while(reader1.hasNextLine() ||reader2.hasNextLine()){
            reader1.nextLine(function(err, line1){
                reader2.nextLine(function(err, line2){
                    
                    modificaciones=modificaciones+line2+"\n";
                    if(line1==line2){
                        //console.log("iguales");
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
        
        main(nuevosCambios);
        console.log('camb: '+modificaciones);

        if(cambios){
            console.log("camb");
            fs.writeFile(file1, modificaciones, (err)=>{
                if(err){throw err;}
                console.log("Actualizado");
            });
            fs.createReadStream(file2).pipe(fs.createWriteStream(fileSRV) );
            
            const ls =exec('cd Diff/txtSRV', function(error, stdout, stderr){
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