const lineReader=require('line-reader');
var path=require('path');
var file1=path.basename('TXT1');
var file2=path.basename('TXT2');

var i=1;
lineReader.open('TXT1', function(err,reader1){
    lineReader.open('TXT2', function(err,reader2){
        while(reader1.hasNextLine() ||reader2.hasNextLine()){
            reader1.nextLine(function(err, line1){
                reader2.nextLine(function(err, line2){
                    

                    if(line1==line2){
                        //console.log("iguales");
                    }else{
                        console.log("Existe una diferencia en la linea "+i+" de los archivos");
                        console.log("Archivo llamado "+file1+" contiene: "+line1+"\n"+
                                    "Archivo llamado "+file2+" contiene: "+line2);
                    }
                });
            });
            i++;
        }
    });    
});

