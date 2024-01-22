import styled from '@emotion/styled';

import Button from 'components/Button';

import { useAttendanceMutation } from '../../../hooks/Attendance/useAttendanceMutation';

export default function Main() {
  const { postAttendance, attendanceStatus } = useAttendanceMutation();

  const attendance = () => {
    sessionStorage.setItem('authAttendance', `Basic ${btoa('Aker')}`);
    postAttendance();
  };

  return (
    <S.Container>
      <S.Status>{attendanceStatus}</S.Status>
      <Button onClick={attendance}>출석하기</Button>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 16px;
  `,

  Status: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;

    font-size: 4rem;
  `,
};
