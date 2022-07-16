import React, { useContext, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { AiOutlineMinus, AiOutlineArrowLeft, AiOutlineSend } from 'react-icons/ai';
import { lighten } from 'polished';
import { getMyPage } from '@lib/userApi';
import { useQuery } from 'react-query';
import useToken from '@hooks/useToken';
import { SocketDispatch } from '@/App';
import Button from '@/components/button';

import { useRecoilState } from 'recoil';
import chatAtom, { ChatProps } from '@/recoil/chat/chatAtom';
import roomAtom, { RoomProps, ParticipantProps } from '@/recoil/chat/roomAtom';

import myRoomAtom from '@/recoil/chat/myRoomAtom';
import participantAtom from '@/recoil/chat/participantAtom';
import Profile from './components/profileBlock';
import RoomBlock from './components/roomBlock';
import ChatBlock from './components/chatBlock';
import Participants from './components/participants';

const grow = keyframes`
  0% {
    width: 8rem;
    height: 8rem;
    border-radius: 50rem;
  }
  100%{
    width: 35rem;
    height: 60rem;
  }
`;

const ChatContaier = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 35rem;
  height: 60rem;
  position: fixed;
  font-size: 1.6rem;
  bottom:3rem;
  right:3rem;
  background-color: ${({ theme }) => lighten(0.4, theme.palette.lightViolet)};
  border-radius: 5px;
  animation:${grow} 0.1s linear 1;
  box-shadow: 0 0 5px 2px ${({ theme }) => theme.palette.gray};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 8rem;
  padding: 1.5rem;
  border-radius: 5px 5px 0 0;
  color: white;
  background: ${({ theme }) => theme.palette.lightViolet};
`;

const Content = styled.div`
  position:relative;
  width: 100%;
  height: 45rem;
  padding: 2rem 3rem;
  &::-webkit-scrollbar {
    width: 5px;
    background-color: silver;
    height: 90%;
    padding: none;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
      width:5px;
      background-color: black;
      border-radius: 2px;
    }
`;

const Sender = styled.div`
  min-height: 7rem;
  width: 100%;
  border-radius: 0 0 5px 5px;
  border-top: 1px solid ${({ theme }) => theme.palette.borderGray};
  text-align: center;
  padding: 2rem;
  position: relative;
  display:flex;
  align-items: center;
`;

const Chat = styled.textarea`
  background-color: #e3e3e3;
  resize: none;
  border: none;
  outline: none;
  flex:10;
  border-radius: 5px;
  vertical-align: middle;
  padding: 1rem;
  margin-right: 5px;
  &::-webkit-scrollbar {
      width: 5px;
      background-color: silver;
      height: 90%;
      padding: none;
      border-radius: 5px;
    }
  &::-webkit-scrollbar-thumb {
      width:5px;
      background-color: black;
      border-radius: 2px;
    }
`;

const AlertBlock = styled.p`
  text-align: center;
`;

export default function MaxChat({ minimizeHandler }:{minimizeHandler:()=>void}) {
  const { authInfo } = useToken(); // 인증 토큰
  const { chatSocket } = useContext(SocketDispatch); // 채팅용 소켓

  const { data } = useQuery(['profile', authInfo], () => authInfo && getMyPage(authInfo.token), {
    onSuccess(successdata) {
      const newUser = {
        name: successdata?.name,
        track: successdata?.track,
        trackCardinalNumber: successdata?.trackCardinalNumber,
        avatar: successdata?.githubAvatar,
      };
      if (chatSocket) {
        console.log(newUser);
        chatSocket.emit('newUser', chatSocket.id, newUser);
      }
    },
  }); // 내 프로필
  const [room, setRoom] = useRecoilState(myRoomAtom); // 내가 선택한 채팅방
  const [chatState, setChatState] = useRecoilState(chatAtom); // 채팅 목록
  const [roomState, setRoomState] = useRecoilState(roomAtom); // 채팅방 목록
  const [participant, setParticipant] = useRecoilState(participantAtom);// 참가자 목록

  const backLobbyHandler = () => {
    setRoom(null);
  };

  const handleRoomClick = (participantData:ParticipantProps[]|null, roomName:string) => {
    if (participantData) {
      setParticipant({ participantData, roomName });
    } else {
      setParticipant(null);
    }
  };

  const handleRoomEnter = (roomName:string) => {
    setRoom(roomState.filter((roomInfo) => roomInfo.roomName === roomName)[0]);
    chatSocket?.emit('joinRoom', chatSocket?.id, roomName);
    setParticipant(null);
  };

  useEffect(() => {
    if (chatSocket) { chatSocket.emit('fetchRoom'); }
  }, [room]);

  return (
    <ChatContaier>
      <Header>
        {data && (
        <Profile
          avatar={data.githubAvatar}
          name={data.name}
          track={data.track}
          trackCardinalNumber={data.trackCardinalNumber}
        />
        )}
        <div style={{ fontSize: '1.8rem' }}>
          {room
          && (
          <AiOutlineArrowLeft
            style={{ marginRight: '1rem', cursor: 'pointer' }}
            onClick={backLobbyHandler}
          />
          )}
          <AiOutlineMinus style={{ cursor: 'pointer' }} onClick={minimizeHandler} />
        </div>
      </Header>
      <Content>
        {room
          ? (
            <>
              <RoomBlock
                roomName={room.roomName}
                participant={room.participants.length}
                onClick={() => { handleRoomClick(room.participants, room.roomName); }}
              />
              {chatState.map((chat:any) => {
                if (chat.profile) {
                  return (
                    <ChatBlock
                      profile="fdf"
                      name="fdf"
                      track="fdf"
                      trackCardinalNumber={1}
                      chat="fdf"
                      mychat
                    />
                  );
                }
                return <AlertBlock>{chat.chat}</AlertBlock>;
              })}
            </>
          )
          : (
            <>
              <h2 style={{ marginBottom: '2rem' }}>개설 된 채팅</h2>
              {roomState.map(({ roomName, participants }) => (
                <RoomBlock
                  roomName={roomName}
                  participant={participants.length}
                  onClick={() => handleRoomClick(participants, roomName)}
                />
              ))}
            </>
          )}
        {participant
        && (
        <Participants
          room={room}
          participants={participant.participantData}
          clean={() => { handleRoomClick(null, ''); }}
          enter={() => { handleRoomEnter(participant.roomName); }}
        />
        )}
      </Content>
      <Sender>
        {room
        && (
        <>
          <Chat rows={2} />
          <Button>
            <AiOutlineSend />
          </Button>
        </>
        )}
      </Sender>
    </ChatContaier>
  );
}
