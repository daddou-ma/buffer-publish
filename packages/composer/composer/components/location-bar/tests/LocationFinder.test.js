/* eslint-disable import/first */

jest.mock('../../../utils/API');
import API from '../../../utils/API';
import ServiceLocation from '../entities/ServiceLocation';
import LocationFinder from '../utils/LocationFinder';

// Example data for creating a service location object
const id = '3123';
const name = 'Los Angeles';
const location = {
  city: 'Menlo Park',
  country: 'United States',
  latitude: 37.483183,
  longitude: -122.149999,
  state: 'CA',
  street: '1 Hacker Way',
  zip: '94025',
};

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
              location,
            },
          ],
        },
      });
    });

    API.post = mockPost;
  });

  afterEach(() => jest.resetAllMocks());

  it('creates service location objects ', () => {
    const serviceLocation = new ServiceLocation(id, name, location);

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
