using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class ajusteRelacoes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_User_RoleId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_Task_StatusId",
                table: "Task");

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreateAt", "UpdateAt" },
                values: new object[] { new DateTime(2024, 10, 20, 13, 46, 52, 479, DateTimeKind.Local).AddTicks(4741), new DateTime(2024, 10, 20, 13, 46, 52, 479, DateTimeKind.Local).AddTicks(4754) });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreateAt", "Password", "UpdateAt" },
                values: new object[] { new DateTime(2024, 10, 20, 13, 46, 52, 704, DateTimeKind.Local).AddTicks(7049), "$2a$11$.u2sV7iAR2Nn5P8JAY8AAeiQ8lIGps8zxdw9LmEII0T5039tFJs6e", new DateTime(2024, 10, 20, 13, 46, 52, 704, DateTimeKind.Local).AddTicks(7078) });

            migrationBuilder.CreateIndex(
                name: "IX_User_RoleId",
                table: "User",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Task_StatusId",
                table: "Task",
                column: "StatusId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_User_RoleId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_Task_StatusId",
                table: "Task");

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreateAt", "UpdateAt" },
                values: new object[] { new DateTime(2024, 10, 20, 8, 51, 0, 572, DateTimeKind.Local).AddTicks(567), new DateTime(2024, 10, 20, 8, 51, 0, 572, DateTimeKind.Local).AddTicks(583) });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreateAt", "Password", "UpdateAt" },
                values: new object[] { new DateTime(2024, 10, 20, 8, 51, 0, 688, DateTimeKind.Local).AddTicks(4575), "$2a$11$r1TAKWUn.otTgV3T.973XuZQlXhllbOMwzATj3OTsKXDqjIztIDUS", new DateTime(2024, 10, 20, 8, 51, 0, 688, DateTimeKind.Local).AddTicks(4592) });

            migrationBuilder.CreateIndex(
                name: "IX_User_RoleId",
                table: "User",
                column: "RoleId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Task_StatusId",
                table: "Task",
                column: "StatusId",
                unique: true);
        }
    }
}
