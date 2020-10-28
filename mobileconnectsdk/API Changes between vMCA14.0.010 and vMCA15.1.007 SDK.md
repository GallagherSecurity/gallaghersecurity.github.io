# Notable API Changes between SDK 14.0.010 and 15.1.007 for Android
This document represents an overall listing of changes to the Mobile Connect SDK. For more details for any particular class or method, please refer to the JavaDocs.

## Changed `interface MobileAccess`:

### Changed: `deleteMobileCredential(MobileCredential, DeleteOption, CredentialDeleteListener)`
In earlier versions of the SDK, this method had two parameters: 
`deleteMobileCredential(MobileCredential, CredentialDeleteListener)`.

The new `DeleteOption` parameter has been added which allows you to control side effects that may occur when you delete the credential; It is explained later in this document

### Added: `getMobileCredentials(MobileCredentialFilter)`
The existing `getMobileCredentials()` has not changed, and still returns all credentials. This new overload allows you to pass in filter criteria, so you can optionally choose to only get active (non-revoked) credentials.

The `MobileCredentialFilter` enumeration is explained later in this document.

### Added: `syncCredentialItemUpdates()`
If you are using either of the new SDK optional features (Digital ID or Salto), these features require a sync with the Gallagher Cloud in order to retrieve data they need.

To perform this sync, you must call `syncCredentialItemUpdates` in an appropriate place. The Gallagher Mobile Connect application does this whenever it comes from the background into the foreground; we recommend you do similar.

The sync will happen in the background and has no direct result, however indirectly it may cause updates to propagate through any registered `DigitalIdListener` or `SaltoUpdateListener`

### Added: `syncCredentialItemUpdates(Callable<Throwable> onSyncCompleted)`
The same as `syncCredentialItemUpdates()` but allows you to supply a callback which will be executed when the sync process completes, and will inform you if there was a sync error so you could (for example) show a warning in your user interface.

### Added: `addDigitalIdListener(DigitalIdListener)`
Use this to register a callback, so you can be informed about adds/removes and updates to Digital ID cards that the user may have.

### Added: `removeDigitalIdListener(DigitalIdListener)`
Removes a callback added with `addDigitalIdListener`

### Added: `addSaltoUpdateListener(SaltoUpdateListener)`
Use this to register a callback, so you can be informed about adds/removes and updates to Salto Keys that the user may have.

### Added: `removeSaltoUpdateListener(SaltoUpdateListener)`
Removes a callback added with `addSaltoUpdateListener`

### Added: `startOpeningSaltoDoor(SaltoKeyIdentifier, SaltoAccessListener)`
Use this to attempt to open a Salto door; Supply a SaltoAccessListener to be informed of the result.

### Added: `addSdkFeatureStateListener(SdkFeatureStateListener)`
Use this to register a callback, so you can be informed about errors and warnings associated with the SDK's new optional features (Digital ID and Salto).

Digital ID and Salto require that the Mobile Connect SDK communicates with the Gallagher Cloud in order to fetch these things. The SdkFeatureStateListener can tell you if the cloud connection is offline, and so forth.

### Added: `removeSdkFeatureStateListener(SdkFeatureStateListener)`
Removes a callback added with `addSdkFeatureStateListener`

### Added: `getSdkFeatureStates()`
Synchronously returns the state of the SDK optional features. It is better to add a listener such that you can be informed of changes over time, but if you need to get the current states at a point-in-time, then this method allows for that.

## Changed `interface MobileAccessProvider`:

<h3> Added: <code>configure(
    application, 
    String databaseFilePath,
    String unlockNotificationChannelId,                                   
    String bleServiceForegroundNotificationChannelId,
    String notificationsChannelId,
    EnumSet&lt;SdkFeature&gt; enabledFeatures )</code></h3>

Digital ID and Salto integration are not active by default.

This new overload of the `configure` method adds the new `enabledFeatures` parameter. You must call this, suppling a combination of `SdkFeature.SALTO` and `SdkFeature.DIGITAL_ID` in order to use either of the optional features.

## Changed `enum MobileAccessState`

### Added `BLE_ERROR_NO_BACKGROUND_LOCATION_PERMISSION`.

In Android 10, Google added a new permission called `ACCESS_BACKGROUND_LOCATION` which is required for any application that wants to use Bluetooth while the app is not visible on screen.

