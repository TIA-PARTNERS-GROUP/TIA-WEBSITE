#!/bin/bash
cd "$(dirname "$0")/.." || exit 1
db-migration up:development
if [ -t 1 ]; then
  read -p "Press Enter to exit..."
fi