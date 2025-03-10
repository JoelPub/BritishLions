package com.lionsofficial.reactPackager;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import com.lionsofficial.utilities.CalendarManagerAndroid;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by johnny on 05/10/16.
 */
public class calendarReactPackage implements ReactPackage {
    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
//        Add modules in here from the Utilities
        modules.add(new CalendarManagerAndroid(reactContext));

        return modules;
    }
}
