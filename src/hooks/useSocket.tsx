import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import roomAtom, { ParticipantProps, RoomProps } from '@/recoil/chat/roomAtom';
import chatAtom from '@/recoil/chat/chatAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import myRoomAtom from '@/recoil/chat/myRoomAtom';

interface newUserMessage{
  message:string,
  clientList:ParticipantProps[],
  time: string,
}

export default function useSocket() {
  const [chatSocket, setChatSocket] = useState<Socket|null>(null);
  const [siteSocket, setSiteSocket] = useState<Socket|null>(null);
  const [chat, setChat] = useRecoilState(chatAtom); // 접속중인 방의 채팅
  const setRoom = useSetRecoilState(roomAtom); // 전체 채팅방
  const [room, setRoomState] = useRecoilState(myRoomAtom); // 현재 접속 중인 채팅방

  useEffect(() => {
    if (!chatSocket || !siteSocket) {
      setChatSocket(io('http://localhost:8080/chat'));
      setSiteSocket(io('http://localhost:8080/site'));
    }
    if (chatSocket && chatSocket.disconnected) {
      chatSocket.connect();
    }
    if (siteSocket && siteSocket.disconnected) {
      siteSocket.connect();
    }
    return () => {
      if (siteSocket)siteSocket.disconnect();
      if (chatSocket)chatSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (siteSocket) {
      siteSocket.on('connect', () => { console.log('siteSocket connected'); });
    }
  }, [siteSocket]);

  useEffect(() => {
    if (chatSocket) {
      chatSocket.on('connect', () => {
        console.log('chatSocket connected');
      });
      chatSocket.on('showRoomList', (data) => {
        console.log(data);
        if (data.length === 0) {
          setRoom([{ roomName: '전체', participants: [] }]);
        } else {
          setRoom(data);
        }
      });
      chatSocket.on('updateForNewUser', (data:newUserMessage) => {
        const newChat = [...chat];
        newChat.push({ chat: data.message });
        setChat(newChat);
        chatSocket.emit('fetchRoom');
      });
    }
  }, [chatSocket]);

  return [siteSocket, chatSocket];
}
