import { OffsetBasedPagination } from './OffsetBasedPagination';

describe('OffsetBasedPagination', () => {
  it('페이지 정보를 생성합니다.', () => {
    const items = [null, null, null];
    const totalCount = 101;
    const currentPageNumber = 1;

    const pageInfo = OffsetBasedPagination.from({
      items,
      totalCount,
      currentPageNumber,
    });

    const expected = {
      items: pageInfo.items,
      size: pageInfo.size,
      totalCount: pageInfo.totalCount,
      fixedTotalCount: pageInfo.fixedTotalCount,
    };
    expect(expected).toEqual({
      items,
      size: 3,
      totalCount: 101,
      fixedTotalCount: 10000,
    });
  });
});
