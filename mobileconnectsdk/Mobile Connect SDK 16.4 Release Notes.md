# Mobile Connect SDK 16.4 Release Notes

Version 16.4 of the Mobile Connect SDK adds support for two main features:

- Receive real-time Salto events for offline Salto readers on remote locations and transmit them to Command Centre and Salto servers via the Gallagher cloud without the need for badging at Salto update points.
- Access Aperio BLE wired and non-wired readers using Mobile Credentials.

Both features require Command Centre server version 9.00 or higher.

The SDK update also contains small bugfixes and BLE improvements.

### Salto Audit Event Trail:
This feature is automatically enabled once the Command Centre Server is setup with Salto and mobile event trail configuration is enabled for Cardholders.
There is no flag to enable/disable this feature in the Mobile Connect SDK.

### Aperio BLE Access:
This feature requires Command Centre Server to be configured with BLE Aperio as well as the Aperio app per door.
The Mobile Connect SDK provides a feature flag to enable/disable Aperio BLE access.


### Add:
A new value for `SdkFeature` is added to enable the Aperio integration feature.
* iOS: `.aperio`.
* Android: `SdkFeature.APERIO`.

