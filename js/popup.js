import StorageService from './services/storage.js'

class Extension {
  init () {
    this.initOpacity()
    this.initImage()
  }

  initOpacity () {
    $('.opacity-100').click(() => {
      this.setShadowOpacity(1)
    })
    $('.opacity-90').click(() => {
      this.setShadowOpacity(0.9)
    })
    $('.opacity-50').click(() => {
      this.setShadowOpacity(0.5)
    })

    StorageService.get().then(data => {
      this.setShadowOpacity(data.opacity || 2)
    })
  }

  initImage () {
    $('.image-1').click(() => {
      this.setImage(1)
    })
    $('.image-2').click(() => {
      this.setImage(2)
    })
    $('.image-3').click(() => {
      this.setImage(3)
    })

    // Set default
    StorageService.get().then(data => {
      this.setImage(data.image || null)
    })
  }

  setShadowOpacity (opacity) {
    if (opacity) {
      // Switch button active class
      $('.opacity .button--active').removeClass('button--active')
      const $button = $(`.opacity-${opacity * 100}`)
      if ($button) {
        $button.addClass('button--active')
      }

      // Send request to the content script
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { setShadowOpacity: opacity })
      })

      // Save current opacity in storage
      StorageService.set({ opacity })
    }
  }

  setImage (image) {
    // Switch button active class
    $('.image .button--active').removeClass('button--active')
    const $button = $(`.image-${image}`)
    if ($button) {
      $button.addClass('button--active')
    }

    // Send request to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { setImage: image })
    })

    // Save current opacity in storage
    StorageService.set({ image })
  }
}

const extension = new Extension()
extension.init()
