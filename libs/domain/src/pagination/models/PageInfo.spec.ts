import { PageInfo, Pagination } from './PageInfo';

describe('Pagination', () => {
  it('페이지네이션 정보를 생성합니다.', () => {
    const pagination = Pagination.from({ items: [], totalCount: 0, limit: 0 });

    const expected: PageInfo<unknown> = {
      items: [],
      size: 0,
      totalCount: 0,
      hasNextPage: false,
      hasPrevPage: false,
    };
    expect({
      items: pagination.items,
      size: pagination.size,
      totalCount: pagination.totalCount,
      hasNextPage: pagination.hasNextPage,
      hasPrevPage: pagination.hasPrevPage,
    }).toEqual(expected);
  });

  describe('다음 페이지가 존재할 경우', () => {
    it('제한 갯수보다 아이템이 많다면 다음 페이지가 존재합니다.', () => {
      const items = [{}, {}, {}, {}];
      const limit = 3;
      const pagination = Pagination.from({
        items,
        limit,
        totalCount: 4,
      });

      expect(pagination.hasNextPage).toBeTruthy();
      expect(pagination.items.length).toBe(3);
    });

    it('제한 갯수보다 아이템이 적다면 다음 페이지가 존재하지 않습니다.', () => {
      const items = [{}, {}, {}];
      const limit = 3;
      const pagination = Pagination.from({
        items,
        limit,
        totalCount: 4,
      });

      expect(pagination.hasNextPage).toBeFalsy();
    });
  });

  describe('이전 페이지가 존재하지 않을 경우', () => {
    it('첫 페이지 또는 아이템이 없다면 이전 페이지가 존재하지 않습니다.', () => {
      const firstPage = Pagination.from({
        items: [{}],
        limit: 1,
        totalCount: 1,
      });

      expect(firstPage.hasPrevPage).toBeFalsy();

      const noItem = Pagination.from({ items: [], limit: 1, totalCount: 1 });

      expect(noItem.hasPrevPage).toBeFalsy();
    });

    it('커서(포인터)와 아이템이 존재하면 이전 페이지가 존재합니다.', () => {
      const cursor = 'cursor';
      const pagination = Pagination.from({
        cursor,
        items: [{}],
        limit: 1,
        totalCount: 2,
      });

      expect(pagination.hasPrevPage).toBeTruthy();
    });
  });
});
