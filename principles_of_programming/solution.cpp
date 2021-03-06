#include <iostream>
#include <vector>
#include <string>
#include <fstream>

using namespace std;

struct subst{ //subst = substitution
    string from, to;
    bool isFinal;
};

void printAnswer(string ans){
    ofstream cout ("output.txt", ios::out);
    cout << ans;
    cout.close();
}

bool check_correct(int test, string my_ans){   
    ifstream cin ("answer" + to_string(test) + ".txt", ios::in); 
    string right_ans;
    cin >> right_ans;
    cin.close();
    return my_ans == right_ans;
}

void parseSchema(int test, int &amount, vector <subst> &schema, string &word) { //test: 0 - user input, [1..7] - local tests
    ifstream cin ("input" + (test ? to_string(test) : "") + ".txt", ios::in);
    cin >> amount;
    schema.resize(amount);
    for (int i = 0; i < amount; i++){
        string cur_subst; // ba->.ab
        cin >> cur_subst;
        int pos = cur_subst.find('-');
        schema[i].from = cur_subst.substr(0, pos);
        pos += 2;
        if (cur_subst.find('.') != -1) {
            schema[i].isFinal = true;
            pos++;
        }
        schema[i].to = cur_subst.substr(pos, (int)cur_subst.length() - pos);
    }
    cin >> word;
    cin.close();
}

void applySubst(string &word, string was, string will_be){
    int pos = word.find(was);
    word.erase(pos, was.length());
    word.insert(pos, will_be);
}

pair <string, bool> applySchemaOnce(int amount, vector <subst> schema, string word){
    bool isItFinal = false;
    string new_word = word;
    for (int i = 0; i < amount; i++){
        if (word.find(schema[i].from) != -1){
            applySubst(new_word, schema[i].from, schema[i].to);
            isItFinal = schema[i].isFinal;
            break;
        }
    }
    return make_pair(new_word, isItFinal);
}

bool canApplySchema(int amount, vector <subst> schema, string word) {
    for (int i = 0; i < amount; i++){
        if (word.find(schema[i].from) != -1)
            return true;
    }
    return false;
}

string applySchema(int amount, vector <subst> schema, string word){
    while (canApplySchema(amount, schema, word)) {
        pair <string, bool> result = applySchemaOnce(amount, schema, word);
        word = result.first;
        if (result.second)
            break;
    }
    return word;
}

bool testApplySchemaOnce(){ // 3 tests
    vector <subst> schema1;
    subst fst = {"ba", "ab", false};
    schema1.push_back(fst);
    subst snd = {"bcb", "cb", false};
    schema1.push_back(snd);
    subst trd = {"aa", "", false};
    schema1.push_back(trd);
    
    if (applySchemaOnce(3, schema1, "bacbbb").first != "abcbbb"
        || applySchemaOnce(3, schema1, "bcaaa").first != "bca"
        || applySchemaOnce(3, schema1, "abcbbcb").first != "acbbcb")
            return false;
    return true;
}

const int num_of_tests = 7;

bool testApplySchema(){ // 7 tests
    for (int i = 1; i <= num_of_tests; i++){ 
        string word;
        int amount;
        vector <subst> schema;
        parseSchema(i, amount, schema, word);
        string answer = applySchema(amount, schema, word);
        if (!check_correct(i, answer))
            return false;
    }
    return true;
}

int main() {
    if (!testApplySchemaOnce()){
        printAnswer("Error in applySchemaOnce");
        return 0;
    }
    if (!testApplySchema()){
        printAnswer("Error in applySchema");
        return 0;
    }
    string word;
    int amount;
    vector <subst> schema;
    parseSchema(0, amount, schema, word); //user must enter text in input.txt, answer is in output.txt
    string answer = applySchema(amount, schema, word);
    printAnswer(answer);

    return 0;
}
