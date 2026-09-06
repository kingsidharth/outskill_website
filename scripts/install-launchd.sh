#!/bin/zsh
PLIST="scripts/com.outskill.local.plist"
TARGET="$HOME/Library/LaunchAgents/com.outskill.local.plist"
cp "$PLIST" "$TARGET"
launchctl bootout gui/$UID/com.outskill.local 2>/dev/null || true
launchctl bootstrap gui/$UID "$TARGET"
echo "Installed and loaded com.outskill.local"