# Notable API Changes between vMCA13.2.024 and vMCI14.0.002 SDK for Android

## Major: `interface MobileAccess`:

The `stopScanning()` and `startScanning()` methods have been replaced with a single `setScanning(boolean enabled)` method

The `setReaderUpdateListener(listener)` method has been replaced with a pair of methods:  
`addReaderUpdateListener(listener)` and `removeReaderUpdateListener(listeners)` to allow for multiple concurrent liseners.

The `enableAutomaticAccess()` and `disableAutomaticAccess()` methods have been replaced with a single `setAutomaticAccessEnabled(boolean enabled)` method.

A new `boolean getAutomaticAccessEnabled()` method has been added which lets you read the value; previously it was write-only.

A new `BluetoothScanMode getBluetoothBackgroundScanMode()` method has been added which lets you read the value; previously it was write-only.

## Minor: `interface AccessResult`:

This is now a `class`

A new `getAccessMode()` method has been added, which returns an `enum AccessMode`.

This new mode is in support of the Command Centre 8.30 feature wherein the Gallagher Command Centre Mobile App can now read Mobile Credentials directly (phone-to-phone). There are multiple scenarios which the app supports, and the `AccessMode` enum conveys which mode was used. It has the following values:

* `ACCESS` - Indicates the Command Centre Mobile App is performing access decisions
* `CHALLENGE` - Indicates the Command Centre Mobile App is performing spot-check
* `EVAC` - Indicates the Command Centre Mobile App is performing evacuation
* `SEARCH` - Indicates the Command Centre Mobile App is simply looking up cardholder details

## Minor: `interface ReaderAction`:

This has been converted to a `class` which is  `Parcelable`.
Previously this was represented by an opaque internal type which couldn't be saved/restored (i.e. when marshalling across to JavaScript). It now supports these scenarios

## Minor: `enum ReaderActionType`:
Two new values have been added: `REQUEST_ACCESS` and `ENUMERATE`

## Minor: `enum ReaderConnectionError`:
This has been synchronized with the iOS SDK and converted to a class hierarchy.
This enables associated values to be passed alongside different kinds of errors (Mimicing the behavior of enums with associated values in Swift).

We now have
```java
ReaderConnectionError:
  - Forbidden
  - ReaderUnavailable { String peripheralId }
  - TransactionInProgress
  - ActivityNotPresent
  - BluetoothDisabled
  - UserCancelled
  - RemoteClose
  - SecondFactorRequired
  - UnlockRequired
  - InvalidatedCredential
  - Unexpected { Throwable cause }
````

## Minor: `enum RegistrationError`:
This has been synchronized with the iOS SDK and converted to a class hierarchy.
This enables associated values to be passed alongside different kinds of errors (Mimicing the behavior of enums with associated values in Swift).

We now have
```java
RegistrationError:
 - NetworkFailure { Throwable cause }
 - InvalidResponse { String message }
 - UserCancelledRegistration
 - UserNotEnrolled
 - InvitationGone
 - InvitationNotFound
 - Unexpected { String message }
```

