import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import authAtom from '@/recoil/auth/authAtom';
import { useNavigate } from 'react-router-dom';

export default function useToken() {
  const [authInfo, setAuthInfo] = useRecoilState(authAtom);
  const navigate = useNavigate();
  const setLogout = () => {
    setAuthInfo(null);
    navigate('/');
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
