import postParser from '../src/postParser';

describe('post parser', () => {
  describe('retweets', () => {
    const retweet = {
      profile_service: 'twitter',
      retweet: {
        user_id: 19475858,
        tweet_id: '990952846110658560',
        username: 'LouPas',
        url: 'https://twitter.com/LouPas/status/990952846110658560',
        created_at: 1525096544,
        created_at_string: 'Mon Apr 30 13:55:44 +0000 2018',
        profile_name: 'Lou Paskalis',
        text:
          '“The Daily has more listeners that the New York Times has readers. We are the new front page and reporters want to be on our show because of the power of that megaphone. You don’t skim a podcast” Michael Barbaro, TheDaily, #NewFronts https://t.co/zJR5wjR6e5',
        avatars: {
          http:
            'http://pbs.twimg.com/profile_images/867425050043052033/Ci4OgTlV_normal.jpg',
          https:
            'https://pbs.twimg.com/profile_images/867425050043052033/Ci4OgTlV_normal.jpg',
        },
        comment: 'Fascinating #Really',
        comment_formatted:
          'Fascinating <a href="https://twitter.com/#!/search?q=%23Really" title="#Really" class="hashtag" rel="external nofollow" target="_blank">#Really</a>',
      },
      retweeted_tweet_id: '990952846110658560',
      text: 'Fascinating',
      text_formatted:
        '“The Daily has more listeners that the New York Times has readers. We are the new front page and reporters want to be on our show because of the power of that megaphone. You don’t skim a podcast” Michael Barbaro, TheDaily, <a href="https://twitter.com/#!/search?q=%23NewFronts" title="#NewFronts" class="hashtag" rel="external nofollow" target="_blank">#NewFronts</a> <a class="url" href="https://t.co/zJR5wjR6e5" rel="external nofollow" target="_blank">https://t.co/zJR5wjR6e5</a>',
      type: 'retweet',
    };

    it('extracts links from retweet', () => {
      const parsedPost = postParser(retweet);
      expect(parsedPost.links).toHaveLength(2);
    });

    it('stores links from retweet comment in retweetCommentLinks', () => {
      const parsedPost = postParser(retweet);
      expect(parsedPost.retweetCommentLinks).toHaveLength(1);
    });
  });

  it('does not extract retweetCommentLinks if there is no retweetComment', () => {
    const tweet = {
      profile_service: 'twitter',
      text:
        'What Do the New Twitter Rules Mean for Social Media Managers (and Buffer Customers) https://buff.ly/2JNS3tL',
      type: 'text',
    };
    const parsedPost = postParser(tweet);
    expect(parsedPost.retweetCommentLinks).toHaveLength(0);
  });

  it('displays a personalized postAction if it is a custom scheduled post', () => {
    const customScheduledPost = {
      text: 'Sample post',
      due_at: 1141252640,
      scheduled_at: 1141252640,
    };
    const parsedPost = postParser(customScheduledPost);
    expect(parsedPost.postDetails).toBeDefined();
    expect(parsedPost.postDetails.isCustomScheduled).toBe(true);
    expect(parsedPost.postDetails.postAction).toEqual(
      'This post is custom scheduled for March 1st at 10:37 PM (UTC).'
    );
  });

  it('displays a personalized postAction if user has no scheduled posting times', () => {
    const postWithNoSchedule = {
      due_at: 0,
    };
    const parsedPost = postParser(postWithNoSchedule);
    expect(parsedPost.postDetails).toBeDefined();
    expect(parsedPost.postDetails.postAction).toEqual('No Time Set');
  });

  it('identifies type as text when post has no media property', () => {
    const post = {
      text: 'text',
    };
    const parsedPost = postParser(post);
    expect(parsedPost.type).toEqual('text');
  });

  it('identifies type as image when post has media and media.picture properties', () => {
    const imagePost = {
      media: {
        picture: 'pic',
      },
    };
    const parsedPost = postParser(imagePost);
    expect(parsedPost.type).toEqual('image');
    expect(parsedPost.imageUrls).toEqual([]);
  });

  it('identifies type as multipleImage when post has media, media.picture and extra_media properties', () => {
    const multipleImagePost = {
      media: {
        picture: 'pic',
      },
      extra_media: [
        {
          photo: 'photo',
          picture: 'picture',
        },
      ],
    };
    const parsedPost = postParser(multipleImagePost);
    expect(parsedPost.type).toEqual('multipleImage');
    expect(parsedPost.imageUrls).toEqual(['pic', 'photo']);
  });

  it('identifies type as video when post has media and media.video properties', () => {
    const videoPost = {
      media: {
        video: 'video',
      },
    };
    const parsedPost = postParser(videoPost);
    expect(parsedPost.type).toEqual('video');
  });

  it('identifies type as link when post has media and media.link properties', () => {
    const linkPost = {
      media: {
        link: 'https://sample.pt',
      },
    };
    const parsedPost = postParser(linkPost);
    expect(parsedPost.type).toEqual('link');
  });

  it('identifies user when post has user and user_id properties', () => {
    const post = {
      user: {
        name: 'User1',
        email: 'user@buffer.com',
        gravatar: '',
        avatar: '',
      },
      user_id: 1234,
    };
    const user = {
      name: 'User1',
      email: 'user@buffer.com',
      gravatar: '',
      avatar: '',
      id: 1234,
    };
    const parsedPost = postParser(post);
    expect(parsedPost.user).toEqual(user);
  });
});
