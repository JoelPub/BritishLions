import { NetInfo } from 'react-native'
import { setNetworkStatus } from '../../actions/network'

export function register(store){
	NetInfo.addEventListener('change',
	        (connectionInfo) => {
	        store.dispatch(setNetworkStatus(connectionInfo))
	        }
        )
    NetInfo.fetch().done(
	        (connectionInfo) => {
	        store.dispatch(setNetworkStatus(connectionInfo))
	        }
        )
}
