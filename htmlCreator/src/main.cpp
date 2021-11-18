#include <iostream>
#include <string>
#include <vector>
#include "./header/htmlCreator.h"

#ifdef _WIN32
#include <Windows.h>
#endif





int main(int argc, char** argv) {
    
    #ifdef _WIN32
        SetConsoleOutputCP(CP_UTF8);
    #endif

    gc = argc;
    gci = 2;
    gar = argv;

    if(argc != 1){//Program menusu yapım asamasındadır.
        htmlCreator();
    }
    else{
        std::cout << "Yapım asamasında!" << std::endl;
        // int getNum = 1;
        // while(getNum != 0){//std::filesystem::create_directories("./a/b/c")
        //     std::cout << "{1} : Component Olustur." << std::endl;
        //     std::cout << "{2} : Componentleri Göster." << std::endl;
        //     std::cout << "{0} : Çıkış" << std::endl;
        //     std::cout << ">---------------<" << std::endl;
        //     std::cin >> getNum;
        //     if(getNum == 1){
        //         showTree();
        //     }
        //     else if(getNum == 2){ 
        //         showTree();
        //     }
        // }
    }
    
    return 0;
}