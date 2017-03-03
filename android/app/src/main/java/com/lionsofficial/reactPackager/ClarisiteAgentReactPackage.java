package com.lionsofficial.reactPackager;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import com.lionsofficial.utilities.ClarisiteAgentManagerAndroid;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ClarisiteAgentReactPackage implements ReactPackage {
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
        modules.add(new ClarisiteAgentManagerAndroid(reactContext));

        return modules;
    }
}
