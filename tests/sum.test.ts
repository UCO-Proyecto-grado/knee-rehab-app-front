import { sum } from '../src/utils/sum';

describe('sum', () => {
  it('should return 5 when adding 2 + 3', () => {
    expect(sum(2, 3)).toBe(5);
  });

  it('should return 0 when adding -1 + 1', () => {
    expect(sum(-1, 1)).toBe(0);
  });
});
