import ServiceLocation from '../entities/ServiceLocation';

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

describe('constructor', () => {
  it('creates a new object with right attributes', () => {
    const sl = new ServiceLocation(id, name, location);

    expect(sl.id).toBe(id);
    expect(sl.name).toBe(name);
    expect(sl.location).toBe(location);
  });
});
