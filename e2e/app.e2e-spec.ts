import { BonePage } from './app.po';

describe('bone App', () => {
  let page: BonePage;

  beforeEach(() => {
    page = new BonePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
