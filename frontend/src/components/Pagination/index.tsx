import styled from '@emotion/styled';

import ArrowRightIcon from 'assets/svg/arrow-right.svg';

type Props = {
  currentPage: number; // 0부터 시작
  totalPage: number;
  changeCurrentPage: (page: number) => void;
  pageRange?: number;
};

export default function Pagination({
  currentPage,
  totalPage,
  changeCurrentPage,
  pageRange = 10,
}: Props) {
  const hasLeftButton = currentPage >= pageRange;
  const hasRightButton = Math.ceil((currentPage + 1) / pageRange) * pageRange < totalPage;

  const moveToNextPageRange = () => {
    const nextPageRangeStart = Math.ceil((currentPage + 1) / pageRange) * pageRange;
    changeCurrentPage(nextPageRangeStart);
  };

  const moveToPrevPageRange = () => {
    const prevPageRangeStart = Math.floor(currentPage / pageRange) * pageRange - pageRange;
    changeCurrentPage(prevPageRangeStart);
  };

  const generatePageList = () => {
    const pageStart = Math.floor(currentPage / pageRange) * pageRange;
    const pageEnd = Math.min(pageStart + pageRange - 1, totalPage - 1);

    return Array.from({ length: pageEnd - pageStart + 1 }, (_, index) => pageStart + index);
  };

  return (
    <S.Container>
      {hasLeftButton && (
        <S.PageControlButton isLeft onClick={moveToPrevPageRange}>
          <ArrowRightIcon />
        </S.PageControlButton>
      )}
      <S.PageList>
        {generatePageList().map((page) => {
          const isCurrentPage = page === currentPage;
          const displayPage = page + 1;

          return (
            <li key={page}>
              <S.PageButton
                isCurrentPage={isCurrentPage}
                disabled={isCurrentPage}
                onClick={() => changeCurrentPage(page)}
              >
                {displayPage}
              </S.PageButton>
            </li>
          );
        })}
      </S.PageList>
      {hasRightButton && (
        <S.PageControlButton isLeft={false} onClick={moveToNextPageRange}>
          <ArrowRightIcon />
        </S.PageControlButton>
      )}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding: 0 20px;
  `,

  PageControlButton: styled.button<{ isLeft: boolean }>`
    transform: ${({ isLeft }) => isLeft && 'rotate(180deg)'};
  `,

  PageList: styled.ul`
    display: flex;
    gap: 8px;
  `,

  PageButton: styled.button<{ isCurrentPage: boolean }>`
    padding: 4px 8px;
    border-radius: 4px;

    background-color: ${({ theme, isCurrentPage }) => isCurrentPage && theme.colors.button.primary};
    color: ${({ theme, isCurrentPage }) => isCurrentPage && theme.colors.text};
    font-size: 2rem;
    cursor: ${({ isCurrentPage }) => isCurrentPage && 'default'};
  `,
};
