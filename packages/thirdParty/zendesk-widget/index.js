function getHelpCenterSuggestions(pathname) {
  let searchTerm;
  const searchTermsDictionary = {
    awaitingApproval: ['approvals'],
    pendingApproval: ['approvals'],
    drafts: ['approvals'],
    pastReminders: ['reminders'],
    stories: ['stories'],
    campaigns: ['campaigns'],
    analytics: ['analytics'],
    grin: ['shop-grid'],
    settings: ['publish-settings'],
    'settings/posting-schedule': ['posting-schedule'],
    'preferences/general': ['general'],
    'preferences/security': ['security'],
    'preferences/notifications': ['notifications'],
    'preferences/appsandextras': ['integrations'],
  };

  Object.keys(searchTermsDictionary).forEach(key => {
    if (pathname.match(key)) {
      searchTerm = searchTermsDictionary[key];
    }
  });

  return searchTerm || ['scheduling'];
}

function updateHelpCenterSuggestions(currentPath = '/') {
  if (window.zE) {
    window.zE('webWidget', 'helpCenter:setSuggestions', {
      labels: getHelpCenterSuggestions(currentPath),
    });
  }
}

function init(currentPath = '/') {
  if (window.zE) {
    const settings = {
      webWidget: {
        color: {
          theme: '#2C4BFF',
          text: '#3D3D3D',
          button: '#2C4BFF',
          buttonText: '#000000',
          articleLinks: '#2C4BFF',
          resultLists: '#2C4BFF',
          header: '#121E66',
        },
        contactForm: {
          title: {
            '*': 'Get in Touch',
          },
        },
        helpCenter: {
          messageButton: {
            '*': 'Get in Touch',
          },
        },
      },
    };
    window.zE('webWidget', 'updateSettings', settings);
    window.zE('webWidget', 'hide');

    window.zE('webWidget:on', 'close', () => {
      window.zE('webWidget', 'hide');
    });

    updateHelpCenterSuggestions(currentPath);
  }
}

function prefillWidgetForm(name, email) {
  if (window.zE) {
    window.zE('webWidget', 'prefill', {
      name: {
        value: name || '',
      },
      email: {
        value: email || '',
        readOnly: !!email,
      },
    });
  }
}

function showWidget() {
  if (window.zE) {
    window.zE('webWidget', 'show');
    window.zE('webWidget', 'open');
  }
}

module.exports = {
  init,
  prefillWidgetForm,
  updateHelpCenterSuggestions,
  showWidget,
};
