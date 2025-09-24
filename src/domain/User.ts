/**
 * Entidad User - Representa un usuario en el dominio de la aplicación
 * Esta es una entidad pura sin dependencias externas
 */
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoLocation;
}

export interface GeoLocation {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

/**
 * Value Objects para encapsular lógica de dominio
 */
export class UserId {
  constructor(private readonly value: number) {
    if (value <= 0) {
      throw new Error('User ID must be a positive number');
    }
  }

  getValue(): number {
    return this.value;
  }

  equals(other: UserId): boolean {
    return this.value === other.value;
  }
}

export class Email {
  constructor(private readonly value: string) {
    if (!this.isValidEmail(value)) {
      throw new Error('Invalid email format');
    }
  }

  getValue(): string {
    return this.value;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}

/**
 * Factory para crear instancias de User
 */
export class UserFactory {
  static create(userData: {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: Address;
    company: Company;
  }): User {
    return {
      id: new UserId(userData.id).getValue(),
      name: userData.name,
      username: userData.username,
      email: new Email(userData.email).getValue(),
      phone: userData.phone,
      website: userData.website,
      address: userData.address,
      company: userData.company,
    };
  }
}
