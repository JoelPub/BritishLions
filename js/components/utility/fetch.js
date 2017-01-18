import 'regenerator-runtime'
import _ from 'lodash'
export default async function decoratedFetch (opts) {
  opts = _.extend({
    method: 'GET',
    url: null,
    query: null,
    pagination: null,
    body: null,
    hasFile: false,
    headers: { },
    useToken: false,
    callback: null
  }, opts)

  if (opts.useToken) return await _fetch(opts)

  return await _fetch(opts)
}

function promiseDelay (wait, func, args) {
  return new Promise(resolve => {
    for (let i = 0; i < 1; i++) {
      _.delay(() => resolve(func(args)), wait)
    }
  })
}

async function _fetch (opts) {
  let reqOpts = {
    method: opts.method,
    headers: { },
    credentials: 'include'
  }


  if (!_.isEmpty(opts.headers)) {
    for (let key of Object.keys(opts.headers)) {
      reqOpts.headers[key] = opts.headers[key]
    }
  }

  if (opts.method === 'POST' || opts.method === 'PUT' || opts.method === 'PATCH') {
    reqOpts.headers['Accept'] = 'application/json'
    if (!reqOpts.headers['Content-Type'] && !opts.hasFile && opts.body) reqOpts.headers['Content-Type'] = 'application/json'
  }

  if (opts.body) {
//     if (checkRequestContentType(reqOpts, 'multipart/form-data')) {
    if (opts.hasFile) {
      reqOpts.body = opts.body
    } else if (checkRequestContentType(reqOpts, 'application/json')) {
      reqOpts.body = JSON.stringify(opts.body)
    }
  }

  let queryString = ''
  if (opts.query) {
    for (let key of Object.keys(opts.query)) {
      if (!queryString) queryString = key + '=' + opts.query[key]
      else queryString += '&' + key + '=' + opts.query[key]
    }
  }
  if (opts.pagination) {
    for (let key of Object.keys(opts.pagination)) {
      if (!queryString) queryString = key + '=' + opts.pagination[key]
      else queryString += '&' + key + '=' + opts.pagination[key]
    }
  }

  let url

  if (opts.url.toLowerCase().startsWith('http')) url = opts.url
  else url = API_BASE_URL + opts.url

//   if (__DEV__) {
//     console.log('fetching ' + url + (queryString ? '?' + queryString : ''))
//     console.log(reqOpts)
//   }
  return await fetch(url + (queryString ? '?' + queryString : ''), reqOpts)
    .then(handleErrors)
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        if (checkResponseContentType(response, 'application/json')) {
          if (!response.headers.has('X-Total-Count')) return response.json()

          return response.json().then(json => {
            return new Promise((resolve, reject) => {
              resolve(_.extend(json, {
                pageIndex: parseInt(response.headers.get('X-Page-Index')),
                pageSize: parseInt(response.headers.get('X-Page-Size')),
                pageMaxIndex: parseInt(response.headers.get('X-Page-Max-Index')),
                pageRangeHigh: parseInt(response.headers.get('X-Page-Range-High')),
                pageRangeLow: parseInt(response.headers.get('X-Page-Range-Low')),
                totalCount: parseInt(response.headers.get('X-Total-Count'))
              }))
            })
          }).catch(error => {
            throw error
          })
        } else if (checkResponseContentType(response, 'text/plain') || checkResponseContentType(response, 'text/html')) {
          return response.text()
        }
      } else if (response.status === 401 || response.status === 403) {
        handle40X(response)
      } else {
        throw response
      }
    })
    .catch(handle40X)
    .catch(error => {
      throw error
    })
}

function handle40X (response) {
  if (response.status === 401 || response.status === 403) {
    apiFactory().redirectLoginCallback(response)
    throw response
  }
  throw response
}

function handleErrors (response) {
  if (!response.ok) throw response
  return response
}

// Can check request or response header if a content type exists
function checkResponseContentType (r, contentType) {
  if (r.headers.get('content-type')) return r.headers.get('content-type').includes(contentType)
  return false
}

function checkRequestContentType (r, contentType) {
  if (r.headers['Content-Type']) return r.headers['Content-Type'].includes(contentType)
  return false
}
