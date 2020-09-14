import StorageService from './services/storage.js'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.getData) {
    StorageService.get().then((data) => sendResponse({ data }))
    return true
  }
})
