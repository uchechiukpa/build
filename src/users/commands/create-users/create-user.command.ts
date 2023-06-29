import { CreateUsersDTO } from "../../dto/create-users/create-users-request.dto";

export class CreateUsersCommand {
    constructor(
        public readonly createUsersDto: CreateUsersDTO
    ) {}
}