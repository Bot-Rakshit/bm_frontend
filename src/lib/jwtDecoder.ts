import { jwtDecode, JwtPayload } from "jwt-decode";

interface DecodedToken extends JwtPayload {
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