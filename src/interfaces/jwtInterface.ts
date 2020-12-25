export default interface JWT {
  userId: string;
  userName: string;
  userEmail: string;
  iat: number;
  exp: number;
}