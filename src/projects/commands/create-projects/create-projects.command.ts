import { CreateProjectDto } from "../../dto/create-projects/create-project.request.dto";

export class CreateProjectCommand {
    constructor(
        public readonly createUsersDto: CreateProjectDto
    ) {}
}