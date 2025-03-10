package com.lionsofficial;

import android.app.Application;
import android.util.Log;
import android.view.WindowManager;
import android.content.res.Configuration;
import android.content.Context;
import android.util.DisplayMetrics;
import android.os.Bundle;

import com.facebook.react.ReactApplication;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import cl.json.RNSharePackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.lionsofficial.reactPackager.calendarReactPackage;
import com.lionsofficial.reactPackager.GlassBoxReactPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.BV.LinearGradient.LinearGradientPackage; // APD | Paul | LIONS :  add it for linear gradient
import com.thunderhead.one.react.OnePackage;
import android.support.multidex.MultiDex;

import java.util.Arrays;
import java.util.List;

import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.magus.fblogin.FacebookLoginPackage;
import com.facebook.FacebookSdk;
import com.facebook.applinks.AppLinkData;
import com.facebook.appevents.AppEventsLogger;

public class MainApplication extends Application implements ReactApplication {

  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNGoogleSigninPackage(),
          new GoogleAnalyticsBridgePackage(),
          new ReactNativePushNotificationPackage(),
          new RNFetchBlobPackage(),
          new RNViewShotPackage(),
          new RNSharePackage(),
          new calendarReactPackage(),
          new GlassBoxReactPackage(),
          new ReactNativeYouTube(),
          new LinearGradientPackage(),
          new FacebookLoginPackage(),
          new OnePackage()
      );
    }
  };

  @Override
  public void onCreate() {
    super.onCreate();
    FacebookSdk.sdkInitialize(getApplicationContext());
    AppEventsLogger.activateApp(this);
    AppLinkData.fetchDeferredAppLinkData(this,
            new AppLinkData.CompletionHandler() {
              @Override
              public void onDeferredAppLinkDataFetched(AppLinkData appLinkData) {
                // Process app link data
              }
            }
    );
  }

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);

    // In some cases modifying newConfig leads to unexpected behavior,
    // so it's better to edit new instance.
    Configuration configuration = new Configuration(newConfig);
    adjustFontScaleOnChange(getApplicationContext(), configuration);
  }

  private void adjustFontScaleOnChange(Context context, Configuration configuration) {
    if (configuration.fontScale != 1) {
      configuration.fontScale = 1;
      DisplayMetrics metrics = context.getResources().getDisplayMetrics();
      WindowManager wm = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
      wm.getDefaultDisplay().getMetrics(metrics);
      metrics.scaledDensity = configuration.fontScale * metrics.density;
      context.getResources().updateConfiguration(configuration, metrics);
    }
  }
}
