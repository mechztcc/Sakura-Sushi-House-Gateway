import { Test, TestingModule } from '@nestjs/testing';
import { ProducerOrdersService } from './producer-orders.service';

describe('ProducerOrdersService', () => {
  let service: ProducerOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProducerOrdersService],
    }).compile();

    service = module.get<ProducerOrdersService>(ProducerOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
