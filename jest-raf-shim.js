global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

// This code ensures that we call the img.onerror right away for the sake of testing
// (see the code in profiles-disconnected-modal/middleware.js)
Object.defineProperty(global.Image.prototype, 'src', {
  set() { this.onerror(); },
});
