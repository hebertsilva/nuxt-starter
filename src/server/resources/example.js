export default {
  foo (client, { payload, config = {} }) {
    return client.get('b043df5a', config)
  }
}
