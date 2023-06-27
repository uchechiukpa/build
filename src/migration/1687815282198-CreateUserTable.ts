import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserTable1687815282198 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                    },
                    {
                        name: "username",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name:"displayPicture",
                        type: "varchar"
                    },
                    {
                        name: "bio",
                        type: "text",
                    },
                    {
                        name: "role",
                        type: "enum",
                        enumName: "role",
                        enum: ["admin", "user"]
                    },
                    {
                        name: "dateCreated",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "dateUpdated",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "isActive",
                        type: "tinyint",
                        default: true
                    },
                    {
                        name: "lastLogin",
                        type: "timestamp",
                        default: "now()"
                    }

                ],
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
