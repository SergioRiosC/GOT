#include <cpr/cpr.h>
#include <iostream>

using namespace std;

int main(int argc, char** argv) {
    cpr::Response r = cpr::Get(cpr::Url{"http://localhost:3000/"});
    r.status_code;                  // 200
    r.header["content-type"];       // application/json; charset=utf-8
    cout << r.text << endl; 
    cout << "hello";
}