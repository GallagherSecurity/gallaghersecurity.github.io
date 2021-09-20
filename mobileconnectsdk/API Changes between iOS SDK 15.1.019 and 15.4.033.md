# API Changes between iOS SDK 15.1.019 and 15.4.033

The primary difference between these two SDK versions is added support for Mobile Credential Sharing.

## Minor: Added `struct SharedCredential`:
This new struct has two properties:
- `facilityName: String` which tells you the Display Name of the other site that this credential has been shared with.
- `facilityId: Int` which tells you the Facility ID of the other site that this credential has been shared with.

## Minor: `protocol MobileCredential`:

Added read-only property `sharedCredentials: [SharedCredential]`.
You can read this property to fetch the list of `SharedCredential` objects pertaining to the other sites that this credential has been shared with.

## Minor: `struct DigitalId`:

Added field `sourceSiteFacilityId: Int` which can be used to distinguish Digital Id's sent from different sites, in a credential sharing environment.

## Minor: `struct SaltoKeyIdentifier`:

Added field `sourceSiteFacilityId: Int` which can be used to distinguish Salto Keys sent from different sites, in a credential sharing environment.

## Experimental: `protocol MobileAccess`

Added `func startOpeningNextDoor(expiry:, delegate:)`

This instructs the Mobile Connect SDK to set a timer for the next 7 seconds, wherein the next door that is within BLE range will be automatically opened, even if this is outside the normal auto-connect range. The Gallagher Mobile Connect app ties this to a Siri Shortcut so you can use a voice command to open the nearest door.

*Beware:* This feature is experimental and if there are multiple doors within close proximity, the wrong one may be opened. We may remove this experimental feature in future in favour of a more comprehensive solution; please treat it accordingly.