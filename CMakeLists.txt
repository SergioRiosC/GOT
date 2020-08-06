cmake_minimum_required(VERSION 3.10)
project(GOT)

include(FetchContent)
FetchContent_Declare(cpr GIT_REPOSITORY https://github.com/whoshuu/cpr.git GIT_TAG c8d33915dbd88ad6c92b258869b03aba06587ff9) # the commit hash for 1.5.0
FetchContent_MakeAvailable(cpr)

set(CMAKE_CXX_STANDARD 14)

add_executable(GOT
       client/main.cpp
       )



target_link_libraries(GOT PRIVATE cpr::cpr)