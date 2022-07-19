/* eslint-disable no-underscore-dangle */
import React, {
  ChangeEvent, useContext, useEffect, useState, useCallback, KeyboardEvent, useRef,
} from 'react';
import styled, { keyframes } from 'styled-components';
import { AiOutlineMinus, AiOutlineImport, AiOutlineSend } from 'react-icons/ai';
import { lighten } from 'polished';
import { getMyPage } from '@lib/userApi';
import { useQuery } from 'react-query';
import useToken from '@hooks/useToken';
import { SocketDispatch } from '@/App';
import Button from '@/components/button';

import { useRecoilState, useRecoilValue } from 'recoil';
import chatAtom, { ChatProps } from '@/recoil/chat/chatAtom';
import roomAtom, { RoomProps, ParticipantProps } from '@/recoil/chat/roomAtom';

import participantAtom from '@/recoil/chat/participantAtom';
import { newUserMessage } from '@/hooks/useSocket';
import chatRoomAtom from '@/recoil/chat/chatRoomAtom';
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
  padding: 1rem 3rem;
  overflow-y: auto;
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
  margin: 1rem 0;
`;

// type guards
const isChat = (chat:ChatProps|newUserMessage)
:chat is ChatProps => (chat as ChatProps).profile !== undefined;

const isAlert = (chat:ChatProps|newUserMessage)
:chat is newUserMessage => (chat as newUserMessage).message !== undefined;

export default function MaxChat({ minimizeHandler }:{minimizeHandler:()=>void}) {
  const { authInfo } = useToken(); // 인증 토큰
  const { chatSocket } = useContext(SocketDispatch); // 채팅용 소켓

  const { data } = useQuery(['profile', authInfo], () => authInfo && getMyPage(authInfo.token), {
    onSuccess(successdata) {
      const newUser = {
        id: successdata?._id,
        name: successdata?.name,
        track: successdata?.track,
        trackCardinalNumber: successdata?.trackCardinalNumber,
        avatar: successdata?.githubAvatar,
      };
      // 유저 데이터 fetch 후 소켓에 등록
      if (chatSocket) {
        chatSocket.emit('newUser', chatSocket.id, newUser);
      }
    },
  }); // 내 프로필
  const [room, setRoom] = useRecoilState(chatRoomAtom); // 내가 선택한 채팅방
  const [chatState, setChatState] = useRecoilState(chatAtom); // 채팅 목록
  const roomState = useRecoilValue(roomAtom); // 채팅방 목록
  const [participant, setParticipant] = useRecoilState(participantAtom);// 참가자 목록
  const [textValue, setTextValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null); // 스크롤 시 하단 고정용 Dom selector

  useEffect(() => {
    if (chatState && scrollRef.current) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [chatState]);

  const backLobbyHandler = useCallback(() => {
    if (chatSocket) {
      chatSocket.emit('leaveRoom', chatSocket.id, room?.roomName);
      setChatState([]);
      setParticipant(null);
      chatSocket?.emit('fetchRoom');
    }
    setRoom(null);
  }, [room]);

  // eslint-disable-next-line max-len
  const handleRoomClick = useCallback((participantData:ParticipantProps[]|null, roomName:string) => {
    if (participantData) {
      setParticipant({ participantData, roomName });
    } else {
      setParticipant(null);
    }
  }, []);

  const handleRoomEnter = useCallback((roomName:string) => {
    setRoom(roomState.filter((roomInfo) => roomInfo.roomName === roomName)[0]);
    chatSocket?.emit('joinRoom', chatSocket?.id, roomName);
    chatSocket?.emit('fetchRoom');
    setParticipant(null);
  }, [roomState]);

  const chatSendHandler = () => {
    if (data) {
      const newChat:ChatProps = {
        senderId: data._id,
        profile: data.githubAvatar,
        name: data.name,
        track: data.track,
        trackCardinalNumber: data.trackCardinalNumber,
        chat: textValue,
      };
      if (textValue)chatSocket?.emit('chatMessage', room?.roomName, newChat);
      setTextValue('');
    }
  };

  const chatValueHandler = useCallback((e:ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(() => e.target.value);
  }, []);

  const chatKeyHandler = useCallback((e:KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        chatSendHandler();
      } else {
        setTextValue(textValue.replaceAll(/(\n|\r\n)/g, '<br>'));
      }
    }
  }, [textValue]);

  useEffect(() => {
    if (chatSocket) { chatSocket.emit('fetchRoom'); }
  }, []);

  useEffect(() => {
    if (room) {
      setRoom(roomState.filter((roomInfo) => roomInfo.roomName === room.roomName)[0]);
    }
  }, [roomState]);

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
            <AiOutlineImport
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
              <div style={{ position: 'sticky', top: '0' }}>
                <RoomBlock
                  roomName={room.roomName.split('-')[1]}
                  participant={room.participants.length}
                  onClick={() => { handleRoomClick(room.participants, room.roomName); }}
                />
              </div>
              {chatState.map((chat:ChatProps|newUserMessage, index:number) => {
                if (isChat(chat) && data) {
                  return (
                    <div ref={index === chatState.length - 1 ? scrollRef : null}>
                      <ChatBlock
                        profile={chat.profile}
                        name={chat.name}
                        track={chat.track}
                        trackCardinalNumber={chat.trackCardinalNumber}
                        chat={chat.chat}
                        mychat={chat.senderId === data._id}
                      />
                    </div>
                  );
                }
                if (isAlert(chat)) {
                  return <AlertBlock>{chat.message}</AlertBlock>;
                }
                return null;
              })}
            </>
          )
          : (
            <>
              <h2 style={{ marginBottom: '2rem' }}>개설 된 채팅</h2>
              {roomState.map(({ roomName, participants }) => (
                <RoomBlock
                  roomName={roomName.split('-')[1]}
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
        {(room && data)
          && (
          <>
            <Chat rows={2} value={textValue} onChange={chatValueHandler} onKeyUp={chatKeyHandler} />
            <Button onClick={chatSendHandler}>
              <AiOutlineSend />
            </Button>
          </>
          )}
      </Sender>
    </ChatContaier>
  );
}
