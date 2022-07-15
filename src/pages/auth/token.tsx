import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import authAtom from '@/recoil/auth/authAtom';
import { useSetRecoilState } from 'recoil';

import Loading from '@/components/loading';

export default function Token() {
  const [query] = useSearchParams();
  const setAuthState = useSetRecoilState(authAtom);
  useEffect(() => {
    try {
      const token = query.get('token');
      const userId = query.get('userId');
      const userName = query.get('userName');
      const expireTime = query.get('expire');
      const carrots = +(query.get('carrots') as string);
      const date = new Date();
      if (token && userName && expireTime && userId) {
        const expire = date.getTime() + parseInt(expireTime, 10) * 1000;
        setAuthState({
          token, userName, expire: expire.toString(), userId, carrots,
        });
      }
    } catch (error) {
      alert(error);
    }
    window.opener.location.reload();
    window.close();
  }, []);

  return (
    <Loading />
  );
}
