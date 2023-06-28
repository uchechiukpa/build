import { Test } from '@nestjs/testing';
import { ProjectEntity } from '../../entities/project.entity';
import { CreateProjectCommand } from './create-projects.command';
import { CreateProjectHandler } from './create-projects.handler';

describe('CreateProjectHandler', () => {
  let createProjectHandler: CreateProjectHandler;
  let mockRepository;

  beforeEach(async () => {
    mockRepository = {
      save: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateProjectHandler,
        {
          provide: 'ProjectEntityRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    createProjectHandler = moduleRef.get<CreateProjectHandler>(CreateProjectHandler);
  });

  it('should create a new project and save it in the repository', async () => {
    const dto = {
      title: 'Test Project',
      description: 'This is a test project',
    };
    const command = new CreateProjectCommand(dto);
    
    const expectedProject = new ProjectEntity();
    expectedProject.title = dto.title;
    expectedProject.description = dto.description;

    mockRepository.save.mockReturnValue(expectedProject);

    const result = await createProjectHandler.execute(command);

    expect(mockRepository.save).toHaveBeenCalledWith(expectedProject);
    expect(result).toEqual(expectedProject);
  });
});
