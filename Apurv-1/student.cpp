#include <iostream>
#include <fstream>
#include <ctime>
#include <vector>
#include <cctype>
#include <string>
using namespace std;

struct Information{
    vector<string> names = {"Rohan Kisibe", "Jotaro Kujo", "Joseph Joestar", "Ichigo Kurosaki", "Jolyne Cujoh"};
    vector<int> marks = {120, 20, 500, 180, 89};
};

template<typename T>
void Log(T New){
    cout << New << endl;
}

int main(){
    Information x;
    int mc;
    int newmarks;
    string firstname;
    string option;
    bool run = true;

    while(run){
        Log("Choose an option");
        Log("1. View Student ID");
        Log("2. Admission ");
        Log("3. Check marks");
        Log("4. Store marks");
        Log("Please enter of the option u want to select!");
        cin >> option;

        if(cin.fail()){
            cout << "Invalid option!" << endl;
            return 0;
        } 
        else if (option == "1" || option == "View") {
            for (int i = 0; i < x.names.size(); i++) {
                cout << i << " : " << x.names[i] << endl;
            }
        } 
        else if(option == "2" || option == "Admission" || option == "2."){
            Log("What is your first name?");
           cin >> firstname;

            x.names.push_back(firstname);
            Log("Ur added!");
        } 
        else if(option == "3." || option == "Check" || option == "3" ){
            for (int i = 0; i < x.names.size(); i++) {
                cout << i << " : " << x.names[i] << endl;
            }
            Log("please enter which number your name is at!");
            cin >> mc;
            cout << x.marks[mc] << endl;
            if(cin.fail()){
                cout << "admit yourself please!";
            }
         
        } 
        else if(option == "4." || option == "Store" || option == "store" || option == "4" ){
            cout << "Enter your Marks: ";
            cin >> newmarks;
            if(cin.fail()){
                cout << "Invalid!\n";
            }
            x.marks.push_back(newmarks);
            Log("Stored!");
        } 
        else{
            cout << "Invalid response to the question!";
        }

    run = false;
    Log("Run again?");
    cin >> run;
    }

}