package com.lionsofficial;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Handler;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.alipay.sdk.app.EnvUtils;
import com.alipay.sdk.app.PayTask;

import java.util.Map;

public class AlipayActivity extends AppCompatActivity {

    /** 支付宝支付业务：入参app_id */
    public static final String APPID = "2016080600182624";
    /** 商户私钥，pkcs8格式 */
    /** 如下私钥，RSA2_PRIVATE 或者 RSA_PRIVATE 只需要填入一个 */
    /** 如果商户两个都设置了，优先使用 RSA2_PRIVATE */
    /** RSA2_PRIVATE 可以保证商户交易在更加安全的环境下进行，建议使用 RSA2_PRIVATE */
    /** 获取 RSA2_PRIVATE，建议使用支付宝提供的公私钥生成工具生成， */
    /** 工具地址：https://doc.open.alipay.com/docs/doc.htm?treeId=291&articleId=106097&docType=1 */
    public static final String RSA2_PRIVATE = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCSoEIcR02tDY4BsRVkgD6QPyU1FP+V/hNe1Jiq4ErZHjADsMc+y5d8kO0+uHxkktwNH0GyxwrTFtZHxFg8tO6nmPWZ+rYh0yFz4iX78nyE1gOgcAjLjPg9ha5i/keirEXszyAj0iqa/IAPPu9sgmz0OtRfOQeqyGCJ5ewKsbYO0vhzlPn7SUZ6IcpFRONFvPn1Z4NWsJeK6044lFcnU3y2Re/0EuPEhwVRXSroMK+IbpEIh+AnbVjZIqHhfI/n6R8XaKcU4UgEpYnAA+MlS+jKvOMjpS5Gt5M/2V3KcLbaM7Z0Y2AFtys6KkTHsceRpjC57k/UP8YnCghX1NtXXOSfAgMBAAECggEAHwQFWAQBO1T9r//sfYjfMxYYYcUiV3EaWdnwvVyamJjZIT64tuDMF450kOrnbULfh2sQM6gE8ygGhcHTxGulfBBQC5VMB5WoouG4lTXy/wpiVAK+6YfVTvZDMC+HqbJ1TCV4L/uaBZTZ5d+zN6nTMEpteAMRSx/9w82+A3kaAMJvtN4jiy+KCj1zdY6C7AOcm749taHZl9MkEYrrvLJhAUvU/6DLRKlvm4MOKlByxTQXBPDYJ/8/IuPSifwqw5P3kaH7U6uKgRmknBJp6Pfdjae21wUuYx/QMYlmpYpR2SfZgvn0c7PUKhvh4ewJL7pzYlj7WykVC6WA6ntrw/bhKQKBgQDMUxtEhkIpxY0R/bpySxYHyoowPWoqVyPd/ZMmeukuCk9VTOER4wiMfMuwsezHcX9G+cVexzoCP+sUYtKLm+MmhD19WlUO8Rqc5jI5Y7s/xtxlCRxBAXW3P+j6d+vJEM8d3aphs6KmYcT5CPjDFc1TMpFx/zjk3cyblgNr2KOznQKBgQC3tXvcnlEx+5f+c6Oe5TiicPv9LUOPY73Dk0Y7HTS94ezZMLyBLJV+oTgpSQjGiuNRpZPbfq5gqQGtoUHVeIhJK3N1tLu3In9tDM3qLavxpwXXTSakGdbJAoNqC5Jm9F6xZHLLbvmUMSm0dAcN+tjv6BVHFo5dRk/mOr+cYTh6awKBgQCFk+tmsBM/NcyVL3id0eLUMyCGixAGIDPtpCJ4bLBXDhxxWrJlvDRRjCCqIpf2h4e7Af17iemtoNXx3O1iogYtnxSIB+9FtnA8lO3OwRmgh0R8tSkIgojPxXNtk8rNBzUwhEMoXoT+GzrnyGrBN1alhpC5oy4xyaNDMB6KefYDrQKBgA1Jbv/x42V+EOwyaO8hHQuCqHcTQwOn7x2qFTZJUns5T+wVfkzJcLaL6ofx5FSXzwEkvKDvdKVBFAH+28gYw6KnJd6ph7ojIJw+hNYfH4SG1AFSby0HQWWgbOjKlXgkzISAA117VUnGlIGcsrXsIqyXWJKfqwRMBZNdRGaHEZKpAoGARCoV51ei8KUMkgvpXq8mEf/BnIC/GJaBL/Gl2AUgADnM+d+gyQpnNgLBhYA0Ap60SdZMdhXVTzY6+7pWC7ZSmKQwqyJKtiMy3oQu5KQdFkiXmNUbrBVBqWteH46bWkKsPqXwcV4Q6reabujQSwRM/DFoNcLpqaepuiZX9u+pxis=";
    public static final String RSA_PRIVATE = "";
    private static final int SDK_PAY_FLAG = 1;
    private static final int SDK_AUTH_FLAG = 2;
    @SuppressLint("HandlerLeak")
    private Handler mHandler = new Handler() {
        @SuppressWarnings("unused")
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case SDK_PAY_FLAG: {
                    @SuppressWarnings("unchecked")
                    PayResult payResult = new PayResult((Map<String, String>) msg.obj);
                    String resultInfo = payResult.getResult();
                    String resultStatus = payResult.getResultStatus();
                    Toast.makeText(AlipayActivity.this, resultStatus, Toast.LENGTH_SHORT).show();
                    // 判断resultStatus 为9000则代表支付成功
                    if (TextUtils.equals(resultStatus, "9000")) {
                        // 该笔订单是否真实支付成功，需要依赖服务端的异步通知。
                        Toast.makeText(AlipayActivity.this, "支付成功", Toast.LENGTH_SHORT).show();
                    } else {
                        // 该笔订单真实的支付结果，需要依赖服务端的异步通知。
                        Toast.makeText(AlipayActivity.this, "支付失败", Toast.LENGTH_SHORT).show();
                    }
                    break;
                }
                case SDK_AUTH_FLAG: {
                    @SuppressWarnings("unchecked")
                    AuthResult authResult = new AuthResult((Map<String, String>) msg.obj, true);
                    String resultStatus = authResult.getResultStatus();

                    // 判断resultStatus 为“9000”且result_code
                    // 为“200”则代表授权成功，具体状态码代表含义可参考授权接口文档
                    if (TextUtils.equals(resultStatus, "9000") && TextUtils.equals(authResult.getResultCode(), "200")) {
                        // 获取alipay_open_id，调支付时作为参数extern_token 的value
                        // 传入，则支付账户为该授权账户
                        Toast.makeText(AlipayActivity.this,
                                "授权成功\n" + String.format("authCode:%s", authResult.getAuthCode()), Toast.LENGTH_SHORT)
                                .show();
                    } else {
                        // 其他状态值则为授权失败
                        Toast.makeText(AlipayActivity.this,
                                "授权失败" + String.format("authCode:%s", authResult.getAuthCode()), Toast.LENGTH_SHORT).show();

                    }
                    break;
                }
                default:
                    break;
            }
        };
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_alipay);
    }
    public void onBack(View v){
        finish();
    }
    /**
     * 支付宝支付业务
     *
     * @param v
     */
    public void payV2(View v) {
        if (TextUtils.isEmpty(APPID) || (TextUtils.isEmpty(RSA2_PRIVATE) && TextUtils.isEmpty(RSA_PRIVATE))) {
            new AlertDialog.Builder(this).setTitle("警告").setMessage("需要配置APPID | RSA_PRIVATE")
                    .setPositiveButton("确定", new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialoginterface, int i) {
                            //
                            finish();
                        }
                    }).show();
            return;
        }

        /**
         * 这里只是为了方便直接向商户展示支付宝的整个支付流程；所以Demo中加签过程直接放在客户端完成；
         * 真实App里，privateKey等数据严禁放在客户端，加签过程务必要放在服务端完成；
         * 防止商户私密数据泄露，造成不必要的资金损失，及面临各种安全风险；
         *
         * orderInfo的获取必须来自服务端；
         */
        boolean rsa2 = (RSA2_PRIVATE.length() > 0);
        Map<String, String> params = OrderInfoUtil2_0.buildOrderParamMap(APPID, rsa2);
        String orderParam = OrderInfoUtil2_0.buildOrderParam(params);

        String privateKey = rsa2 ? RSA2_PRIVATE : RSA_PRIVATE;
        String sign = OrderInfoUtil2_0.getSign(params, privateKey, rsa2);
        final String orderInfo = orderParam + "&" + sign;
        //支付宝沙箱android测试需要调用
        EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX);
        Runnable payRunnable = new Runnable() {

            @Override
            public void run() {
                PayTask alipay = new PayTask(AlipayActivity.this);
                Map<String, String> result = alipay.payV2(orderInfo, true);
                Log.i("msp", result.toString());

                Message msg = new Message();
                msg.what = SDK_PAY_FLAG;
                msg.obj = result;
                mHandler.sendMessage(msg);
            }
        };

        Thread payThread = new Thread(payRunnable);
        payThread.start();
    }

    /**
     * get the sdk version. 获取SDK版本号
     *
     */
    public void getSDKVersion() {
        PayTask payTask = new PayTask(this);
        String version = payTask.getVersion();
        Toast.makeText(this, version, Toast.LENGTH_SHORT).show();
    }

}
