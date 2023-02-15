cmake_minimum_required(VERSION 3.23)
project(learning_factory)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_FLAGS "-lhttplib -lsqlite3")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ../output)


add_library(server STATIC ../modules/server/server.cpp)
target_include_directories(server PUBLIC ../modules/server/include)

add_library(logger STATIC ../modules/logger/logger.cpp)
target_include_directories(logger PUBLIC ../modules/logger/include)



add_executable(${PROJECT_NAME} ../source/main.cpp)

target_include_directories(server PUBLIC ../modules/pch/include)
target_precompile_headers(server PUBLIC ../modules/pch/include/pch.h)
target_link_libraries(server PUBLIC logger)

target_include_directories(logger PUBLIC ../modules/pch/include)
target_precompile_headers(logger PUBLIC ../modules/pch/include/pch.h)

target_link_libraries(${PROJECT_NAME} PUBLIC server)

