# Ramanujan Windows Installer
# Usage: irm https://avithehacker.github.io/PM/ramanujan/install-windows.ps1 | iex

$ErrorActionPreference = 'Stop'

$RELEASE_URL = "https://github.com/avithehacker/ai-desktop/releases/download/v1.0.0/Ramanujan-windows.exe"
$TMP_EXE     = "$env:TEMP\Ramanujan-setup.exe"

Write-Host ""
Write-Host "Installing Ramanujan..."

# Download
Write-Host "-> Downloading..."
$ProgressPreference = 'SilentlyContinue'
Invoke-WebRequest -Uri $RELEASE_URL -OutFile $TMP_EXE -UseBasicParsing

# Run NSIS installer silently
Write-Host "-> Installing..."
Start-Process -FilePath $TMP_EXE -ArgumentList '/S' -Wait

# Cleanup
Remove-Item $TMP_EXE -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "✓ Ramanujan installed. Find it in your Start Menu."
Write-Host ""
