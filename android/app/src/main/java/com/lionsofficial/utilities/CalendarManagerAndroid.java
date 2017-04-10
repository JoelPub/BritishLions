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
import android.content.ContentValues;
import android.net.Uri;
import android.content.ContentResolver;
import java.util.TimeZone;
import android.database.Cursor;
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
        //String calendarId, String title, long startTime, long endTime, int allDay
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZZZZ");//EEE MMM dd HH:mm:ss z yyyy
        try {
            sdf.parse(dateOfEvent);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Calendar beginTime = sdf.getCalendar();

        Calendar endTime = Calendar.getInstance();
        //endTime.set(2012, 0, 19, 8, 30);


        if (Build.VERSION.SDK_INT >= 14) {
            Cursor cursor = getReactApplicationContext().getContentResolver().query(Uri.parse("content://calendar/calendars"),
                    new String[] { "_id", "displayName" }, "selected=1", null, null);
            if (cursor != null && cursor.moveToFirst()) {
                String[] calNames = new String[cursor.getCount()];
                int[] calIds = new int[cursor.getCount()];
                for (int i = 0; i < calNames.length; i++) {
                    // retrieve the calendar names and ids
                    // at this stage you can print out the display names to get an idea of what calendars the user has
                    calIds[i] = cursor.getInt(0);
                    calNames[i] = cursor.getString(1);
                    cursor.moveToNext();
                }
                cursor.close();
                if (calIds.length > 0) {
                    // we're safe here to do any further work
                }


                // grab calendar id from above
                int cal_id = calIds[0];
//            Intent intent = new Intent(Intent.ACTION_INSERT)
//                    .setData(CalendarContract.Events.CONTENT_URI)
//                    .putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, beginTime.getTimeInMillis())
//                    .putExtra(CalendarContract.EXTRA_EVENT_END_TIME, endTime.getTimeInMillis() + 120 * 60 * 1000)
//                    .putExtra(CalendarContract.Events.TITLE, eventTitle)
//                    .putExtra(CalendarContract.Events.ALL_DAY, true)
//                    .putExtra(CalendarContract.Events.DESCRIPTION, notesEvent)
//                    .putExtra(CalendarContract.Events.EVENT_LOCATION, locationEvent)
//                    .putExtra(CalendarContract.Events.AVAILABILITY, CalendarContract.Events.AVAILABILITY_BUSY);
//
//            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//            getReactApplicationContext().startActivity(intent);
                ContentValues event = new ContentValues();
                event.put("calendar_id", cal_id); // "" for insert
                event.put("title", eventTitle);
                event.put("description", notesEvent);
                event.put("eventLocation", locationEvent);
                event.put("allDay", true);
                event.put("eventStatus", 1);
                event.put("dtstart", beginTime.getTimeInMillis());
                event.put("dtend", endTime.getTimeInMillis() + 120 * 60 * 1000);
                //event.put("eventTimezone", TimeZone.getDefault().getID());

                ContentResolver contentResolver = getReactApplicationContext().getContentResolver();
                //Uri eventsUri = Uri.parse("content://com.android.calendar/calendars");
                Uri eventsUri = CalendarContract.Events.CONTENT_URI;
                contentResolver.insert(eventsUri, event);
                //String ret = url.toString();
                //return ret;
            }
        }

        else {
            Cursor cursor = getReactApplicationContext().getContentResolver().query(Uri.parse("content://calendar/calendars"),
                    new String[] { "_id", "displayName" }, "selected=1", null, null);
            if (cursor != null && cursor.moveToFirst()) {
                String[] calNames = new String[cursor.getCount()];
                int[] calIds = new int[cursor.getCount()];
                for (int i = 0; i < calNames.length; i++) {
                    // retrieve the calendar names and ids
                    // at this stage you can print out the display names to get an idea of what calendars the user has
                    calIds[i] = cursor.getInt(0);
                    calNames[i] = cursor.getString(1);
                    cursor.moveToNext();
                }
                cursor.close();
                if (calIds.length > 0) {
                    // we're safe here to do any further work
                }


                // grab calendar id from above
                int cal_id = calIds[0];
//            Intent intent = new Intent(Intent.ACTION_EDIT);
//            intent.setType("vnd.android.cursor.item/event");
//            intent.putExtra(CalendarContract.EXTRA_EVENT_BEGIN_TIME, beginTime.getTimeInMillis());
//            intent.putExtra(CalendarContract.Events.ALL_DAY, true);
//            intent.putExtra(CalendarContract.EXTRA_EVENT_END_TIME, beginTime.getTimeInMillis() + 120 * 60 * 1000);
//            intent.putExtra(CalendarContract.Events.TITLE, eventTitle);
//            intent.putExtra(CalendarContract.Events.DESCRIPTION, notesEvent);
//            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//            getReactApplicationContext().startActivity(intent);
                ContentValues event = new ContentValues();
                event.put("calendar_id", cal_id); // "" for insert
                event.put("title", eventTitle);
                event.put("description", notesEvent);
                event.put("eventLocation", locationEvent);
                event.put("allDay", true);
                event.put("eventStatus", 1);
                event.put("dtstart", beginTime.getTimeInMillis());
                event.put("dtend", endTime.getTimeInMillis() + 120 * 60 * 1000);
                // event.put("eventTimezone", TimeZone.getDefault().getID());

                ContentResolver contentResolver = getReactApplicationContext().getContentResolver();
                //Uri eventsUri = Uri.parse("vnd.android.cursor.item/event");
                Uri eventsUri = CalendarContract.Events.CONTENT_URI;
               contentResolver.insert(eventsUri, event);
                //String ret = url.toString();
                //return ret;
            }
        }
    }


}
