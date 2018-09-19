import { Html2textPipe } from './html2text.pipe';

describe('Html2textPipe', () => {
  it('create an instance', () => {
    const pipe = new Html2textPipe();
    expect(pipe).toBeTruthy();
  });
});
