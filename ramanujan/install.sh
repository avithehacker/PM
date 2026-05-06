#!/bin/bash
set -e

ARCH="$(uname -m)"
if [ "$ARCH" = "arm64" ]; then
  RELEASE_URL="https://github.com/avithehacker/ai-desktop/releases/download/v1.1.0/Ramanujan-1.0.0-arm64-mac.zip"
else
  RELEASE_URL="https://github.com/avithehacker/ai-desktop/releases/download/v1.1.0/Ramanujan-1.0.0-mac.zip"
fi

TMP_ZIP="/tmp/Ramanujan-mac.zip"
TMP_DIR="/tmp/ramanujan-unzip"
APP_DEST="/Applications/Ramanujan.app"

echo ""
echo "Installing Ramanujan..."

# Download
echo "→ Downloading ($ARCH)..."
curl -L --progress-bar -o "$TMP_ZIP" "$RELEASE_URL"

# Unzip
echo "→ Extracting..."
rm -rf "$TMP_DIR"
unzip -q "$TMP_ZIP" -d "$TMP_DIR"

# Copy app
echo "→ Copying to Applications..."
rm -rf "$APP_DEST"
cp -R "$TMP_DIR/Ramanujan.app" "/Applications/"

# Remove macOS quarantine (avoids "damaged app" error for unsigned builds)
xattr -cr "$APP_DEST"

# Cleanup
rm -f "$TMP_ZIP"
rm -rf "$TMP_DIR"

echo ""
echo "✓ Ramanujan installed. Open it from your Applications folder."
echo ""
