import { Alert, Share } from 'react-native'
import { alertBox } from './alertBox'

export function shareTextWithTitle (text, url) {
    Share.share({
        title: text,
        message: text + ' ' + url
    }, {
        dialogTitle: 'Share via',
        // excludedActivityTypes: [
        //   'com.apple.uikit.activity.mail'
        // ],
        // tintColor: 'red'
    }).then(result => result.action === 'sharedAction' ? alertBox('Success','Content Shared Successfully') : null)
    .catch(err => alertBox('Failed to Share','An error occured. Please try again'))
}
