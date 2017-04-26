package com.lionsofficial;

import com.facebook.react.ReactActivity;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage; // APD | Paul | LIONS :  add it for linear gradient
import android.view.WindowManager;
import android.content.res.Configuration;
import android.content.Context;
import android.util.DisplayMetrics;
import android.os.Bundle;

import com.clarisite.mobile.ClarisiteAgent;
import com.clarisite.mobile.exceptions.EyeViewException;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "LionsOfficial";
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Fabric.with(this, new Crashlytics());
        adjustFontScale(getResources().getConfiguration());

        try {
            ClarisiteAgent.start();
        } catch  (EyeViewException e) {
        }
    }

    private void adjustFontScale(Configuration configuration) {
        if (configuration.fontScale != 1) {
            configuration.fontScale = (float) 1;
            DisplayMetrics metrics = getResources().getDisplayMetrics();
            WindowManager wm = (WindowManager) getSystemService(WINDOW_SERVICE);
            wm.getDefaultDisplay().getMetrics(metrics);
            metrics.scaledDensity = configuration.fontScale * metrics.density;
            getBaseContext().getResources().updateConfiguration(configuration, metrics);
        }
    }
}
