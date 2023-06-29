import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectEntity } from '../../entities/project.entity';
import { CreatedProjectReponseDto } from '../../dto/create-projects/create-project.response.dto';
import { CreateProjectHandler } from './create-projects.handler';
import { CreateProjectDto } from '../../dto/create-projects/create-project.request.dto';
import { CreateProjectCommand } from './create-projects.command';

describe('CreateProjectHandler', () => {
  let createProjectHandler: CreateProjectHandler;
  let projectRepository: Repository<ProjectEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProjectHandler,
        {
          provide: getRepositoryToken(ProjectEntity),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    createProjectHandler = module.get<CreateProjectHandler>(CreateProjectHandler);
    projectRepository = module.get<Repository<ProjectEntity>>(getRepositoryToken(ProjectEntity));
  });

  it('should create a project and return CreatedProjectReponseDto', async () => {
    const createProjectDto: CreateProjectDto = {
      title: 'Test Project',
      description: 'This is a test project',
    };

    const createdProjectResponseDto: CreatedProjectReponseDto = {
      message: 'user created successfully',
      responseCode: 201,
      status: 'success',
    };

    jest.spyOn(projectRepository, 'save').mockResolvedValue(undefined);

    const result = await createProjectHandler.execute(new CreateProjectCommand(createProjectDto));

    expect(result).toEqual(createdProjectResponseDto);
    expect(projectRepository.save).toHaveBeenCalled();
  });
});

