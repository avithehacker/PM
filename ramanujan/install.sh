#!/bin/bash
set -e

RELEASE_URL="https://github.com/avithehacker/ai-desktop/releases/download/v1.0.0/Ramanujan-mac.dmg"
TMP_DMG="/tmp/Ramanujan-mac.dmg"
MOUNT_POINT="/tmp/ramanujan-mount"
APP_DEST="/Applications/Ramanujan.app"

echo ""
echo "Installing Ramanujan..."

# Download
echo "→ Downloading..."
curl -L --progress-bar -o "$TMP_DMG" "$RELEASE_URL"

# Mount
echo "→ Mounting..."
hdiutil attach "$TMP_DMG" -mountpoint "$MOUNT_POINT" -quiet -nobrowse

# Copy app
echo "→ Copying to Applications..."
rm -rf "$APP_DEST"
cp -R "$MOUNT_POINT/Ramanujan.app" "/Applications/"

# Remove macOS quarantine (avoids "damaged app" error for unsigned builds)
xattr -cr "$APP_DEST"

# Cleanup
hdiutil detach "$MOUNT_POINT" -quiet
rm -f "$TMP_DMG"

echo ""
echo "✓ Ramanujan installed. Open it from your Applications folder."
echo ""
