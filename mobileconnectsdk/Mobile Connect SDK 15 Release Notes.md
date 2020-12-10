# Mobile Connect SDK 15 Release Notes

Version 15 of the Mobile Connect SDK adds two major features. Digital ID, and integration with the Salto JustIN Mobile SDK.

## Digital ID

If your Command Centre server is running version 8.40 or higher of Command Centre, you will be able to configure Digital ID cards and assign them to cardholders.

The Mobile Connect SDK now allows you to display these Digital ID cards in your own app. The Gallagher Command Centre server, Gallagher Cloud, and Mobile Connect SDK perform the task of distributing the ID card data securely.

Digital ID cards are sent using End to End encryption from the Command Centre server to your app using the Mobile Connect SDK. While they transit through the Gallagher Cloud, this encryption ensures that no other party (including Gallagher) is ever able to access this data.

For more information regarding the End to End encryption used by the SDK, please refer to the [End to End encryption technical information paper](https://gallaghersecurity.github.io/r/mobileconnect-end-to-end-encryption)

## Salto JustIN Mobile Integration

If your Command Centre server is configured to integrate with Salto BLE locks, you can issue Salto Mobile Credentials to your phone and open these doors.
This feature was previously only available in Gallagher's Mobile Connect app - it is now available for external developers via the Mobile Connect SDK.

Salto's JustIN Mobile SDK performs the task of communicating with Salto BLE locks, and opening the door. The Gallagher Command Centre server, Gallagher Cloud, and now Mobile Connect SDK perform the task of creating and distributing salto keys securely.
Note: To use the Salto integration, you must add the extra salto libraries to your app, as well as the Mobile Connect SDK itself. The iOS and Android developer guides show how to do this.

If your Command Centre server is using version 8.40 or higher of Command Centre, Salto keys are sent using End to End encryption from the Command Centre server to your app using the Mobile Connect SDK. While they transit through the Gallagher Cloud, this ensures that no other party (including Gallagher) is able to access these keys.

## Minor enhancements:

### Remote Revocation of Credentials
In prior versions of the SDK, if a Mobile Credential was deleted from Command Centre, that would in turn cause the credential to be deleted from the Gallagher Cloud. This was not reflected down to the SDK though, which would carry on attempting to use the credential until it was manually removed.

Version 15 of the SDK is now aware of credential revocation via the Gallagher Cloud, and will mark a credential as Revoked on the device once it sees that it has been removed from the cloud. A revoked credential will not simply dissappear, you must still call `deleteMobileCredential` to fully remove it if you would like to, but it will no longer be used for access and other such things. 

In support of this, the `MobileCredential` interface adds a field you can read to see if a credential is revoked.

### Support for Android 10

In Android 10, Google added a new permission called `ACCESS_BACKGROUND_LOCATION` which is required for any application that wants to use Bluetooth while the app is not visible on screen.

Prior versions of the SDK did not handle this correctly, which would cause Bluetooth access to fail if run on an Android 10 or newer device, and configured Bluetooth access to run in the background. This now works correctly and provides appropriate warnings when the permission has not been granted as expected.

Reference: [https://developer.android.com/about/versions/10/privacy/changes#app-access-device-location](https://developer.android.com/about/versions/10/privacy/changes#app-access-device-location)
