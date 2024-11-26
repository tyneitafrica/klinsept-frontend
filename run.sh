#!/bin/bash

# Define project directory
PROJECT_DIR="flone"

# Function to display usage
usage() {
  echo "Usage: $0 {-i|-d}"
  echo "  -i    Install dependencies"
  echo "  -s    Run development server"
  exit 1
}

# Check if the script is being run from the correct directory
if [ ! -d "$PROJECT_DIR" ]; then
  echo "Error: Project directory '$PROJECT_DIR' not found!"
  exit 1
fi

# Navigate to the project directory
cd "$PROJECT_DIR" || exit

# Check for command-line arguments
if [ "$#" -ne 1 ]; then
  usage
fi

# Handle the installation and development options
case "$1" in
  -i)
    echo "Installing dependencies..."
    yarn install
    ;;
  -s)
    echo "Running development server..."
    yarn start
    ;;
  *)
    usage
    ;;
esac

# End of script
