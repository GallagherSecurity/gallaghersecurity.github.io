# Mobile Connect SDK 17.1 Release Notes

Version 17.1 of the Mobile Connect SDK contains minor enhancements and bugfixes.

### Minor:
* Changed global backoff timer after a successful authentication operation to a per-reader backoff. This is 5 seconds for iOS and 10 seconds for Android.

* Refactored the Bluetooth Connection Manager to improve stability (Android only).

* Added `canAddToWallet` helper function to the `Wallet` class. It returns an `AddToWalletDisplayStatus` which indicates the Wallet status of a Credential's associated devices

