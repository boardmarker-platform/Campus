import styled from '@emotion/styled';

import { SIZE_PER_PAGE, SIZE_PER_SCROLL } from 'constants/announcement';
import { IS_DESKTOP } from 'constants/viewport';

export default function Skeleton() {
  const List = Array.from({ length: IS_DESKTOP ? SIZE_PER_PAGE : SIZE_PER_SCROLL }, (_, i) => i);

  return (
    <S.List>
      {List.map((value) => {
        return (
          <S.SkeletonItem key={value}>
            <S.SkeletonContentContainer>
              <S.SkeletonTitle />
              <S.SkeletonInformation />
            </S.SkeletonContentContainer>
          </S.SkeletonItem>
        );
      })}
    </S.List>
  );
}

const S = {
  List: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  `,

  SkeletonItem: styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    width: 100%;
    height: 120px;
    padding: 24px 32px;

    background-color: ${({ theme }) => theme.colors.contentWrapper};
  `,

  SkeletonContentContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
  `,

  SkeletonTitle: styled.div`
    width: 320px;
    height: 2.8rem;
    border-radius: 4px;

    background-color: #e0e0e0;
  `,

  SkeletonInformation: styled.div`
    width: 160px;
    height: 1.6rem;
    border-radius: 4px;

    background-color: #e0e0e0;
  `,

  SkeletonActionContainer: styled.div`
    display: flex;
    gap: 16px;
  `,

  SkeletonEditLink: styled.div`
    border-radius: 4px;
    width: 58px;
    height: 32px;

    background-color: #e0e0e0;
  `,

  SkeletonDeleteButton: styled.div`
    border-radius: 4px;
    width: 58px;
    height: 32px;

    background-color: #e0e0e0;
  `,
};
