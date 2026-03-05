import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';

describe('Auth', () => {
  let service: AuthService;
  let controller: AuthController;
  let userRepository: jest.Mocked<Repository<User>>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const mockUserRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findOneOrFail: jest.fn(),
    };

    const mockJwtService = {
      sign: jest.fn(),
      verify: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
    userRepository = module.get(getRepositoryToken(User));
    jwtService = module.get(JwtService);
  });

  describe('register', () => {
    it('should register a new user and return id and email', async () => {
      const dto = { email: 'test@example.com', password: 'password123' };
      const savedUser: Partial<User> = { id: 'uuid-1', email: dto.email, passwordHash: 'hashed' };

      userRepository.findOne.mockResolvedValue(null);
      userRepository.create.mockReturnValue(savedUser as User);
      userRepository.save.mockResolvedValue(savedUser as User);

      const result = await controller.register(dto);

      expect(result).toEqual({ id: 'uuid-1', email: dto.email });
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: dto.email } });
      expect(userRepository.create).toHaveBeenCalled();
      expect(userRepository.save).toHaveBeenCalled();
    });

    it('should throw ConflictException if email already exists', async () => {
      const dto = { email: 'existing@example.com', password: 'password123' };
      const existingUser: Partial<User> = { id: 'uuid-1', email: dto.email };

      userRepository.findOne.mockResolvedValue(existingUser as User);

      await expect(controller.register(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should return an accessToken for valid credentials', async () => {
      const dto = { email: 'test@example.com', password: 'password123' };
      const passwordHash = await bcrypt.hash(dto.password, 10);
      const user: Partial<User> = { id: 'uuid-1', email: dto.email, passwordHash };

      userRepository.findOne.mockResolvedValue(user as User);
      jwtService.sign.mockReturnValue('signed-jwt-token');

      const result = await controller.login(dto);

      expect(result).toEqual({ accessToken: 'signed-jwt-token' });
      expect(jwtService.sign).toHaveBeenCalledWith({ sub: 'uuid-1', email: dto.email });
    });

    it('should throw UnauthorizedException if user not found', async () => {
      const dto = { email: 'nonexistent@example.com', password: 'password123' };

      userRepository.findOne.mockResolvedValue(null);

      await expect(controller.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password does not match', async () => {
      const dto = { email: 'test@example.com', password: 'wrongpassword' };
      const passwordHash = await bcrypt.hash('correctpassword', 10);
      const user: Partial<User> = { id: 'uuid-1', email: dto.email, passwordHash };

      userRepository.findOne.mockResolvedValue(user as User);

      await expect(controller.login(dto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
