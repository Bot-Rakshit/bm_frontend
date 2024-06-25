import { jwtDecode } from "jwt-decode";

interface DecodedToken extends jwtDecode.JwtPayload {
  verificationCode: string;
  chessUsername?: string;
  id: string;
  email: string;
  name: string;
  youtubeChannelId?: string;
}

export function decodeJwt(token: string): DecodedToken {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    throw error;
  }
}