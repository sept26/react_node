(function(win, doc) {
  const DOC_ELE = doc.documentElement
  const resizeEvent = 'orientationchange' in win ? 'orientationchange' : 'resize';
  const recalc = () => {
    const WIDTH = DOC_ELE.clientWidth
    if (!WIDTH) {
      return
    }
    DOC_ELE.style.fontSize = 20 * (WIDTH / 100) + 'px'
  }
  if (!DOC_ELE.addEventListener) return
  win.addEventListener(resizeEvent, recalc, false)
  doc.addEventListener('DOMContentLoaded',recalc,false)
})(window, document)