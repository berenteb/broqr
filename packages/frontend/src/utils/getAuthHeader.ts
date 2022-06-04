export function GetAuthHeader(token: string) {
  return {
    headers: { Authorization: `Bearer ${token}` }
  }
}
