import PushNotification from 'react-native-push-notification'
import scheduleList from '../../../contents/notification/data'
export const configure= new Promise((resolve,reject)=>{
	PushNotification.configure({
        onNotification: function(notification) {
            console.log( 'NOTIFICATION:', notification );
        }
    })
	resolve()
})


export function schedule() {
        let startDate=new Date()
        let offset=startDate.getTimezoneOffset()
        // let targetDate1=new Date(Date.UTC(2017, 1, 7, 7, 0, 0))
        // let targetDate2=new Date(Date.UTC(2017, 1, 14, 7, 0, 0))
        // console.log('!!!startDate',startDate)
        // console.log('!!!offset',offset)
        // console.log('!!!targetDate1',targetDate1)
        // console.log('!!!targetDate2',targetDate2)
        // console.log('!!!',targetDate1-startDate)
        // console.log('!!!',targetDate1-startDate+offset*60*1000)

        // PushNotification.localNotificationSchedule({
        //   message: "My Notification Message1", 
        //   date: targetDate1
        // })
        // PushNotification.localNotificationSchedule({
        //   message: "My Notification Message2", 
        //   date: targetDate2
        // })
        scheduleList.map((item,index)=>{
        	let targetDate=new Date(Date.UTC(item.year, item.month, item.day, item.hour, item.minute, item.second))
        	if(targetDate-startDate+offset*60*1000>0) {
	        	PushNotification.localNotificationSchedule({
		          message: item.message, 
		          date: new Date(Date.UTC(item.year, item.month, item.day, item.hour, item.minute, item.second))
		        })
        	}
        })
}
