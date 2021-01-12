export const mapUserData = async (user) => {
  const { uid, email, photoURL } = user
  const token = await user.getIdToken(true)
  return {
    id: uid,
    email,
    photo: photoURL,
    token,
  }
}