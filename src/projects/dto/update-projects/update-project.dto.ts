import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from '../create-projects/create-project.request.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
