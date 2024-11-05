# Mobile Connect SDK 17.0 Release Notes

The SDK update includes small bug fixes and BLE improvements for both platforms.  

The following are the specific changes for each platform:

## iOS SDK Changes

* The SDK added `Wallet` feature support, allowing the user to provision Apple Wallet passes for registered credentials.
* The Wallet feature (Apple Employee Badge) is a licensed feature that requires Command Centre server version 9.10 MR3 or higher.

## Android SDK Changes

* Added support for Android 14.
* Support of Salto JustIN Mobile SDK version 4.1.0 which includes Android 14 support.
* Common permissions and services for BLE, NFC, and notifications are included by default in the SDK to simplify the setup required by app integrators.  
This means you are no longer required to explicitly include the following permissions and services in your app:

```xml
    <!-- Credential registration -->
    <uses-permission android:name="android.permission.INTERNET" />

    <!-- Bluetooth LE -->
    <uses-feature android:name="android.hardware.bluetooth_le" android:required="true" />

    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />

    <!-- Required for Android 6.0 and later when using Bluetooth LE -->
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <!-- Required for Android 10 and later when using Bluetooth LE -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <!-- Required for Android 10 and later when using Bluetooth LE while the app is not on-screen -->
    <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
    <!-- Required for Android 12 and later when using BLE for scanning -->
    <uses-permission android:name="android.permission.BLUETOOTH_SCAN"
        android:usesPermissionFlags="neverForLocation" />
    <!-- Required for Android 12 and later when using BLE for scanning -->
    <uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />

    <!-- NFC -->
    <uses-permission android:name="android.permission.NFC" />

    <!-- Unlock notification wakes the screen -->
    <uses-permission android:name="android.permission.WAKE_LOCK" />

    <!-- permission to run as a foreground service to enable BLE scanning https://developer.android.com/about/versions/pie/android-9.0-changes-28 -->
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <!-- permission to denote foreground service types for BLE scanning -->
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE_CONNECTED_DEVICE" />

    <!-- Push Notifications -->
    <!-- Required for Android 13 and later when using push notifications -->
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
```

```xml
<!-- Required for Bluetooth Background Access - Not required if you only want foreground -->
<service 
    android:name="com.gallagher.security.mobileaccess.BleBackgroundService"
    android:exported="false"
    android:stopWithTask="false"
    android:foregroundServiceType="connectedDevice" />

<!-- Required for NFC Access - Not required if you only want bluetooth (e.g. Manual Connect only) -->
<service
    android:name="com.gallagher.security.mobileaccess.NfcBackgroundService"
    android:enabled="true"
    android:exported="true"
    android:permission="android.permission.BIND_NFC_SERVICE">
    
    <intent-filter>
        <action android:name="android.nfc.cardemulation.action.HOST_APDU_SERVICE" />
    </intent-filter>
    
    <meta-data
        android:name="android.nfc.cardemulation.host_apdu_service"
        android:resource="@xml/ggl_apduservice" />
</service>
```




