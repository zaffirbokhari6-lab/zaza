# Hawa mobile release path

## Install it now on an iPhone

Open [Hawa](https://zaffirbokhari6-lab.github.io/zaza/) in Safari, tap **Share**, then **Add to Home Screen**. The web app now has an install manifest, offline app shell, saved areas, and a privacy page. Location access remains optional.

## Prepare an iOS App Store build

This project uses Capacitor to package the existing web app as an iOS app. Capacitor 8 requires Node.js 22+ and Xcode 26+ for iOS. This computer has Node 24 and Command Line Tools, but no full Xcode installation, so it cannot build/sign an iPhone archive yet.

1. Install full Xcode 26 or later from the Mac App Store and open it once to finish setup.
2. Replace `com.example.hawa` in `capacitor.config.json` with a unique bundle ID you control.
3. From this folder run:

   ```sh
   npm install
   npm run make:icons
   npm run copy:web
   npm run ios:add
   npm run ios:sync
   npm run ios:open
   ```

4. In Xcode, set your Apple Developer team, confirm the bundle ID, add the location purpose string (`NSLocationWhenInUseUsageDescription`) explaining that location is used to show the selected area's air-quality estimate, then run the app on an iPhone.
5. Join the Apple Developer Program, create the matching app record in App Store Connect, complete the privacy answers and listing, archive/sign the app in Xcode, and upload it to TestFlight for device review. Submit the tested build to Apple App Review from App Store Connect.

The vector brand mark is `icon.svg`; `npm run make:icons` creates a matching 1024 px PNG in `assets/icon.png` plus web/home-screen sizes.

Apple's program membership is currently USD $99/year (local pricing may differ). Apple's review guidelines say apps need useful, app-like functionality beyond a repackaged website; saved areas and a forecast are included, but approval is Apple's decision. Do not submit until the native build has been tested on a real device and the privacy disclosures have been verified.
