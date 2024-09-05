import { Test, TestingModule } from '@nestjs/testing';
import { XsrfService } from './xsrf.service';

describe('XsrfService', () => {
  let service: XsrfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XsrfService],
    }).compile();

    service = module.get<XsrfService>(XsrfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
