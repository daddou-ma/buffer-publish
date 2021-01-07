/* eslint-disable import/first */

jest.mock('../../../utils/API');
import API from '../../../utils/API';
import ServiceLocation from '../entities/ServiceLocation';
import LocationFinder from '../utils/LocationFinder';

// Example data for creating a service location object
const id = '3123';
const name = 'Los Angeles';
const pictureUrl = 'https://example.com/image.jpeg';
const checkins = 1312322333;
const address = 'LA, USA';

describe('When LocationFinder requests locations and response is ok', () => {
  beforeEach(() => {
    const mockPost = jest.fn();
    mockPost.mockImplementation((url, params) => {
      if (url !== 'profiles/get_locations.json') {
        throw Error('Endpoint is not correct');
      }

      if (!params.profile_id || !params.place) {
        throw Error('Params are not correct');
      }

      return Promise.resolve({
        locations: {
          data: [
            {
              id,
              name,
              picture: pictureUrl,
              checkins,
              single_line_address: address,
            },
          ],
        },
      });
    });

    API.post = mockPost;
  });

  afterEach(() => jest.resetAllMocks());

  it('creates service location objects ', () => {
    const serviceLocation = new ServiceLocation(
      id,
      name,
      pictureUrl,
      checkins,
      address
    );

    LocationFinder.findLocations('3123', 'New York').then(locations => {
      expect(locations).toEqual([serviceLocation]);
    });
  });
});

describe('When LocationFinder requests locations and response has an error', () => {
  beforeEach(() => {
    const mockPost = jest.fn();
    mockPost.mockImplementation(() => Promise.reject(new Error('fail')));
    API.post = mockPost;
  });

  afterEach(() => jest.resetAllMocks());

  it('should reject if no startdate is given', async () => {
    LocationFinder.findLocations('3123', 'New York').catch(e => {
      expect(e).toBeTruthy();
    });
  });
});
