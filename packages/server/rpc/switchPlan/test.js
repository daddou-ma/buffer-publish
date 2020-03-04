/* eslint-disable import/first */
jest.mock('@bufferapp/micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';
import RPCEndpoint from '.';

const accessToken = 'AN ACCESS TOKEN';
const session = {
  publish: {
    accessToken,
  },
};

const switchPlan = cta =>
  RPCEndpoint.fn(
    {
      cycle: 'year',
      paymentMethodId: 'mock payment method id',
      cta,
    },
    { session }
  );

describe('rpc/switchPlan', () => {
  it("sends over a request to Buffer's API with Publish's access token", () => {
    rp.mockReturnValueOnce(Promise.resolve({}));
    switchPlan();
    expect(rp.mock.calls[0][0].form.access_token).toBe(accessToken);
  });

  it('sends over the selected cycle and current payment method id', () => {
    rp.mockReturnValueOnce(Promise.resolve({}));
    switchPlan();
    expect(rp.mock.calls[0][0].form.cycle).toBe('year');
    expect(rp.mock.calls[0][0].form.payment_method_id).toBe(
      'mock payment method id'
    );
  });

  it('it sends the correct cta for specific upgrade paths', () => {
    rp.mockReturnValueOnce(Promise.resolve({}));
    switchPlan('queue_limit');
    expect(rp.mock.calls[rp.mock.calls.length - 1][0].form.cta).toBe(
      'queue_limit'
    );
  });

  it('an error response gets returned too', () => {
    rp.mockReturnValueOnce(
      Promise.reject({
        error: 'Something went wrong!',
      })
    );

    return switchPlan().catch(result =>
      expect(result.message).toBe('Something went wrong!')
    );
  });
});
