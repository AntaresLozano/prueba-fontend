import { UserId, Email, UserFactory, User, Address, Company } from '../../domain/User';

describe('UserId', () => {
  it('debería crear un UserId válido con un número positivo', () => {
    const userId = new UserId(1);
    expect(userId.getValue()).toBe(1);
  });

  it('debería lanzar error con un número negativo', () => {
    expect(() => new UserId(-1)).toThrow('User ID must be a positive number');
  });

  it('debería lanzar error con cero', () => {
    expect(() => new UserId(0)).toThrow('User ID must be a positive number');
  });

  it('debería comparar correctamente dos UserIds iguales', () => {
    const userId1 = new UserId(1);
    const userId2 = new UserId(1);
    expect(userId1.equals(userId2)).toBe(true);
  });

  it('debería comparar correctamente dos UserIds diferentes', () => {
    const userId1 = new UserId(1);
    const userId2 = new UserId(2);
    expect(userId1.equals(userId2)).toBe(false);
  });
});

describe('Email', () => {
  it('debería crear un Email válido con formato correcto', () => {
    const email = new Email('test@example.com');
    expect(email.getValue()).toBe('test@example.com');
  });

  it('debería lanzar error con formato de email inválido', () => {
    expect(() => new Email('invalid-email')).toThrow('Invalid email format');
  });

  it('debería lanzar error con email sin @', () => {
    expect(() => new Email('testexample.com')).toThrow('Invalid email format');
  });

  it('debería lanzar error con email sin dominio', () => {
    expect(() => new Email('test@')).toThrow('Invalid email format');
  });

  it('debería lanzar error con email vacío', () => {
    expect(() => new Email('')).toThrow('Invalid email format');
  });

  it('debería comparar correctamente dos Emails iguales', () => {
    const email1 = new Email('test@example.com');
    const email2 = new Email('test@example.com');
    expect(email1.equals(email2)).toBe(true);
  });

  it('debería comparar correctamente dos Emails diferentes', () => {
    const email1 = new Email('test@example.com');
    const email2 = new Email('other@example.com');
    expect(email1.equals(email2)).toBe(false);
  });
});

describe('UserFactory', () => {
  const mockAddress: Address = {
    street: 'Calle Principal 123',
    suite: 'Apt 4B',
    city: 'Madrid',
    zipcode: '28001',
    geo: {
      lat: '40.4168',
      lng: '-3.7038'
    }
  };

  const mockCompany: Company = {
    name: 'Tech Solutions',
    catchPhrase: 'Innovación en tecnología',
    bs: 'harness real-time e-markets'
  };

  const validUserData = {
    id: 1,
    name: 'Juan Pérez',
    username: 'juanperez',
    email: 'juan@example.com',
    phone: '123-456-7890',
    website: 'juanperez.com',
    address: mockAddress,
    company: mockCompany
  };

  it('debería crear un User válido con datos correctos', () => {
    const user = UserFactory.create(validUserData);
    
    expect(user.id).toBe(1);
    expect(user.name).toBe('Juan Pérez');
    expect(user.username).toBe('juanperez');
    expect(user.email).toBe('juan@example.com');
    expect(user.phone).toBe('123-456-7890');
    expect(user.website).toBe('juanperez.com');
    expect(user.address).toEqual(mockAddress);
    expect(user.company).toEqual(mockCompany);
  });

  it('debería lanzar error con ID inválido', () => {
    const invalidData = { ...validUserData, id: -1 };
    expect(() => UserFactory.create(invalidData)).toThrow('User ID must be a positive number');
  });

  it('debería lanzar error con email inválido', () => {
    const invalidData = { ...validUserData, email: 'invalid-email' };
    expect(() => UserFactory.create(invalidData)).toThrow('Invalid email format');
  });

  it('debería crear múltiples usuarios con diferentes datos', () => {
    const user1 = UserFactory.create(validUserData);
    const user2 = UserFactory.create({
      ...validUserData,
      id: 2,
      name: 'María García',
      email: 'maria@example.com'
    });

    expect(user1.id).toBe(1);
    expect(user2.id).toBe(2);
    expect(user1.name).toBe('Juan Pérez');
    expect(user2.name).toBe('María García');
    expect(user1.email).toBe('juan@example.com');
    expect(user2.email).toBe('maria@example.com');
  });
});
