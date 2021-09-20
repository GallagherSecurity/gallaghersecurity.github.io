# Mobile Connect SDK 15.4 Release Notes

Version 15.4 of the Mobile Connect SDK adds the Mobile Credential Sharing feature, and provides platform support improvements.

## Mobile Credential Sharing

If your Command Centre server is running version 8.40 or higher of Command Centre, you will be able to export Mobile Credentials from one server, and import them into a second using the Cardholder Sync utility.

Combined with Credential Sharing support in the Mobile Connect App and SDK, this means that the second server will be able to use and authenticate mobile devices that were enrolled against the first server, without having to issue new credentials to those devices.

The feature is designed to support multi-tenanted systems where an individual cardholder may be onboarded by one System (for example, a company leasing space in a large office complex, using Command Centre) but then will desire seamless access into other systems (such as the office complex landlord's own separate Command Centre system)

For more information regarding the Credential Sharing, please refer to  [Mobile Connect Cloud and App Security](https://gallaghersecurity.github.io/r/mobileconnect-cloud-and-app-security), specifically section 2.5 regarding Credential Sharing.

Note: If your app plans to use Credential Sharing, you should remember to call the `syncCredentialItemUpdates()` function periodically. This causes the SDK to connect to the Gallagher cloud and fetch any sharing-related data updates. If you do not call `syncCredentialItemUpdates()` then the SDK will remain unaware of any sharing-related updates, and the sharing feature will not function.

## Platform support for iOS 15 and Android 12

iOS 15 does not contain any changes that impact the Mobile Connect SDK. iOS SDK version 15.4 will work on iOS 15, as will older releases of the SDK.

Android 12 introduces permission changes related to the use of Bluetooth.
If your app targets Android SDK 31, then these changes will break the SDK's ability to use Bluetooth unless you add the new `BLUETOOTH_SCAN` and `BLUETOOTH_CONNECT` permissions.

SDK 15.4 for Android is aware of Android 12, and will warn you about lack of these permissions using the Sdk State callback.
Requesting the permissions themselves must be done by your host application, not the SDK. Please see the Android SDK Sample app for examples on how to do this.

[More detailed information regarding these cahnges is available on the Android Developers site](https://developer.android.com/about/versions/12/features/bluetooth-permissions).

## iOS SDK no longer depends on RxSwift 



## Open Source, Community Supported React Native and Xamarin Binding Libraries are now available

For more information please visit the respective GitHub repositories

* https://github.com/GallagherSecurity/mobileconnectsdk-xamarin-bindings

* https://github.com/GallagherSecurity/mobileconnectsdk-react-native-bindings

