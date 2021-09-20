# API Changes between Android SDK 15.1.032 and 15.4.037

The primary difference between these two SDK versions is added support for Mobile Credential Sharing.

## Major: `enum MobileAccessState`:

This enum gains two new error cases:

- `BLE_ERROR_NO_BLUETOOTH_SCAN_PERMISSION`
- `BLE_ERROR_NO_BLUETOOTH_CONNECT_PERMISSION`

These errors will be communicated as part of observing SDK state changes when your app is running on Android 12 and lacks the `BLUETOOTH_SCAN` or `BLUETOOTH_CONNECT` permissions.

## Minor: Added `class SharedCredential`:
This new class has two methods:
- `String getFacilityName()` which tells you the Display Name of the other site that this credential has been shared with.
- `int getFacilityId()` which tells you the Facility ID of the other site that this credential has been shared with.

## Minor: `interface MobileCredential`:

Added `List<SharedCredential> getSharedCredentials()`.
You can read this property to fetch the list of `SharedCredential` objects pertaining to the other sites that this credential has been shared with.

## Minor: `class DigitalId`:

Added `int getSourceSiteFacilityId()` which can be used to distinguish Digital Id's sent from different sites, in a credential sharing environment.

## Minor: `class SaltoKeyIdentifier`:

Added `int getSourceSiteFacilityId()` which can be used to distinguish Salto Keys sent from different sites, in a credential sharing environment.
