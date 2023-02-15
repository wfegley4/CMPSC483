#include "server.h"


const char* HOST = "localhost";
const int32_t PORT = 8080;


int main(){
    auto database = std::make_unique<Database>("example.db");
    database->table("STUDENTS", {
        {"ID", "INT PRIMARY KEY"},
        {"NAME", "TEXT"},
        {"SURNAME", "TEXT"},
        {"MAJOR", "CHAR(8)"},
    });

    database->insert("STUDENTS", "1, 'STEVE', 'GATES', 30, 'PALO ALTO', 1000.0")
            ->insert("STUDENTS", "2, 'BILL', 'ALLEN', 20, 'SEATTLE', 300.22")
            ->insert("STUDENTS", "3, 'PAUL', 'JOBS', 24, 'SEATTLE', 9900.0");

    const char* SUPER_SECRET_NUMBER = "780375235";

    auto server = (new Server())
            ->page("/", "assets/pages/home")
            ->page("/", "assets/styles")
            ->page("/", "assets/fonts")
            ->page("/", "assets/textures");

    server
    ->get("/log", REQ_RES {
        std::cout << "qowegfhqkwjehf\n\n";
        res.set_content(SUPER_SECRET_NUMBER, "text/json");
    })
    ->get("/test", REQ_RES {
        std::cout << "qowegfhqkwjehf\n\n";
        res.set_content(SUPER_SECRET_NUMBER, "text/json");
    });

    server->post("/bruh", REQ_RES{
        std::cout << req.body << "\n";
    });


    server->listen(HOST, PORT);
    server->m_server.stop();

    return 0;
}
