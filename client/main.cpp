#include <cpr/cpr.h>
#include <iostream>

using namespace std;

int main(int argc, char* argv[]) {
    

    if(argc < 2){
        
        cpr::Response r = cpr::Get(cpr::Url{"http://localhost:3000/"});
        r.status_code;                  // 200
        r.header["content-type"];       // application/json; charset=utf-8
        cout << r.text << endl; 
        cout << "hello";
        return -1;

    }else{
        
        string arg1(argv[1]);

        if (arg1.compare("init") == 0){
            if (argc < 3)
            {
                cout << "Debe especificar que repositorio desea crear\n";
                cout << "got init <name>";
                
            }
            else
            {
                cpr::Response r = cpr::Post(
                    cpr::Url{"http://localhost:3000/repository"},
                    cpr::Parameters{{"repository_Name",(string)argv[2]}},
                    cpr::Header{ { "Content-Type", "application/json" }}
                );

                if(r.status_code == 200){
                
                    cout << "El respositrio "<< argv[2] << " ha sido creado" << endl;
                               
                }
                else{
                    cout << "No se ha logrado crear el respositrio "<< argv[2] << endl;
                }
                
                /*cout << "Status: " << r.status_code << endl;                  // 200
                cout << "Header: " << r.header["content-type"] << endl;       // application/json; charset=utf-8
                cout << "Text: " << r.text << endl; */
                return -1;}                     
            
        } 

        else if (arg1.compare("help") == 0){
            
            cout << "\t\t GOT 1.000000001" << endl;
            cout << "Todos los comandos que descritos deben pre por el comando GOT" << endl;
            cout << "=============================================================\n" << endl;
            cout << "init <name> \t\t Crea un nuevo repositorio <name>" << endl;
            cout << "help \t\t\t Muestra informacion de lo que hace cada comando" << endl;
            cout << "add [-A] [name] \t Agrega todos los archivos no registrados o con modificaciones al repositorio. [-A] agrega todos los archivos relevantes. Cuando los archivos se agregan, se marcan como pendientes de commit\n" << endl;
            cout << "commit <mensaje> \t Agrega los archivos pendiates de commit al repositorio. Retorna la id del commit" << endl;
            cout << "status <file> \t\t Muestra cambios realizados en comparacion al commit anterior. <file> retorna el historial de cambios realizados en <file>" << endl;
            cout << "rollback <file> <commit> Permite regresar un archivo en el tiempo a un commit específico" << endl;
            cout << "reset <file> \t\t Deshace cambios locales para un archivo y lo regresa al último commit" << endl;
            cout << "sync <file> \t\t Recupera los cambios para un archivo en el repositorio y los sincroniza con los cambios del archivo local" << endl;

        } 

        else if (arg1.compare("add") == 0){
            if(argv[2]=="[-A]"){
                cout << "-A" << endl;    
            }else
            {
                string name=argv[2];
                cpr::Response r = cpr::Post(
                    cpr::Url{"http://localhost:3000/files"},
                    cpr::Parameters{{"fileName",(string)name}},
                    cpr::Header{ { "Content-Type", "application/json" }}
                ); 
            }
            
            cout << "add" << endl;

        } 

        else if (arg1.compare("commit") == 0){
            
            cout << "commit" << endl;

        } 

        else if (arg1.compare("status") == 0){
            
            cout << "status" << endl;

        } 

        else if (arg1.compare("rollback") == 0){
            
            cout << "rollback" << endl;

        } 

        else if (arg1.compare("reset") == 0){
            
            cout << "reset" << endl;

        } 

        else if (arg1.compare("sync") == 0){
            
            cout << "sync" << endl;

        }
        
        /*cout << argv[1] << endl;
        cout << argv[2] << endl;
        cout << argv[3];*/

    }
    return 0;
}