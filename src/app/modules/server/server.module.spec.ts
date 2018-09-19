import { ServerModule } from './server.module';

describe('ServerModule', () => {
  let serverModule: ServerModule;

  beforeEach(() => {
    serverModule = new ServerModule();
  });

  it('should create an instance', () => {
    expect(serverModule).toBeTruthy();
  });
});
