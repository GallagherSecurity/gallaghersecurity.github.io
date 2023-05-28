# Mobile Connect SDK 16.1 Release Notes

Version 16.1 of the Mobile Connect SDK adds FIDO UAF v1.1 certified authenticators (<a href="https://fidoalliance.org/what-is-fido/">What is FIDO?</a>). This is an invisible change to SDK implementers and users. 

It also references an updated Salto SDK, with minor changes to the MobileAccess API Salto methods.

There are also small bugfixes and improved support for Android 13 permissions.

----

### Minor:
* Added `enum SaltoOpeningParams` - defines the Salto opening modes - standardMode or officeMode

## API Changes between iOS SDK 15.5.026 and 16.1.45

### Added:
* `startOpeningSaltoDoor(saltoKeyIdentifier:, peripheralFound:, saltoAccessCompleted:, params:)` -
Use this to attempt to open a Salto door; Supply peripheralFound and saltoAccessCompleted callbacks to be informed of the result. This method accepts SaltoOpeningParameters but the existing method with a default value of standardMode remains.

## API Changes between Android SDK 15.5.061 and 16.1.71

### Added:
* `startOpeningSaltoDoor(saltoKeyIdentifier:, peripheralFound:, saltoAccessCompleted:, params:)` -
Use this to attempt to open a Salto door; Supply a SaltoAccessListener to be informed of the result. This method accepts SaltoOpeningParameters but the existing method with a default value of standardMode remains.

