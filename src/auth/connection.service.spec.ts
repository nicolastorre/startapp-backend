import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionService } from '../auth/connection.service';

describe('ConnectionService', () => {
  let service: ConnectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectionService],
    }).compile();

    service = module.get<ConnectionService>(ConnectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
