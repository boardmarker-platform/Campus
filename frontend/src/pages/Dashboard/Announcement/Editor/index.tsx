import { FormEventHandler } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { CONFIRM, PLACEHOLDER } from 'constants/message';
import { ROUTES } from 'constants/routes';
import { useAnnouncementMutate } from 'hooks/Announcement/useAnnouncementMutate';

import Button from 'components/Button';

import { useAnnouncementEditor } from './useAnnouncementEditor';

export default function Editor() {
  const { state } = useLocation();
  const {
    isEdit,
    author,
    slackChannel,
    title,
    content,
    setAuthor,
    setSlackChannel,
    setTitle,
    setContent,
  } = useAnnouncementEditor(state);
  const navigate = useNavigate();
  const { editAnnouncementContentMutate, addAnnouncementContentMutate } =
    useAnnouncementMutate(state);

  const cancelWriting: FormEventHandler = (event) => {
    event.preventDefault();

    if (confirm(CONFIRM.cancel)) navigate(ROUTES.previous.path);
  };

  const addAnnouncementContent: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const newAnnouncement = {
      author,
      slackChannel,
      title,
      content,
    };

    if (confirm(CONFIRM.post)) addAnnouncementContentMutate(newAnnouncement);
  };

  const editAnnouncementContent: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const editedAnnouncement = {
      author,
      title,
      content,
    };

    if (confirm(CONFIRM.edit)) editAnnouncementContentMutate(editedAnnouncement);
  };

  return (
    <S.Form method='post' onSubmit={isEdit ? editAnnouncementContent : addAnnouncementContent}>
      <S.InfoContainer>
        <S.AuthorInput
          type='text'
          name={'author'}
          minLength={1}
          maxLength={20}
          placeholder={PLACEHOLDER.author}
          value={author}
          onChange={(event) => setAuthor(event.currentTarget.value)}
          required
        />
        <S.SlackChannelInput
          type='text'
          name={'slackChannel'}
          minLength={1}
          maxLength={50}
          placeholder={PLACEHOLDER.slackChannel}
          value={slackChannel}
          onChange={(event) => setSlackChannel(event.currentTarget.value)}
          disabled={isEdit}
          required
        ></S.SlackChannelInput>
      </S.InfoContainer>
      <S.TitleInput
        type='text'
        name={'title'}
        minLength={1}
        maxLength={50}
        placeholder={PLACEHOLDER.title}
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
        required
      />
      <S.ContentTextArea
        name={'content'}
        minLength={1}
        maxLength={65535}
        placeholder={PLACEHOLDER.content}
        value={content}
        onChange={(event) => setContent(event.currentTarget.value)}
        required
      />
      <S.ActionContainer>
        <Button type='button' variant='secondary' color='secondary' onClick={cancelWriting}>
          취소하기
        </Button>
        <Button type='submit'>{isEdit ? '수정하기' : '등록하기'}</Button>
      </S.ActionContainer>
    </S.Form>
  );
}

const INPUT_STYLE = css`
  padding: 20px 28px;
  border: 1px solid #aaaaaa;
`;

const S = {
  Form: styled.form`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding: 24px 32px;

    background-color: ${({ theme }) => theme.colors.contentWrapper};
  `,

  InfoContainer: styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
    height: 40px;

    & > * {
      font-size: 1.6rem;
    }
  `,

  AuthorInput: styled.input`
    ${INPUT_STYLE}

    width: 30%;
  `,

  SlackChannelInput: styled.input`
    ${INPUT_STYLE}

    width: 70%;
  `,

  TitleInput: styled.input`
    ${INPUT_STYLE}

    width: 100%;
    height: 60px;

    font-size: 3.2rem;
  `,

  ContentTextArea: styled.textarea`
    ${INPUT_STYLE}

    width: 100%;
    flex: 1;

    font-size: 2rem;
    resize: none;
  `,

  ActionContainer: styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
    width: 100%;

    & > button {
      width: 50%;
    }
  `,
};
