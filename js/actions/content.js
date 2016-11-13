'use strict'

import type { Action } from './types'
import { pushNewRoute, replaceRoute} from './route'
import { alertBox } from './../components/utility/alertBox'

export const SET_CONTENT = 'SET_CONTENT'
export const PUSH_CONTENT_ITEM = 'PUSH_CONTENT_ITEM'
export const REPLACE_CONTENT_ITEM = 'REPLACE_CONTENT_ITEM'

export function fetchContent(url):Action {
    return (dispatch, getState) => {
        // const params = [
        //   'number=20',
        //   'otherparam=2'
        // ].join('&')
        return (
          fetch(url, {
          // fetch(`http://arudata.lionsrugby.com/aru/feeds/mobile/news_articles_json.php?${params}`, {
             method: 'GET'
           })
          .then((response) => response.json())
          .then((responseData) => {
              setTimeout(() => {
                  dispatch(setContent({
                      contentList: responseData
                  }))
              }, 400)
          })
          .catch((error) => {
              // Caching Network connection
              alertBox('No Network', 'No Internet connectivity. Cached data will be shown where possible. ', 'Dismiss')
          })
          .done()
      )
    }
}

export function setContent({contentList}):Action {
    return {
        type: SET_CONTENT,
        contentList
    }
}

export function pushContentItem({item}):Action {
    return {
        type: PUSH_CONTENT_ITEM,
        item
    }
}

export function drillDown(item, route:string):Action {
    return (dispatch, getState) => {
        dispatch(pushContentItem({item}))
        dispatch(pushNewRoute(route))
    }
}

export function drillReplace(item, route:string):Action {
    return (dispatch, getState) => {
      dispatch(pushContentItem({item}))
      dispatch(replaceRoute(route))
    }
}