Reference: [https://developer.android.com/about/versions/10/privacy/changes#app-access-device-location](https://developer.android.com/about/versions/10/privacy/changes#app-access-device-location)

The Mobile Connect SDK will now warn you about lack of this permission, with the new `BLE_ERROR_NO_BACKGROUND_LOCATION_PERMISSION`, propagated using the existing `SdkStateListener`. 

Note: The SDK will only provide this warning if:
- The phone is Android 10 or newer
- You have enabled Background Bluetooth by calling `setBluetoothBackgroundScanMode` and passing one of the background options
- The permission has not been granted.

If you receive it, you should prompt in your user interface to either grant the permission, or disable background bluetooth.

## Changed `class MobileCredential`

### Added: `isRevoked()`
Returns true if the credential is revoked

----

## Added: `enum SdkFeatureState`:
Used by `SdkFeatureStateListener`, as below

## Added: `interface SdkFeatureStateListener`
In a similar fashion to the existing `SdkStateListener` callback behaviour, there is now a new `SdkFeatureStateListener`, which will notify you when changes that affect your configured optional features (Digital ID or Salto) occur.

You can use this to make appropriate responses in your user interface, such as showing a warning message.

Your listener will be called and supplied a collection of `SdkFeatureState` objects.

If empty, it means there are no problems. Alternatively you may get `ERROR_CLOUD_CONNECTION_FAILED` which means that the connection to the Gallagher cloud was not successful.


## Added: `interface SaltoAccessListener`
A callback interface that you supply to `startOpeningSaltoDoor`.
It will inform you when a Salto door has been detected, and then again after the request completes

## Added: `class SaltoAccessResult`
Tells you about the result of `startOpeningSaltoDoor`

## Added: `interface SaltoUpdateListener`
Callback interface which will tell you when new salto keys are added or removed via the Gallagher Cloud

## Added: `class SaltoKeyIdentifier`
Handle for a salto key, which lets you identify which Command Centre system it belongs to, and select it for use when opening salto doors

## Added: `class SaltoError`
This mimics the swift `SaltoError` enumeration from the iOS SDK and is used to communicate problems with the Salto feature.

We have the abstract class SaltoError, and subclasses for each specific subtype of error
```java
SaltoError:
    // occurs if we receive bad data from the cloud
  - MobileCredentialNotFound { String mobileCredentialId }
    
    // internal SDK error saving to the local database
  - AddKeyFailed { Throwable cause }

    // internal SDK error removing from the local database
  - DeleteKeyFailed { Throwable cause }

    // internal SDK error loading from the local database
  - GetKeysFailed { Throwable cause }

    // Failed to connect to cloud to retrieve Digital ID data. Check cause for more details
  - CloudConnectionError { Throwable cause }

    // occurs if we receive bad data from the cloud
  - DeserializationError { String message }

  // occurs if we cannot decrypt a Salto key
  - DecryptionError { Throwable cause }

    // Other unexpected error. Check cause for more details
  - Unexpected { Throwable cause }

    // Error initializing the Salto JustIN mobile SDK. Check message for more details
  - SaltoSdkSetupError { String message }
```

## Added: `class DigitalId`
This class holds the data associated with a Digital ID. You will be given them via registering a `DigitalIdListener`.

The `DigitalId` class has the following methods

```java
// Returns the date and time that the Digital ID will be considered active
Date getActivationTime()

// Returns the ID of the mobile credential that the Digital ID is associated with.
String getCredentialId() 

// Returns the date and time that the Digital ID will be considered expired
Date getExpiryTime() 

// returns a user-friendly, localized representation of the ID Card Status (Expired, Not Yet Activated, etc)
String getStatusValue()

// returns a programattic representation of the ID Card Status (EXPIRED, PENDING, etc)
DigitalIdStatusType getStatusType()

// The binary image data for the front side of the Digital ID card
byte[] getFrontSide()

// The binary image data for the rear side of the Digital ID card. Null if the card is single sided
byte[] getRearSide()
```

## Added: `class DigitalIdListener`
Callback interface which will tell you when Digital IDs are added or removed via the Gallagher Cloud

## Added: `enum DigitalIdStatusType`
Enumeration representing the card states that a Digital ID card can have:

```java
// Normal active/enabled state.
ACTIVE
// Where the enabled until date is in the past.
EXPIRED
// Digital ID has been disabled
INACTIVE
// Where the enabled from date is in the future.
PENDING
```

## Added: `class DigitalIdError`
This mimics the swift `DigitalIdError` enumeration from the iOS SDK and is used to communicate problems with the Digital ID feature.

We have the abstract class DigitalIdError, and subclasses for each specific subtype of error
```java
DigitalIdError:
    // occurs if we receive bad data from the cloud
  - DeserializationError { String message }
    
    // internal SDK error saving to the local database
  - AddIdFailed { Throwable cause }

    // internal SDK error removing from the local database
  - DeleteIdFailed { Throwable cause }

    // internal SDK error loading from the local database
  - DatabaseLoadError { Throwable cause }

    // Failed to connect to cloud to retrieve Digital ID data. Check cause for more details
  - CloudConnectionError { Throwable cause }

    // Other unexpected error. Check cause for more details
  - Unexpected { Throwable cause }
```

## Added: `enum MobileCredentialFilter`
Controls whether you want to get all credentials, or only active ones

```java
// get only active credentials
ACTIVE_ONLY

// get both active and revoked credentials
INCLUDE_REVOKED
```

## Added: `enum DeleteOption`
A new enumeration has been added to control the behaviour of the SDK when deleting a mobile credential.

```java
// Deletes from the cloud and phone; Fail if the cloud cannot be contacted.
DEFAULT
// Deletes from the cloud and phone; Continue with phone delete if the cloud cannot be contacted.
ALLOW_OFFLINE
// Not recommended. Does not attempt to contact the cloud.
OFFLINE_ONLY
```

## Changed: `enum AccessDecision`

### `DENIED_TAILGAITING` renamed to `DENIED_TAILGATING`
This fixes a spelling mistake.

### `DENIED_TAILGAITING_VISITORS` renamed to `DENIED_TAILGATING_VISITORS`
This fixes a spelling mistake.