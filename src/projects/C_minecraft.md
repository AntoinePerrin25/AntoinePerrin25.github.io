# Minecraft

This project is a simple Minecraft-like game written in C using the Raylib library for rendering and a custom network library for multiplayer support.

## Features

- Basic chunks generation based on a seed
- First-person camera controls
- Multiplayer support with player state synchronization
- Network server to handle player connections and state updates (Only works on local though)

## Getting Started

### Prerequisites

- Raylib library
- A C compiler (e.g., cc)

### Building

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/Minecraft.git
    cd Minecraft
    ```

2. Build the project:
- Compile Nob (only once !)
    ```sh
    gcc -o nob nob.c
    ```

- Run the compiled Nob:
    ```sh
    ./nob
    ```

### Running

1. Start the server:
    ```sh
    ./build/server.exe
    ```

2. Start the client:
    ```sh
    ./build/game.exe
    ```

## Controls

- `Z`, `Q`, `S`, `F`: Move the player
- Mouse: Look around
- `Left Shift`: Sprint

## Screenshot

![C_Minecraft](/img/c_minecraft.png)

## Acknowledgements

- [Raylib](https://www.raylib.com/) for the graphics library
- [Nob](https://github.com/tsoding/nob.h) to compile everything
