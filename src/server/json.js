import express from 'express'

const jsonMiddleware = express.json()

export default function (req, res, next) {
  res.json = (obj) => {
    res.write(JSON.stringify(obj))
  }

  return jsonMiddleware(req, res, next)
}
