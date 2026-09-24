#!/bin/sh

# Install the required libraries for the project to work as intended.
sudo apt-get install python3-pip npm

# Target the testing substem for activation.
echo "Target-Script: Targeting subsystem..."
source testingSubsystem/bin/activate

# Update all required packages before using the system.
echo "Target-Script: Updating required packages before boot."
pip install --upgrade pip

# Install required dependies.
npm install update
npm install exceljs
npm install jest
