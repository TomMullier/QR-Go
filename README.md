# QR Go

This project is an online tool for creating QR code-based scavenger hunts. It is designed to be used both for fun and professional purposes, such as for open houses or treasure hunts. It includes two panels: a player panel where players can scan QR codes directly on the website to get information on the current location, and an administrator panel where administrators can create routes and steps, with descriptions, instructions for accessing them, and the ability to print corresponding QR codes.

![QR Go logo](https://www.zupimages.net/up/23/02/dzh6.png)

The tool is functional on PC and smartphone, but it is more suited for use on a smartphone for the player part, as scanning QR codes is required.

## Prerequisites

- A web browser (Google Chrome, Firefox, etc.)
- An internet connection
- A device capable of scanning QR codes (smartphone, tablet, etc.)

## Installation

1. Clone this project's repository to your computer using the command `git clone https://github.com/TomMullier/QR-Go.git`
2. Install necessary dependencies using the command `npm i` in the cloned directory.
3. Compile the JS FIles using the command `npm run build-script`
3. Start the server using the command `npm start`
4. Access the application by opening your web browser and entering the address `http://localhost:3000/`

## Usage

### Player Panel

- Access the player panel by clicking the "Player" tab in the main menu
- Use your device to scan the QR codes for the route's steps
- Get information on the current location and instructions for continuing

### Administrator Panel

- Access the administrator panel by clicking the "Admin" tab in the main menu
- Log in using the provided login information
- Create routes and steps using the available forms
- Print the corresponding QR codes for each step using the "Print" button

## Contribution

This project was created as a group effort by Maxime Declemy, Enguerrand Marquant, Adel Etamene, Nicolas Grousseau, Alexis Mallet, Simon Bernard De Lajartre and Thomas Raffray.
Any contributions are welcome! To submit a modification, please open a pull request or create a branch from the main branch.

## License

This project is licensed under the MIT license.
