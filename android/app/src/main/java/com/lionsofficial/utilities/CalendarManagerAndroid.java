package com.lionsofficial.utilities;


import android.content.Intent;
import android.os.Build;
import android.provider.CalendarContract;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.TimeZone;
import java.util.Date;
/**
 * Created by John Walter Ramos on 05/10/16.
 */
public class CalendarManagerAndroid extends ReactContextBaseJavaModule {

    public CalendarManagerAndroid(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CalendarMAndroid";
    }

    @ReactMethod
    public void addCalendarEvent(String eventTitle, String notesEvent, String locationEvent, String dateOfEvent){


        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//EEE MMM dd HH:mm:ss z yyyy
        //Date fromGmt = new Date(dateOfEvent);
       try {
            Date date= sdf.parse(dateOfEvent);
            //fromGmt = new Date(date.getTime() + TimeZone.getDefault().getOffset(date.getTime()));
            //sdf.format(fromGmt)
        } catch (ParseException e) {
            e.printStackTrace();
        }
        //sdf.setTimeZone(tz);
        //Calendar beginTime = Calendar.getInstance();
        //beginTime.setTime(dateOfEvent);
        Calendar beginTime = sdf.getCalendar();

        Calendar endTime = Calendar.getInstance();
        if (Build.VERSION.SDK_INT >= 14) {

            Intent intent = new Intent(Intent.ACTION_INSERT)
                    .setData(CalendarContract.Events.CONTENT_URI)
                    .putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, beginTime.getTimeInMillis())
                    .putExtra(CalendarContract.EXTRA_EVENT_END_TIME, beginTime.getTimeInMillis() + 120 * 60 * 1000)
                    .putExtra(CalendarContract.Events.TITLE, eventTitle)
                    .putExtra(CalendarContract.Events.ALL_DAY, false)
                    .putExtra(CalendarContract.Events.DESCRIPTION, notesEvent)
                    .putExtra(CalendarContract.Events.EVENT_LOCATION, locationEvent)
                    .putExtra(CalendarContract.Events.AVAILABILITY, CalendarContract.Events.AVAILABILITY_BUSY);

            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getReactApplicationContext().startActivity(intent);
        }

        else {

            Intent intent = new Intent(Intent.ACTION_EDIT);
            intent.setType("vnd.android.cursor.item/event");
            intent.putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, beginTime.getTimeInMillis());
            intent.putExtra(CalendarContract.Events.ALL_DAY, false);
            intent.putExtra(CalendarContract.EXTRA_EVENT_END_TIME, beginTime.getTimeInMillis() + 120 * 60 * 1000);
            intent.putExtra(CalendarContract.Events.TITLE, eventTitle);
            intent.putExtra(CalendarContract.Events.DESCRIPTION, notesEvent);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getReactApplicationContext().startActivity(intent);
        }
    }


}