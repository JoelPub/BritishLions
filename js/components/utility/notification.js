import PushNotification from 'react-native-push-notification'
import scheduleList from '../../../contents/notification/data'
export const configure= new Promise((resolve,reject)=>{
  PushNotification.configure({
        onNotification: function(notification) {
            if (__DEV__)console.log( 'NOTIFICATION:', notification );
        }
    })
  resolve()
})


export function schedule() {
        let startDate=new Date()
        let offset=startDate.getTimezoneOffset()
        PushNotification.cancelAllLocalNotifications()
        //  if (__DEV__)console.log('!!!startDate',startDate)
        // if (__DEV__)console.log('startDate', startDate)
        scheduleList.map((item,index)=>{
          let targetDate = new Date(Date.UTC(item.year, item.month, item.day, item.hour, item.minute, item.second))
          // if (__DEV__)console.log(targetDate, item.message)
         //     if (__DEV__)console.log('!!!',targetDate-startDate)
         //     if (__DEV__)console.log('!!!',targetDate-startDate+offset*60*1000)
            if(targetDate-startDate>0) {
            PushNotification.localNotificationSchedule({
                  title: 'Lions Official',
              message: item.message, 
              date: targetDate
            })
          }
        })
}
