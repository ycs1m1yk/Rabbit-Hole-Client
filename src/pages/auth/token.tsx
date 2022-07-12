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
      const username = query.get('username');
      const expire = query.get('expire');
      if (token && username && expire) {
        setAuthState({ token, username, expire });
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
