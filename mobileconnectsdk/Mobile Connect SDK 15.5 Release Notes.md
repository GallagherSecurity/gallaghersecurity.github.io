# Mobile Connect SDK 15.5 Release Notes

Version 15.5 of the Mobile Connect SDK is a minor release containing small bugfixes and improved support for Android 12 Bluetooth permissions

## API Changes:

There are no API changes to the iOS SDK

The Android SDK contains the following changes:

Enum `com.gallagher.security.mobileaccess.MobileAccessState`:

- Added new member `BLE_WARNING_LOCATION_SERVICE_DISABLED`
- Added new member `BLE_WARNING_NO_LOCATION_PERMISSION`

These are new warnings that the SDK can raise to you via the `sdkStateListener` on Android 12 when you do not have the appropriate permissions.

Please refer to the Android SDK sample app for an example of how to request these permissions if you need them.