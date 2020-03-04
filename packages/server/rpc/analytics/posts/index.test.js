/* eslint-disable import/first */

jest.mock('@bufferapp/micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';
import posts from './';

describe('rpc/posts', () => {
  const request = {
    app: {
      get: () => 'analyze-api',
    },
  };
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have the expected name', () => {
    expect(posts.name).toBe('posts');
  });

  it('should have the expected docs', () => {
    expect(posts.docs).toBe('fetch analytics posts for profiles and pages');
  });

  it('should fetch posts for the given profileId and date range', async () => {
    const profileId = 'profile-123';
    const startDate = '2019-02-01';
    const endDate = '2019-02-28';
    const sortBy = 'sent_at';
    const descending = 'false';
    const limit = 5;
    const searchTerms = ['foo'];
    rp.mockReturnValueOnce(
      Promise.resolve({
        response: ['post 1', 'post 2', 'post 3'],
      })
    );

    await posts.fn(
      { profileId, startDate, endDate, sortBy, descending, limit, searchTerms },
      request
    );

    expect(rp.mock.calls[0]).toEqual([
      {
        uri: 'analyze-api/posts',
        method: 'POST',
        strictSSL: !(
          process.env.NODE_ENV === 'development' ||
          process.env.NODE_ENV === 'test'
        ),
        body: {
          profile_id: profileId,
          start_date: startDate,
          end_date: endDate,
          sort_by: 'date',
          descending,
          limit,
          search_terms: searchTerms,
        },
        json: true,
      },
    ]);
  });

  it('should normalize post date', async () => {
    rp.mockReturnValueOnce(
      Promise.resolve({
        response: [{ date: 42, foo: 'foo' }],
      })
    );

    const response = await posts.fn({}, request);
    expect(response[0]).toEqual({ date: 42000, foo: 'foo' });
  });
});
