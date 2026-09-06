#!/bin/zsh
launchctl bootout gui/$UID/com.outskill.local 2>/dev/null || true
rm -f "$HOME/Library/LaunchAgents/com.outskill.local.plist"
echo "Uninstalled com.outskill.local"