package com.lionsofficial.utilities;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.clarisite.mobile.ClarisiteAgent;
import com.clarisite.mobile.exceptions.EyeViewException;


public class ClarisiteAgentManagerAndroid extends ReactContextBaseJavaModule {

    public ClarisiteAgentManagerAndroid(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ClarisiteAgentBridge";
    }

    @ReactMethod
    public void start(  String url,
                        String appid,
                        Callback errorCallback,
                        Callback successCallback){
        try {
            ClarisiteAgent.start(url,appid,null);
            successCallback.invoke("ClarisiteAgent start success");
        } catch  (EyeViewException e) {
            errorCallback.invoke(e);
        }
    }


}
