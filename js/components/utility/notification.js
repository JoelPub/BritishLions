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
        // console.log('!!!startDate',startDate)
        // console.log('startDate', startDate)
        scheduleList.map((item,index)=>{
        	let targetDate = new Date(Date.UTC(item.year, item.month, item.day, item.hour, item.minute, item.second))
        	// console.log(targetDate, item.message)
            // console.log('!!!',targetDate-startDate)
            // console.log('!!!',targetDate-startDate+offset*60*1000)
            if(targetDate-startDate>0) {
	        	PushNotification.localNotificationSchedule({
		          message: item.message, 
		          date: targetDate
		        })
        	}
        })
}
