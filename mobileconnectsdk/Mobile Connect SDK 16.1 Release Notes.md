# Mobile Connect SDK 16.1 Release Notes

Version 16.1 of the Mobile Connect SDK adds FIDO UAF v1.1 certified authenticators (<a href="https://fidoalliance.org/what-is-fido/">What is FIDO?</a>). This is an invisible change to SDK implementers and users. 

It also updates references an updated Salto SDK, with minor changes.

There are also small bugfixes and improved support for Android 13 permissions.

----

## API Changes between iOS SDK 15.5.026 and 16.1.45

### Added: `startOpeningSaltoDoor(saltoKeyIdentifier:, peripheralFound:, saltoAccessCompleted:, params:)`
Use this to attempt to open a Salto door; Supply a SaltoAccessListener to be informed of the result. You can now also pass SaltoOpeningParameters.

## API Changes between Android SDK 15.5.061 and 16.1.71

### Minor: `enum MobileAccessState`:

* Added new member `BLE_WARNING_LOCATION_SERVICE_DISABLED`
* Added new member `BLE_WARNING_NO_LOCATION_PERMISSION`

These are new warnings that the SDK can raise to you via the `sdkStateListener` on Android 12 when you do not have the appropriate permissions.

Please refer to the Android SDK sample app for an example of how to request these permissions if you need them.


### 25 May 2023: iOS SDK **16.1.045**, Android SDK **16.1.71**

Version 16.1 of the Mobile Connect SDK adds FIDO UAF v1.1 certified authenticators (<a href="https://fidoalliance.org/what-is-fido/">What is FIDO?</a>). This is an invisible change to SDK implementers and users. This update also contains small bugfixes and improved support for Android 13 permissions

<a href="Mobile Connect SDK 15.5 Release Notes.html">View the Mobile Connect SDK 15.5 Release Notes and API changes.</a>

### 15 June 2022: iOS SDK **15.5.026**, Android SDK **15.5.061**