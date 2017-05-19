package com.lionsofficial.utilities;

import android.widget.Toast;
import android.util.Log;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.clarisite.mobile.ClarisiteAgent;
import com.clarisite.mobile.exceptions.EyeViewException;

import java.util.HashMap;
import java.util.Map;


public class GlassBoxManger extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

      public GlassBoxManger(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Override
    public String getName() {
            return "GlassBoxManger";   //这里的名称要和js中调用的一样
    }
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }
    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }
    /*
    *void reportEvent(String event, Map<String, String> parameters)
    */

    @ReactMethod
    public void reportEvent(String eventName,String email) {
        Map<String, String> map = new HashMap<String, String>();
        map.put("email", email);
        ClarisiteAgent.reportEvent(eventName,map);
    }

}