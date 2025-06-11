interface UserProfileResponse {
  displayName: string;
  givenName: string;
  mail: string;
  surname: string;
  userPrincipalName: string;
  id: string;
}

interface TokenInfoResponse {
  access_token: string;
}