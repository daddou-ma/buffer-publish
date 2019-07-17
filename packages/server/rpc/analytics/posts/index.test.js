/* eslint-disable import/first */
import moment from 'moment-timezone';

jest.mock('micro-rpc-client');
jest.mock('request-promise');
jest.mock('../postsAnalyzeApi');
import rp from 'request-promise';
import posts from './';
import postsAnalyzeApi from '../postsAnalyzeApi';

const postsReponse = {
  total: 12,
  updates_with_stats: {
    '108311429241313_1685419118197195': {
      _id: '59b81c26883fce89588b4567',
      clicks_caveat: false,
      created_at: 1505238054,
      day: 'Tuesday 12th September',
      due_at: 1505217660,
      due_time: '5:01 am',
      id: '59b81c26883fce89588b4567',
      is_video_processing: false,
      media: {
        video: {
          details: {
            transcoded_location: 'https://video.xx.fbcdn.net/v/t42.1790-2/21626650_117103448973483_1496062419162628096_n.mp4?efg=eyJybHIiOjMwMCwicmxhIjo5MTgsInZlbmNvZGVfdGFnIjoic3ZlX3NkIn0%3D&rl=300&vabr=143&oh=61aa9d0bb4bf5436d7f4399f406aa9c3&oe=59BAE50C',
            location: 'https://video.xx.fbcdn.net/v/t42.1790-2/21626650_117103448973483_1496062419162628096_n.mp4?efg=eyJybHIiOjMwMCwicmxhIjo5MTgsInZlbmNvZGVfdGFnIjoic3ZlX3NkIn0%3D&rl=300&vabr=143&oh=61aa9d0bb4bf5436d7f4399f406aa9c3&oe=59BAE50C',
            width: 720,
            height: 405,
          },
          thumbnails: [
            'https://scontent.xx.fbcdn.net/v/t15.0-10/s720x720/21683895_1685422951530145_6935886671346925568_n.jpg?oh=97686e2171ace823c83f83ca1024ecc2&oe=5A50084F',
          ],
        },
        thumbnail: 'https://scontent.xx.fbcdn.net/v/t15.0-10/s720x720/21683895_1685422951530145_6935886671346925568_n.jpg?oh=97686e2171ace823c83f83ca1024ecc2&oe=5A50084F',
      },
      needs_approval: false,
      profile_id: '4e88a092512f7e1556000000',
      profile_service: 'facebook',
      sent_at: 1505217660,
      service_link: 'https://facebook.com/108311429241313/posts/1685419118197195',
      service_update_id: '108311429241313_1685419118197195',
      statistics: {
        comments: 27,
        likes: 54,
        reach: 0,
        shares: 15,
        clicks: 0,
      },
      stats: {
        shares: 13,
        post_impressions: 18406,
        reactions: 57,
        comments: 23,
        post_clicks: 699,
        post_reach: 8995,
      },
      status: 'service',
      text: 'Today is a good day',
      text_formatted: 'Today is a good day',
      type: 'video',
      updated_at: 1505283283,
      user_id: '56c20bd3bd3816f63c94c73f',
      via: 'facebook',
    },
  },
  success: true,
};

describe('rpc/posts', () => {
  const profileId = '123159ad';
  const token = 'some token';

  it('should have the expected name', () => {
    expect(posts.name)
      .toBe('posts');
  });

  it('should have the expected docs', () => {
    expect(posts.docs)
      .toBe('fetch analytics posts for profiles and pages');
  });

  it('should defer fetching to postsAnalyzeApi for Instagram and Facebook', async () => {
    postsAnalyzeApi.fn = jest.fn();
    const expectedResults = [{ foo: 'foo' }];
    postsAnalyzeApi.fn.mockReturnValue(Promise.resolve(expectedResults));

    const startDate = moment().startOf('day').subtract(7, 'days').format('MM/DD/YYYY');
    const endDate = moment().startOf('day').subtract(1, 'days').format('MM/DD/YYYY');
    const request = {
      session: {
        accessToken: token,
      },
      app: {
        get() { return 'analyze-api'; },
      },
    };

    const results = await posts.fn({
      startDate,
      endDate,
      profileId,
      profileService: 'instagram',
      sortBy: 'sent_at',
      descending: true,
      limit: 5,
      searchTerms: ['foo'],
    }, request);

    expect(postsAnalyzeApi.fn.mock.calls[0])
      .toEqual([{
        profileId,
        profileService: 'instagram',
        startDate,
        endDate,
        sortBy: 'sent_at',
        descending: true,
        limit: 5,
        searchTerms: ['foo'],
      }, request]);

    expect(results).toEqual(expectedResults);
  });

  it('should request for the past week', () => {
    rp.mockReturnValueOnce(Promise.resolve(postsReponse));
    const end = moment().subtract(1, 'days').format('MM/DD/YYYY');
    const start = moment().subtract(7, 'days').format('MM/DD/YYYY');

    posts.fn({
      startDate: start,
      endDate: end,
      profileId,
      profileService: 'twitter',
    }, {
      app: {
        get() {},
      },
      session: {
        publish: {
          accessToken: token,
        },
      },
    });

    expect(rp.mock.calls[0])
      .toEqual([{
        uri: `${process.env.API_ADDR}/1/profiles/${profileId}/analytics/all_posts.json`,
        method: 'GET',
        strictSSL: false,
        qs: {
          access_token: token,
          start_date: start,
          end_date: end,
        },
        json: true,
      }]);
  });
});
