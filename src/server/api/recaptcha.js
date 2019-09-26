// import { recaptcha } from './config'
// import { getRemoteAddress } from './utils'
// import client from './client'

// Endpoint protection by api method
// eslint-disable-next-line require-await
export default async (req, res, apiMethod) => {
  // if (recaptcha.enable && recaptcha.paths[apiMethod]) {
  //   const params = {
  //     response: req.body.payload.captcha_token,
  //     secret: recaptcha.secret,
  //     ip: getRemoteAddress(req)
  //   }

  //   const { data } = await client(recaptcha.url).post(
  //     `recaptcha/api/siteverify?secret=${params.secret}&response=${
  //       params.response
  //     }&remoteip=${params.ip}`
  //   )

  //   return data.success
  // } else {
  //   return true
  // }

  return true
}
