import { CursorBasedPagination } from './CursorBasedPagination';
import { Record } from './interfaces';

const createRecord = () => {
  let cursor = 0;
  return (): Record => {
    cursor += 1;
    return { cursor: cursor.toString() };
  };
};

describe('CursorBasedPagination', () => {
  it('페이지네이션 정보를 생성합니다.', () => {
    const pageInfo = CursorBasedPagination.from({
      items: [],
      totalCount: 0,
      limit: 0,
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

  describe('다음 페이지가 존재할 경우', () => {
    it('제한 갯수보다 아이템이 많다면 다음 페이지가 존재합니다.', () => {
      const makeRecord = createRecord();

      const items = [makeRecord(), makeRecord(), makeRecord(), makeRecord()];
      const limit = 3;
      const pagination = CursorBasedPagination.from({
        items,
        limit,
        totalCount: 4,
      });

      expect(pagination.hasNextPage).toBeTruthy();
      expect(pagination.items.length).toBe(3);
    });

    it('제한 갯수보다 아이템이 적다면 다음 페이지가 존재하지 않습니다.', () => {
      const makeRecord = createRecord();
      const items = [makeRecord(), makeRecord(), makeRecord()];
      const limit = 3;
      const pagination = CursorBasedPagination.from({
        items,
        limit,
        totalCount: 4,
      });

      expect(pagination.hasNextPage).toBeFalsy();
    });
  });

  describe('이전 페이지가 존재하지 않을 경우', () => {
    it('첫 페이지 또는 아이템이 없다면 이전 페이지가 존재하지 않습니다.', () => {
      const firstPage = CursorBasedPagination.from({
        items: [{ cursor: '1' }],
        limit: 1,
        totalCount: 1,
      });

      expect(firstPage.hasPrevPage).toBeFalsy();

      const noItem = CursorBasedPagination.from({
        items: [],
        limit: 1,
        totalCount: 1,
      });

      expect(noItem.hasPrevPage).toBeFalsy();
    });

    it('커서(포인터)와 아이템이 존재하면 이전 페이지가 존재합니다.', () => {
      const cursor = 'cursor';
      const pagination = CursorBasedPagination.from({
        cursor,
        items: [{ cursor: '1' }],
        limit: 1,
        totalCount: 2,
      });

      expect(pagination.hasPrevPage).toBeTruthy();
    });
  });
});
