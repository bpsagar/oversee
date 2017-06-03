import axios from 'axios'


var AssetCache = {
  cache: {},
  load: (asset, cb) => {
    axios({
      url: asset.url,
      method: 'get',
      responseType: 'blob'
    }).then((response) => {
      AssetCache.cache[asset.url] = URL.createObjectURL(response.data)
      cb()
    })
  },
  get: (url) => {
    if (!(url in AssetCache.cache)) {
      return url
    }
    else {
      return AssetCache.cache[url]
    }
  }
}

export default AssetCache
