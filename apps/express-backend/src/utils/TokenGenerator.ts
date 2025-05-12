export function generateToken(): string {
    const bytes = new Uint8Array(6); 
    crypto.getRandomValues(bytes);
  
    return btoa(String.fromCharCode(...bytes))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
      .slice(0, 8);
}
  