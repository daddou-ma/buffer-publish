class ServiceLocation {
  constructor(id, name, location) {
    this.id = id;
    this.name = name;

    this.location = location;
  }

  get formattedAddress() {
    if (this.location) {
      const { city, country, state, street } = this.location;
      return `${street} ${city}, ${state} ${country}`;
    }

    return '';
  }
}

export default ServiceLocation;
