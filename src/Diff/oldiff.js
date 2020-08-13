const lineReader=require('line-reader');
const{exec}=require('child_process');
const fs =require('fs');
const{main} = require('../huffman')


var path=require('path');
var file1=path.basename('TXT1');
var file2=path.basename('TXT2');
var file1= 'files/TXT4';
var file2 = 'files/TXT3';
var cambios=false;
var i=1;
console.log(file1.toString());
console.log(file2);
var modificaciones="";
var nuevosCambios = "";

lineReader.open(file1, function(err,reader1){
    lineReader.open(file2, function(err,reader2){
        while(reader1.hasNextLine() ||reader2.hasNextLine()){
            reader1.nextLine(function(err, line1){
                reader2.nextLine(function(err, line2){
                    
                    modificaciones=modificaciones+line2+"\n";
                    if(line1==line2){
                        //console.log("iguales");
                    }else{
                        cambios=true;
                        
                        console.log("Existe una diferencia en la linea "+i+" de los archivos");
                        console.log("Archivo llamado "+file1+" contiene: "+line1+"\n"+
                                    "Archivo llamado "+file2+" contiene: "+line2);
                        
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
            fs.writeFile(file1, modificaciones, (err)=>{
                if(err){throw err;}
                console.log("Actualizado");
            });
            fs.createReadStream(file2).pipe(fs.createWriteStream('txtSRV/'+path.basename(file2) ) );
            
            const ls =exec('cd txtSRV', function(error, stdout, stderr){
                if(error){
                    console.log(error.stack);
                    console.log('code: '+error.code);
                    console.log('signal: '+error.signal);
                }

                const md5 =exec('md5sum txtSRV/'+path.basename(file2)+' > CHECkSUM', function(error, stdout, stderr){
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

//main("1|hello=>Este, 2|txtx2=>txt2, 3|ajaj=>bajaja");