# Mobile Connect SDK 17.2 Release Notes

This release includes documentation enhancements, minor bug fixes, and platform-specific improvements across both iOS and Android SDKs.

## iOS SDK Changes

* Improved Wallet feature documentation in the Developer Guide:
    * Clarified the process for requesting the Wallet app entitlement.
    * Included recommendations and considerations for displaying and hiding the "Add to Apple Wallet" button.
* Introduced a new helper function `addToWalletStatus` in the `Wallet` class, replacing the now-deprecated `canAddToWallet`.
* Calling `startProvisioningWallet` is now blocked if a pass provisioning process is already underway. This prevents initiating new requests while Apple completes the existing provisioning asynchronously. This is indicated by the new enum case: `WalletProvisioningError.provisioningInProgress`.


## Android SDK Changes

* Support for Android 15 (API 35) is now available.
* Migrates from the deprecated `FingerprintManager` to `BiometricPrompt`. This means any Biometric authentication method which meets the Class 3/Strong rating can be used as a second factor for Gallagher credentials. Refer to the Developer Guide for more details.
* Replaced the external RxJava dependency with an internal module to fully isolate it from consuming apps. This avoids version conflicts and ensures seamless SDK integration regardless of the app’s RxJava version.
* Minor enhancements and bugfixes within the FIDO module. 
 