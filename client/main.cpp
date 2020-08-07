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
                cout << "El respositrio "<< argv[2] << " ha sido creado" << endl;
            }                     
            
        } 

        else if (arg1.compare("help") == 0){
            
            cout << "\t\t GOT 1.000000001" << endl;
            cout << "Todos los comandos que descritos deben pre por el comando GOT" << endl;
            cout << "=============================================================\n" << endl;
            cout << "init <nombre> \t\t Crea un nuevo repositorio <name>" << endl;
            cout << "help \t\t\t Muestra informacion de lo que hace cada comando" << endl;
            cout << "add [-A] [name] \t Agrega todos los archivos no registrados o con modificaciones al repositorio. [-A] agrega todos los archivos relevantes" << endl;
            cout << "commit" << endl;
            cout << "status" << endl;
            cout << "rollback" << endl;
            cout << "reset" << endl;
            cout << "sync" << endl;

        } 

        else if (arg1.compare("add") == 0){
            
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