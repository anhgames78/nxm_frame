import cookies from 'js-cookie'

export const getUserFromCookie = () => {
  const cookie = cookies.get('nxm_auth')
  if (!cookie) {
    return
  }
  return JSON.parse(cookie)
}

export const setUserCookie = (user) => {
  cookies.set('nxm_auth', user, {
    // firebase id tokens expire in one hour
    // set cookie expiry to match
    expires: 1 / 24,
  })
}

export const removeUserCookie = () => cookies.remove('nxm_auth')