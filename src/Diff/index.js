const lineReader=require('line-reader');
const{exec}=require('child_process');
const fs =require('fs');


var path=require('path');
var file1=path.basename('TXT1');
var file2=path.basename('TXT2');
var cambios=false;
var i=1;
console.log(file1.toString());
console.log(file2);
var nuevosCambios="";

lineReader.open(file1, function(err,reader1){
    lineReader.open(file2, function(err,reader2){
        while(reader1.hasNextLine() ||reader2.hasNextLine()){
            reader1.nextLine(function(err, line1){
                reader2.nextLine(function(err, line2){
                    
                    nuevosCambios=nuevosCambios+line2+"\n";
                    if(line1==line2){
                        //console.log("iguales");
                    }else{
                        cambios=true;
                        
                        console.log("Existe una diferencia en la linea "+i+" de los archivos");
                        console.log("Archivo llamado "+file1+" contiene: "+line1+"\n"+
                                    "Archivo llamado "+file2+" contiene: "+line2);
                    }
                });
            });
            i++;
        }
        console.log('camb: '+nuevosCambios);

        if(cambios){
            fs.writeFile(file1, nuevosCambios, (err)=>{
                if(err){throw err;}
                console.log("Actiualizado");
            });
            fs.createReadStream(file2).pipe(fs.createWriteStream('txtSRV/TXT2') );
            
            const ls =exec('cd txtSRV', function(error, stdout, stderr){
                if(error){
                    console.log(error.stack);
                    console.log('code: '+error.code);
                    console.log('signal: '+error.signal);
                }

                const md5 =exec('md5sum txtSRV/'+file2+' > CHECkSUM', function(error, stdout, stderr){
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

