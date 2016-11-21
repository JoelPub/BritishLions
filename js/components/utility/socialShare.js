import { Alert, Share, Platform } from 'react-native'
import { alertBox } from './alertBox'

export function shareTextWithTitle (text, posturl) {
    Share.share({
        //title: text,
        message: text + ' ' + posturl,
        url:posturl
    }, {
        dialogTitle: 'Share via',
        // excludedActivityTypes: [
        //   'com.apple.uikit.activity.mail'
        // ],
        // tintColor: 'red'
    })
    .then(
        result => Platform.OS==='ios'&&result.action === 'sharedAction' ? alertBox('Success','Content Shared Successfully') : null
        )
    .catch(
        err => alertBox('Failed to Share','An error occured. Please try again')
        )
}
