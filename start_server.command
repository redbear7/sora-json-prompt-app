#!/bin/zsh
set -e

cd "$(dirname "$0")"
PORT="${1:-8080}"

echo "[sora-json-prompt-app] Static server starting..."
echo "- root: $(pwd)"
echo "- url : http://localhost:${PORT}"
echo "- stop: Ctrl+C"

python3 ./server.py --port "$PORT"
