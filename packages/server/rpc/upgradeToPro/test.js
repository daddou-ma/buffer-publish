/* eslint-disable import/first */
jest.mock('micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';
import RPCEndpoint from './';

const accessToken = 'AN ACCESS TOKEN';
const session = {
  publish: {
    accessToken,
  },
};

const upgradeToPro = () =>
  RPCEndpoint.fn({
    cycle: 'year',
    token: 'stripe token',
    cta: 'source',
  }, {
      session,
    });

describe('rpc/upgradeToPro', () => {
  it('sends over a request to Buffer\'s API with Publish\'s access token', () => {
    rp.mockReturnValueOnce(Promise.resolve({}));
    upgradeToPro();
    expect(rp.mock.calls[0][0].form.access_token).toBe(accessToken);
  });

  it('sends over the selected cycle and current stripe token', () => {
    rp.mockReturnValueOnce(Promise.resolve({}));
    upgradeToPro();
    expect(rp.mock.calls[0][0].form.cycle).toBe('year');
    expect(rp.mock.calls[0][0].form.stripeToken).toBe('stripe token');
  });

  it('sets up product/plan to identify it is an upgrade to the Pro plan in Publish', () => {
    rp.mockReturnValueOnce(Promise.resolve({}));
    upgradeToPro();
    expect(rp.mock.calls[0][0].form.plan).toBe('pro');
    expect(rp.mock.calls[0][0].form.product).toBe('publish');
    expect(rp.mock.calls[0][0].form.cta).toBe('publish-source');
  });

  it('an error response gets returned too', () => {
    rp.mockReturnValueOnce(Promise.reject({
      error: 'Something went wrong!',
    }));

    return upgradeToPro().catch(result => expect(result.message).toBe('Something went wrong!'));
  });
});
