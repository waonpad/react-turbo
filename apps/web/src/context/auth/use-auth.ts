import { useEffect, useState } from 'react';

import { CredentialResponse } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

import { cookieNames } from '@/constants/cookie-names';
import { useCookies } from '@/lib/react-cookie';
import { JwtDecodedUser } from '@/types/user';
import { createCtx } from '@/utils/createCtx';

const [createdUseAuth, SetAuthProvider] = createCtx<ReturnType<typeof useAuthCtx>>();

export { SetAuthProvider };

export const useAuth = createdUseAuth;

export const useAuthCtx = () => {
  const { cookies, setCookie, removeCookie } = useCookies();

  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<JwtDecodedUser | null>(null);

  const handleGoogleLogin = (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);

    // トークンを取得できなかった場合
    if (!credentialResponse.credential) {
      console.error('credentialResponse.credential is null');

      return;
    }

    // トークンをcookieに保存
    setCookie(cookieNames.authToken, credentialResponse.credential, {});

    // トークンからユーザー情報を取得できなかった場合
    if (!credentialResponse.credential) {
      console.error('credentialResponse.credential is null');

      return;
    }

    // トークンからユーザー情報を取得
    const decodeed = jwt_decode<JwtDecodedUser>(credentialResponse.credential);

    console.log(decodeed);

    // ユーザー情報をstateに保存
    setUser(decodeed);
  };

  const logout = () => {
    // ユーザー情報をstateから削除
    setUser(null);

    // cookieからトークンを削除
    removeCookie(cookieNames.authToken);
  };

  useEffect(() => {
    const authToken = cookies[cookieNames.authToken];

    // cookieにトークンが存在しない場合
    if (!authToken) {
      setIsLoading(false);

      return;
    }

    // トークンからユーザー情報を取得
    const decodeed = jwt_decode<JwtDecodedUser>(authToken);

    console.log(decodeed);

    // ユーザー情報をstateに保存
    setUser(decodeed);

    setIsLoading(false);
    // 何かしらのCookieが変更された場合に再度実行される
  }, [cookies]);

  return {
    isLoading,
    user,
    handleGoogleLogin,
    logout,
  };
};
