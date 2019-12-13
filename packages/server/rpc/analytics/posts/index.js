const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

const RPC_NAME = 'posts';

function mapSortBy(sortBy) {
  switch (sortBy) {
    case 'sent_at':
      return 'date';

    case 'engagement_rate':
      return 'EngagementRate';

    default:
      return sortBy;
  }
}

function normalizeDate(posts) {
  return posts ? posts.map(post => ({ ...post, date: post.date * 1000 })) : [];
}

module.exports = method(
  RPC_NAME,
  'fetch analytics posts for profiles and pages',
  async (
    { profileId, startDate, endDate, sortBy, descending, limit, searchTerms },
    req
  ) =>
    rp({
      uri: `${req.app.get('analyzeApiAddr')}/posts`,
      method: 'POST',
      strictSSL: !(
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
      ),
      body: {
        profile_id: profileId,
        start_date: startDate,
        end_date: endDate,
        sort_by: mapSortBy(sortBy),
        descending,
        limit,
        search_terms: searchTerms,
      },
      json: true,
    }).then(({ response }) => normalizeDate(response))
);
