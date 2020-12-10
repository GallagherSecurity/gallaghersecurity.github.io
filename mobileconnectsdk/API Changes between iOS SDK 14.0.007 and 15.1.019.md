# API Changes between iOS SDK 14.0.007 and 15.1.019

## Note: xcframework package
The iOS SDK is now packaged as an `xcframework`, and requires Xcode 11 or newer (Xcode 12 recommended.) The change to `xcframework` packaging was neccessary to maintain support with newer versions of Xcode, and the iOS simulator changes brought about by Apple Silicon Mac hardware.

## Changed `class MobileAccessProvider`:

### Changed: `configure(...)`

In earlier versions of the SDK, the configure method was:

```swift
static func configure(
    databaseFilePath: URL? = nil, 
    localization: MobileAccessLocalization? = nil, 
    cloudTlsValidationMode: CloudTlsValidationMode = .anyValidCertificateRequired
) -> MobileAccess
```

The method signature is now:

```swift
static func configure(
    databaseFilePath: URL? = nil,
    localization: MobileAccessLocalization? = nil,
    cloudTlsValidationMode: CloudTlsValidationMode = .anyValidCertificateRequired, 
    enabledFeatures: [SdkFeature] = []
) -> GallagherMobileAccess.MobileAccess
```
The key difference is the addition of the `enabledFeatures` parameter which lets you enable Digital ID or Salto support. These are not active by default.
Please refer to the API Docs and SDK Sample Application for more information.

## Changed `protocol MobileAccess`:

### Changed: `deleteMobileCredential(_ mobileCredential:, deleteOption:, onCredentialDeleteCompleted:)`
In earlier versions of the SDK, this method had two parameters: 
`deleteMobileCredential(_ mobileCredential:, onCredentialDeleteCompleted:)`.

The new `deleteOption` parameter has been added which allows you to control side effects that may occur when you delete the credential; It is explained later in this document

### Added: `getMobileCredentials(options:)`
The existing `mobileCredentials { get }` property not changed, and still returns all credentials including revoked ones. This new method allows you to pass in filter options, so you can choose to only get active (non-revoked) credentials.

### Added: `syncCredentialItemUpdates()`
If you are using either of the new SDK optional features (Digital ID or Salto), these features require a sync with the Gallagher Cloud in order to retrieve data they need.

To perform this sync, you must call `syncCredentialItemUpdates` in an appropriate place. The Gallagher Mobile Connect application does this whenever it comes from the background into the foreground; we recommend you do similar.

The sync will happen in the background and has no direct result, however indirectly it may cause updates to propagate through any registered `DigitalIdDelegate` or `SaltoUpdateDelegate`

### Added: `syncCredentialItemUpdates(onSyncCompleted:)`
The same as `syncCredentialItemUpdates()` but allows you to supply a callback which will be executed when the sync process completes, and will inform you if there was a sync error so you could (for example) show a warning in your user interface.

### Added: `addDigitalIdDelegate(_ delegate:)`
Use this to register a callback, so you can be informed about adds/removes and updates to Digital ID cards that the user may have.

### Added: `removeDigitalIdDelgate(_ delegate:)`
Removes a callback added with `addDigitalIdDelegate`

### Added: `addSaltoUpdateDelegate(_ delegate:)`
Use this to register a callback, so you can be informed about adds/removes and updates to Salto Keys that the user may have.

### Added: `removeSaltoUpdateDelegate(_ delegate:)`
Removes a callback added with `addSaltoUpdateDelegate`

### Added: `startOpeningSaltoDoor(saltoKeyIdentifier:, delegate:)`
Use this to attempt to open a Salto door; Supply a SaltoAccessDelegate to be informed of the result.

### Added: `addSdkFeatureStateDelegate(_ delegate:)`
Use this to register a callback, so you can be informed about errors and warnings associated with the SDK's new optional features (Digital ID and Salto).

Digital ID and Salto require that the Mobile Connect SDK communicates with the Gallagher Cloud in order to fetch these things. The SdkFeatureStateDelegate can tell you if the cloud connection is offline, and so forth.

### Added: `removeSdkFeatureStateDelegate(_ delegate:)`
Removes a callback added with `addSdkFeatureStateDelegate`

### Added: `sdkFeatureStates { get }`
Synchronously returns the state of the SDK optional features. It is better to add a callback such that you can be informed of changes over time, but if you need to get the current states at a point-in-time, then this method allows for that.

## Changed `enum MobileAccessState`

### Added `credentialBiometricsLockedOut`.

This is a minor addition to correctly report the case where a user fails biometric authentication repeatedly while attempting to open a door, and iOS locks them out.

### Added `bleErrorNoBackgroundLocationPermission`.

This is an Android-only error, and is only included for parity with the Android SDK.

## Changed `protocol MobileCredential`

### Added: `isRevoked { get }`
Returns true if the credential is revoked

----

## Added: `enum SdkFeatureState`:
Used by `SdkFeatureStateDelegate`, as below

