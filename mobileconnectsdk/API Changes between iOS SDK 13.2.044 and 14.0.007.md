# API Changes between iOS SDK 13.2.044 and 14.0.007
This document represents an overall listing of changes to the Mobile Connect SDK. For more details for any particular class or method, please refer to the JavaDocs.

## Major: `protocol MobileAccess`:

The `stopScanning()` and `startScanning()` methods have been replaced with a single `setScanning(enabled: Bool)` method

The `readerUpdateDelegate` property has been replaced with a pair of methods:  
`addReaderUpdateDelegate(delegate)` and `removeReaderUpdateDelegate(delegate)` to allow for multiple concurrent delegates.

The `enableAutomaticAccess()` and `disableAutomaticAccess()` methods have been replaced with a single `var isAutomaticAccessEnabled: Bool` property. This also now lets you read the value, rather than only write it.

## Major: `protocol AccessDelegate`:

The `onAccessStart` method has been renamed to `onAccessStarted`

## Major: `enum MobileAccessState`:
This enum has been synchronized with the Android SDK.

The `bleErrorUnsupported` value has been replaced with `errorNoBleFeature`.

The `bleErrorPoweredOff` value has been replaced with `bleErrorDisabled`.

The `extendedBackgroundScanningRequiresLocationServices` has been split into two states:  `bleWarningExtendedBackgroundScanningRequiresLocationServiceEnabled` and `bleWarningExtendedBackgroundScanningRequiresLocationAlwaysPermission`

## Minor: `protocol MobileCredential`:
A new `status` property has been added, of type `MobileCredentialStatus`.

Mobile credentials can be linked to your Passcode/TouchID/FaceID. 
If you remove/reset these in the iOS system settings app, then it can cause your credential to break. This new `status` property lets you query credential status, and if any problems are detected you may use this information to alert the user about possibly needing to re-register their credential

## Minor: `struct MobileCredentialStatus`:
This has two properties: `singleFactor`, `secondFactor`, both of type `enum MobileCredentialKeyStatus`, with the following possible values:

* `good`: The SDK believes the factor to be in working order
* `notRegistered`: The factor may have never been registered (secondFactor is optional)
* `unknown`: The SDK cannot determine whether the factor is working or not
* `bad(Error)`: The SDK believes the factor is broken. Additional information may be available in the associated Error object

## Minor: `protocol ReaderAction`:
This has been converted to a `struct` which implements the `Codable` protocol.
Previously this was represented by an opaque internal type which couldn't be saved/restored (i.e. when marshalling across to JavaScript). It now supports these scenarios

## Minor: `enum ReaderActionType`:
The existing values of `Arm, Disarm, Mode1,...` have been renamed to use lowercase. E.g. `arm, disarm, mode1,...` to fit with swift's coding conventions.

Two new values have been added: `requestAccess`: and `enumerate`

## Minor: `class AccessResult`:

This is now a `struct`

A new `accessMode` property has been added, which is of the type `enum AccessMode`.

This new mode is in support of the Command Centre 8.30 feature wherein the Gallagher Command Centre Mobile App can now read Mobile Credentials directly (phone-to-phone). There are multiple scenarios which the app supports, and the `AccessMode` enum conveys which mode was used. It has the following values:

* `access` - Indicates the Command Centre Mobile App is performing access decisions
* `challenge` - Indicates the Command Centre Mobile App is performing spot-check
* `evac` - Indicates the Command Centre Mobile App is performing evacuation
* `search` - Indicates the Command Centre Mobile App is simply looking up cardholder details