#include "server.h"

const char* HOST = "localhost";
const int32_t PORT = 8080;


int main(){
    sqlite3* DB;
    int32_t exit = sqlite3_open("example.db", &DB);
    ASSERT(exit, TRACE("LOADED DATABASE \"$s\"", "example.db"), ERROR("FAILED TO LOAD DATABASE \"%s\"\n         ERROR LOG: %s", "example.db", sqlite3_errmsg(DB)))

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

    return 0;
}