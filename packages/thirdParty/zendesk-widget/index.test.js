import {
  init,
  prefillWidgetForm,
  showWidget,
  updateHelpCenterSuggestions,
} from './index';

describe('init()', () => {
  it('initializes Zendesk widget', () => {
    window.zE = jest.fn();

    init();

    expect(window.zE).toHaveBeenCalledWith('webWidget', 'hide');

    expect(window.zE).toHaveBeenCalledWith(
      'webWidget',
      'helpCenter:setSuggestions',
      { labels: expect.any(Array) }
    );
  });
});

describe('prefillWidgetForm()', () => {
  it('prefills the widget with the account name + email and sets the field to read-only', () => {
    window.zE = jest.fn();
    const name = 'mocky mockson';
    const email = 'mock-email@gmail.com';

    prefillWidgetForm(name, email);

    expect(window.zE).toHaveBeenCalledWith('webWidget', 'prefill', {
      name: {
        value: name,
      },
      email: {
        value: email,
        readOnly: true,
      },
    });
  });

  it('does not set the email field to read only when the email is not set', () => {
    window.zE = jest.fn();

    prefillWidgetForm();

    expect(window.zE).toHaveBeenCalledWith('webWidget', 'prefill', {
      name: {
        value: '',
      },
      email: {
        value: '',
        readOnly: false,
      },
    });
  });
});

describe('showWidget()', () => {
  it('shows and opens the Zendesk widget', () => {
    window.zE = jest.fn();

    showWidget();

    expect(window.zE).toHaveBeenCalledWith('webWidget', 'show');

    expect(window.zE).toHaveBeenCalledWith('webWidget', 'open');
  });
});

describe('updateHelpCenterSuggestions()', () => {
  it('defaults to "scheduling" label when no path is passed', () => {
    window.zE = jest.fn();

    updateHelpCenterSuggestions();

    expect(window.zE).toHaveBeenCalledWith(
      'webWidget',
      'helpCenter:setSuggestions',
      { labels: ['scheduling'] }
    );
  });

  it('defaults to "scheduling" label when unknown path is passed', () => {
    window.zE = jest.fn();

    updateHelpCenterSuggestions('random-path');

    expect(window.zE).toHaveBeenCalledWith(
      'webWidget',
      'helpCenter:setSuggestions',
      { labels: ['scheduling'] }
    );
  });

  it('uses "posting-schedule" label when the path is "settings/posting-schedule"', () => {
    window.zE = jest.fn();

    updateHelpCenterSuggestions('settings/posting-schedule');

    expect(window.zE).toHaveBeenCalledWith(
      'webWidget',
      'helpCenter:setSuggestions',
      { labels: ['posting-schedule'] }
    );
  });
});
