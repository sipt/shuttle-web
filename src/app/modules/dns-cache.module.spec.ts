import { DnsCacheModule } from './dns-cache.module';

describe('DnsCacheModule', () => {
  let dnsCacheModule: DnsCacheModule;

  beforeEach(() => {
    dnsCacheModule = new DnsCacheModule();
  });

  it('should create an instance', () => {
    expect(dnsCacheModule).toBeTruthy();
  });
});
