export default {
  // GET /example/:id/
  example (client, { payload, config = {} }) {
    const { id } = payload.id
    return client.get(`example/${id}/`, config)
  }
}