## Added: `protocol SdkFeatureStateDelegate`
In a similar fashion to the existing `SdkStateDelegate` callback behaviour, there is now a new `SdkFeatureStateDelegate`, which will notify you when changes that affect your configured optional features (Digital ID or Salto) occur.

You can use this to make appropriate responses in your user interface, such as showing a warning message.

Your listener will be called and supplied a collection of `SdkFeatureState` objects.

If empty, it means there are no problems. Alternatively you may get `.errorCloudConnectionFailed` which means that the connection to the Gallagher cloud was not successful.


## Added: `protocol SaltoAccessDelegate`
A callback interface that you supply to `startOpeningSaltoDoor`.
It will inform you when a Salto door has been detected, and then again after the request completes

## Added: `struct SaltoAccessResult`
Tells you about the result of `startOpeningSaltoDoor`

## Added: `protocol SaltoUpdateDelegate`
Callback interface which will tell you when new salto keys are added or removed via the Gallagher Cloud

## Added: `struct SaltoKeyIdentifier`
Handle for a salto key, which lets you identify which Command Centre system it belongs to, and select it for use when opening salto doors

## Added: `enum SaltoError`
Represents errors that can occur when interacting with the Salto integration.

Cases:
```swift
// occurs if we receive bad data from the cloud
.mobileCredentialNotFound(_ mobileCredentialId: String)
    
// internal SDK error saving to the local database
.addKeyFailed(Error)

// internal SDK error removing from the local database
.deleteKeyFailed(Error)

// internal SDK error loading from the local database
.getKeysFailed(Error)

// Failed to connect to cloud to retrieve Digital ID data. Check cause for more details
.cloudConnectionError(Error)

// occurs if we receive bad data from the cloud
.deserializationError(_ message: String)

// occurs if we cannot decrypt a Salto key
.decryptionError(Error)

// Other unexpected error. Check cause for more details
.unexpected(Error)

// Error initializing the Salto JustIN mobile SDK. Check error for more details
.saltoSdkError(Error)
```

## Added: `struct DigitalId`
This class holds the data associated with a Digital ID. You will be given them via registering a `DigitalIdDelegate`.

`DigitalId` has the following properties

```swift
// Returns the date and time that the Digital ID will be considered active
activationTime: Date? { get }

// Returns the ID of the mobile credential that the Digital ID is associated with.
activationTime: Date? { get }

// Returns the date and time that the Digital ID will be considered expired
expiryTime: Date? { get }

// returns a user-friendly, localized representation of the ID Card Status (Expired, Not Yet Activated, etc)
statusValue { get }

// returns a programattic representation of the ID Card Status (.expired, .pending, etc)
statusType: DigitalIdStatusType { get }

// The binary image data for the front side of the Digital ID card
frontSide: Data { get }

// The binary image data for the rear side of the Digital ID card. Nil if the card is single sided
rearSide: Data? { get }
```

## Added: `protocol DigitalIdDelegate`
Callback interface which will tell you when Digital IDs are added or removed via the Gallagher Cloud

## Added: `enum DigitalIdStatusType`
Enumeration representing the card states that a Digital ID card can have:

```swift
// Normal active/enabled state.
.active
// Where the enabled until date is in the past.
.expired
// Digital ID has been disabled
.inactive
// Where the enabled from date is in the future.
.pending
```

## Added: `enum DigitalIdError`
Represents errors that can occur when interacting with the Digital ID feature.

Cases:
```swift
// internal SDK error saving to the local database
.addIdFailed(Error)

// internal SDK error removing from the local database
.deleteIdFailed(Error)

// internal SDK error loading from the local database
.databaseLoadError(Error)

// Failed to connect to cloud to retrieve Digital ID data. Check cause for more details
.cloudConnectionError(Error)

// occurs if we receive bad data from the cloud
.deserializationError(_ message: String)

// occurs if we cannot decrypt a Salto key
.decryptionError(Error)

// Other unexpected error. Check cause for more details
.unexpected(Error)
```

## Added: `enum MobileCredentialFilter`
Controls whether you want to get all credentials, or only active ones

```swift
// get only active credentials
.activeOnly

// get both active and revoked credentials
.includeRevoked
```

## Added: `enum DeleteOption`
A new enumeration has been added to control the behaviour of the SDK when deleting a mobile credential.

```swift
// Deletes from the cloud and phone; Fail if the cloud cannot be contacted.
.default
// Deletes from the cloud and phone; Continue with phone delete if the cloud cannot be contacted.
.allowOffline
// Not recommended. Does not attempt to contact the cloud.
.offlineOnly
```

## Changed: `enum AccessDecision`

### `.deniedTailgaiting` renamed to `deniedTailgating`
This fixes a spelling mistake.

### `.deniedTailgaitingVisitors` renamed to `.deniedTailgatingVisitors`
This fixes a spelling mistake.

## Changed: `enum ReaderConnectionError`

### Added case `.biometricsLockedOut`

This is a minor addition to correctly report the case where a user fails biometric authentication repeatedly while attempting to open a door, and iOS locks them out.