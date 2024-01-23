import { Test, TestingModule } from '@nestjs/testing';
import { EmitEventService } from './emit-event.service';

describe('EmitEventService', () => {
  let service: EmitEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmitEventService],
    }).compile();

    service = module.get<EmitEventService>(EmitEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
