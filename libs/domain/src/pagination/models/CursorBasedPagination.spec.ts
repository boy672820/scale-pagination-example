import { CursorBasedPagination } from './CursorBasedPagination';

describe('CursorBasedPagination', () => {
  it('페이지네이션 정보를 생성합니다.', () => {
    const pageInfo = CursorBasedPagination.from({
      items: [],
      totalCount: 0,
      limit: 0,
      hasNextPage: false,
      hasPrevPage: false,
      startCursor: null,
      endCursor: null,
    });

    const expected = {
      items: [],
      size: 0,
      totalCount: 0,
      hasNextPage: false,
      hasPrevPage: false,
      startCursor: null,
      endCursor: null,
    };
    expect({
      items: pageInfo.items,
      size: pageInfo.size,
      totalCount: pageInfo.totalCount,
      hasNextPage: pageInfo.hasNextPage,
      hasPrevPage: pageInfo.hasPrevPage,
      startCursor: pageInfo.startCursor,
      endCursor: pageInfo.endCursor,
    }).toEqual(expected);
  });
});
