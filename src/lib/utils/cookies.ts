export function setCookie(name: string, value: string, minutes: number) {
  let expires = ''
  if (minutes) {
    const date = new Date()
    date.setTime(date.getTime() + minutes * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  if (typeof document !== 'undefined') {
    document.cookie = name + '=' + (value || '') + expires + '; path=/'
  }
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null
  }
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}
