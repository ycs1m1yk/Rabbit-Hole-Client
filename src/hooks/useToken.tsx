import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import authAtom from '@/recoil/auth/authAtom';

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
