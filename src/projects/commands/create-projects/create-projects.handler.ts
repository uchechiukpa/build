import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatedProjectReponseDto } from '../../dto/create-projects/create-project.response.dto';
import { ProjectEntity } from '../../entities/project.entity';
import { CreateProjectCommand } from './create-projects.command';


@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler implements ICommandHandler<CreateProjectCommand> {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  async execute(command: CreateProjectCommand): Promise<CreatedProjectReponseDto> {
    const { title, description } = command.createUsersDto;

    const project = new ProjectEntity();
    project.title = title;
    project.description = description;

    this.projectRepository.save(project);

    return new CreatedProjectReponseDto({
      status: 'success',
      message: "user created successfully",
      responseCode: 201
  });
  }
}