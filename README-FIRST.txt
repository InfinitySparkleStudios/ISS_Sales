INFINITY SPARKLE STUDIOS — WINDOWS DESKTOP APP
================================================

WHAT THIS IS
------------
A real Windows app version of your shop (the same ISS_Sales app that's on
GitHub Pages), wrapped so it opens in its own window with its own icon —
no browser, no address bar, no "website" feel. Clients double-click an
icon and it just opens, like any other program on their PC.

HOW TO BUILD IT
----------------
I can't download the build tools from inside my own workspace (they come
from servers my workspace isn't allowed to reach), so the actual build has
to run once on a normal computer with regular internet access — yours is
perfect for this.

1. Make sure this whole "iss-desktop" folder is on your computer.
2. Double-click BUILD-THE-APP.bat
3. Wait a few minutes (it downloads the tools the first time, then builds).
4. When it finishes, open the new "release" folder inside iss-desktop.

You'll find two files in there:
  - "Infinity Sparkle Studios Setup x.x.x.exe"  → the installer. This is
    what you send to most clients — they double-click it, click through a
    short install wizard, and it adds a proper Start Menu + desktop icon.
  - "Infinity Sparkle Studios x.x.x.exe" (portable) → no installing at
    all, just double-click to run. Good for a quick demo on someone else's
    PC, or for a client who doesn't want anything "installed."

IMPORTANT — THE FIRST TIME A CLIENT OPENS IT
---------------------------------------------
Because this isn't signed with a paid Microsoft certificate (that costs
money, same story as the Apple one), Windows will show a blue
"Windows protected your PC" (SmartScreen) warning the very first time
someone runs it. This is normal for any small/independent software, not a
sign anything is wrong. They just click "More info", then "Run anyway."
It only happens once per computer.

HOW TO SEND IT TO CLIENTS
--------------------------
There's no app store involved — you just send them the installer file
directly: email it, put it on a Google Drive / Dropbox link, or hand them
a USB stick. However you'd normally send a file.

IF SOMETHING GOES WRONG
-------------------------
If BUILD-THE-APP.bat shows an error, copy the red/error text and send it
to me (Claude) and I'll tell you exactly what to do — don't worry about
understanding it yourself.

NEXT UP
-------
Once this is working well for you, the same approach (built the same
way, on your computer) can produce a real installable Android app (.apk)
for phones. iPhone still needs the $99/year Apple Developer account —
no way around that one, it's Apple's own rule.
