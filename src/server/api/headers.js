// Generate headers for request
export default function genHeaders (req) {
  console.log('EEE req =>', req)
  return {
    'Content-Type': 'application/json'
  }
}
