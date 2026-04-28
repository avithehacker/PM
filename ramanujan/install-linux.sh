#!/bin/bash
set -e

RELEASE_URL="https://github.com/avithehacker/ai-desktop/releases/download/v1.0.0/Ramanujan-1.0.0.AppImage"
INSTALL_DIR="$HOME/.local/bin"
APP_PATH="$INSTALL_DIR/Ramanujan"
DESKTOP_DIR="$HOME/.local/share/applications"
DESKTOP_FILE="$DESKTOP_DIR/ramanujan.desktop"

echo ""
echo "Installing Ramanujan..."

# Download
echo "-> Downloading..."
mkdir -p "$INSTALL_DIR"
curl -L --progress-bar -o "$APP_PATH" "$RELEASE_URL"

# Make executable
chmod +x "$APP_PATH"

# Create desktop entry for app launcher
echo "-> Creating launcher..."
mkdir -p "$DESKTOP_DIR"
cat > "$DESKTOP_FILE" << EOF
[Desktop Entry]
Name=Ramanujan
Comment=AI that routes itself
Exec=$APP_PATH
Icon=utilities-terminal
Terminal=false
Type=Application
Categories=Utility;
EOF

# Add ~/.local/bin to PATH if not already there
if [[ ":$PATH:" != *":$HOME/.local/bin:"* ]]; then
  SHELL_RC=""
  if [ -f "$HOME/.zshrc" ]; then SHELL_RC="$HOME/.zshrc"
  elif [ -f "$HOME/.bashrc" ]; then SHELL_RC="$HOME/.bashrc"
  fi
  if [ -n "$SHELL_RC" ]; then
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$SHELL_RC"
    echo "-> Added ~/.local/bin to PATH in $SHELL_RC"
  fi
fi

echo ""
echo "✓ Ramanujan installed to $APP_PATH"
echo "  Run it from your app launcher, or type: Ramanujan"
echo ""
