import { SoceanicV2Page } from './app.po';

describe('soceanic-v2 App', () => {
  let page: SoceanicV2Page;

  beforeEach(() => {
    page = new SoceanicV2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
