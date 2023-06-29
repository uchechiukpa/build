import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-projects/create-project.request.dto';
import { UpdateProjectDto } from './dto/update-projects/update-project.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProjectCommand } from './commands/create-projects/create-projects.command';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly commandBus: CommandBus
    ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.commandBus.execute(new CreateProjectCommand(createProjectDto));
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
