export default class StorageService {
  static set(data) {
    return new Promise(resolve => {
      chrome.storage.local.set(data, () => {
        resolve(data);
      });
    });
  }

  static get(keys) {
    return new Promise(resolve => {
      chrome.storage.local.get(keys, data => {
        resolve(data);
      });
    });
  }
}
