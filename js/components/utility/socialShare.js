import { Alert, Share, Platform } from 'react-native'
import { alertBox } from './alertBox'

export function shareTextWithTitle (text, posturl) {
        Share.share(posturl===''?{
            title: '',
            message: text
        }:
        {
            title: '',
            message: Platform.OS==='ios'?text:text + ' ' + posturl,
            url:posturl
        }, {
            dialogTitle: 'Share via',
            // excludedActivityTypes: [
            //   'com.apple.uikit.activity.mail'
            // ],
            // tintColor: 'red'
        })
        .then(
            result => Platform.OS==='ios'&&result.action === 'sharedAction' ? alertBox('Success','The content has been shared successfully') : null
            )
        .catch(
            err => alertBox('Ooops','Failed to share. please try again later')
            )
}
