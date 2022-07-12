import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import authAtom from '@/recoil/auth/authAtom';

export default function useToken() {
  const [authInfo, setAuthInfo] = useRecoilState(authAtom);
  const setLogout = () => {
    setAuthInfo(null);
    window.location.reload();
  };
  useEffect(() => {
    if (authInfo) {
      const date = new Date();
      if (date.getTime() >= parseInt(authInfo.expire, 10)) {
        setLogout();
      }
    }
  }, []);
  return { authInfo, setAuthInfo, setLogout };
}
