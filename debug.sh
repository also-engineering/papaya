#!/usr/bin/env bash

# This will remove any installed apks, build one, install it, and run it
# For best results your device should be connected via usb before the script is run.

./node_modules/cordova/bin/cordova build android &&
adb uninstall org.rti.papaya &&
adb install platforms/android/build/outputs/apk/android-debug.apk &&
adb shell am start -n org.rti.papaya/org.rti.papaya.MainActivity