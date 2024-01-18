import { Test, TestingModule } from '@nestjs/testing';
import { ProduceLogsService } from './producer-logs.service';

describe('ConsumeLogsService', () => {
  let service: ProduceLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProduceLogsService,
        {
          provide: 'RABBITMQ_SERVICE',
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProduceLogsService>(ProduceLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
