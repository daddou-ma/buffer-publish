class ServiceLocation {
  constructor(id, name, location) {
    this.id = id;
    this.name = name;
    this.location = location;
  }

  get formattedAddress() {
    if (this.location) {
      const { city, country, state, street } = this.location;
      const formattedCity = city ? `${city},` : null;
      const address = [street, formattedCity, state, country]
        .filter(Boolean)
        .join(' ');

      return address;
    }

    return '';
  }
}

export default ServiceLocation;
