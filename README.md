# Nuxt Boilerplate (Server render)

> Boilerplate Nuxt mode server with request API from Client (Proxy)

## Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

## Usage Base Api

Use request from API

> After the Request, the action `'resource/method'` is executed, can be canceled by passing the parameter `shouldDispatch`. _Example: await this.$api.[resource][method](payload, shouldDispatch)_

```js
  const { data, status } = await this.$api.[resource][method](payload) // ex: this.$api.user.me({ id: 123 })
```

Use request from Store

```js
  await this.$store.$api[resource][method](payload) // ex: this.$store.$api.user.me({ id: 123 })
```

# Environment variable

Create file `.env` at project root or edit `/src/envs.js`

```bash
  SITE_URL=<url_site>
  BASE_URL_API=<url_api>
  BASE_URL_PROXY=<url_proxy>/api
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
