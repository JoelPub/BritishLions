import { NetInfo } from 'react-native'
import { setNetworkStatus } from '../../actions/network'

export function register(store){
	NetInfo.addEventListener('change',
	        (connectionInfo) => {
	        	console.log('###changeConnectionInfo',connectionInfo)
	        		console.log('###dispatch')
	        		store.dispatch(setNetworkStatus(connectionInfo))
	        }
        )
}

export function getNetinfo(callback) {
	NetInfo.fetch().done(
	        (connectionInfo) => {
	        		callback(connectionInfo.toUpperCase())
	        }
        )
}