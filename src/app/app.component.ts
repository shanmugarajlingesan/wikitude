/// <reference path="WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      /** Enter your Wikitude (trial) License Key here */
      WikitudePlugin._sdkKey = "UztQ2abAnHMYsuQaGDuQouNdX3An5+jQRe39FjV1UeVQ3BqejWE/p8rSj9DLwDsOGaVx/C2+H7ekQhVYCiCEnt46mivAQDXnJO/lzbUgqROSqfBGohCu5sC8bfG6HA/Oy3Kfawq5tycxUBEy8Eu9kbT/FMewpD9M0HGKP59ZZWZTYWx0ZWRfX5ot2IWntJO3/AXXfPSaGcVpkWxD/i7p2x+k3w1KyN3+b8Pce59TIg3C3yHTy1CBDG0FjKODlkcHqQwsvCfYNqlqw7KwJvkbDFbqeq+G/pJYKXa1WpRwHgfKQkNKD3e915fMKmVll6+Ri6ZebsUzMND0RvtzcTFyHKdAmxuEGg/l+5LjjcPW/SydlvTDzrO5se1nosCFh736fdmlGk+L1l3h5Y0vNfeOhg8G6H/lfGX1Mo+YIUirYaA4kjagwb1u18nh2dCfXG7XwJ4eTueI5O3VP/9smsw8/TVLB1ww0w6nxtvIIYRCyBllBnJ14PN+HX5nENZA61a+qJnLLevomo3SRovVy55SYqgh0DodVvIEJvuWNv59FACi6vfG8tROS8M2lm85znBX4WMzDOxRHVz4SVFZnZV04et8yg37rKaBdXhnrv2SADoozEXQfdiMg8yT5LlHr2BibjAbW76BYwFMGvj1pZfYmDBjCNCX+p/kBI11FVI8ehE=";

      /** Check if your device supports AR */
      WikitudePlugin.isDeviceSupported(
          function(success) {
            console.log("Your platform supports AR/Wikitude. Have fun developing!!");
          },
          function(fail) {
            console.log("Your platform failed to run AR/Wikitude: "+fail);
          },
          [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
      );                  

      /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works 
       * through the function below for the direction Ionic2 app --> Wikitude SDK 
       * For calls from Wikitude SDK --> Ionic2 app see the captureScreen example in 
       * WikitudeIonic2StarterApp/www/assets/3_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
      // set the function to be called, when a "communication" is indicated from the AR View  
      WikitudePlugin.setOnUrlInvokeCallback(function(url) {

        // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
        if (url.indexOf('captureScreen') > -1) {
            WikitudePlugin.captureScreen(
                (absoluteFilePath) => {
                    console.log("snapshot stored at:\n" + absoluteFilePath);

                    // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                    WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
                },
                (errorMessage) => {
                    console.log(errorMessage);
                },
                true, null
            );
        } else {
            alert(url + "not handled");
        }
      });

      /**
       * Define the generic ok callback
       */
      WikitudePlugin.onWikitudeOK = function() {
          console.log("Things went ok.");
      }
      
      /**
       * Define the generic failure callback
       */
      WikitudePlugin.onWikitudeError = function() {
          console.log("Something went wrong");
      }

      // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native 
      // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
      //WikitudePlugin.setLocation(47, 13, 450, 1);

      /* for Android only
      WikitudePlugin.setBackButtonCallback(
          () => {
              console.log("Back button has been pressed...");
          }
      );                  
      */

    });
  }
}
