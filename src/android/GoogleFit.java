package org.apache.cordova.health;

import android.app.Activity;
import android.content.Intent;
import android.content.IntentSender;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.Scopes;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.PendingResult;
import com.google.android.gms.common.api.ResolvingResultCallbacks;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.common.api.Scope;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.fitness.Fitness;
import com.google.android.gms.fitness.FitnessActivities;
import com.google.android.gms.fitness.data.Bucket;
import com.google.android.gms.fitness.data.DataPoint;
import com.google.android.gms.fitness.data.DataSet;
import com.google.android.gms.fitness.data.DataSource;
import com.google.android.gms.fitness.data.DataType;
import com.google.android.gms.fitness.data.Field;
import com.google.android.gms.fitness.request.DataReadRequest;
import com.google.android.gms.fitness.request.DataTypeCreateRequest;
import com.google.android.gms.fitness.result.DataReadResult;
import com.google.android.gms.fitness.result.DataTypeResult;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * Health plugin Android code.
 * MIT licensed.
 */
public class GoogleFitPlugin extends CordovaPlugin {
    private static final String TAG = "cordova-plugin-gfit";

    private CordovaInterface cordova;
    private GoogleApiClient mClient;
    public static final int REQUEST_OAUTH = 1;
    public static Map<String, DataType> activitydatatypes = new HashMap<String, DataType>();

    static {
        activitydatatypes.put("steps", DataType.TYPE_STEP_COUNT_DELTA);
        activitydatatypes.put("calories", DataType.TYPE_CALORIES_EXPENDED);
        activitydatatypes.put("calories.basal", DataType.TYPE_BASAL_METABOLIC_RATE);
        activitydatatypes.put("activity", DataType.TYPE_ACTIVITY_SEGMENT);
    }

    public static Map<String, DataType> bodydatatypes = new HashMap<String, DataType>();

    static {
        bodydatatypes.put("height", DataType.TYPE_HEIGHT);
        bodydatatypes.put("weight", DataType.TYPE_WEIGHT);
        bodydatatypes.put("heart_rate", DataType.TYPE_HEART_RATE_BPM);
        bodydatatypes.put("fat_percentage", DataType.TYPE_BODY_FAT_PERCENTAGE);
    }

    public static Map<String, DataType> locationdatatypes = new HashMap<String, DataType>();
    public static Map<String, DataType> nutritiondatatypes = new HashMap<String, DataType>();
    public static Map<String, DataType> customdatatypes = new HashMap<String, DataType>();
    public static Field genderField = Field.zzn("gender",Field.FORMAT_STRING);
    public static Field dayField = Field.zzn("day",Field.FORMAT_INT32);
    public static Field monthField = Field.zzn("month",Field.FORMAT_INT32);
    public static Field yearField = Field.zzn("year",Field.FORMAT_INT32);

    public GoogleFitPlugin() {}

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        this.cordova = cordova;
    }

    private CallbackContext authReqCallbackCtx;

    private void authReqSuccess(){}

    public void onActivityResult(int requestCode, int resultCode, Intent intent) {}

    @Override
    public boolean execute(String action, final JSONArray args, final CallbackContext callbackContext) throws JSONException {}

    private void isAvailable(final CallbackContext callbackContext){}

    private void requestAuthorization(final JSONArray args, final CallbackContext callbackContext) throws JSONException {}

    private boolean lightConnect(){}

    private void query(final JSONArray args, final CallbackContext callbackContext) throws JSONException {}

    private void queryAggregated(final JSONArray args, final CallbackContext callbackContext) throws JSONException {}

    private void store(final JSONArray args, final CallbackContext callbackContext) throws JSONException {}
}