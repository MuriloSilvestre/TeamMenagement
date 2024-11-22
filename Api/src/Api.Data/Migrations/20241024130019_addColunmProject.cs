using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class addColunmProject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ActualCost",
                table: "Project",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ActualEndDate",
                table: "Project",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ActualStartDate",
                table: "Project",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Budget",
                table: "Project",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BudgetDocument",
                table: "Project",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Priority",
                table: "Project",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreateAt", "UpdateAt" },
                values: new object[] { new DateTime(2024, 10, 24, 10, 0, 19, 108, DateTimeKind.Local).AddTicks(4478), new DateTime(2024, 10, 24, 10, 0, 19, 108, DateTimeKind.Local).AddTicks(4496) });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreateAt", "Password", "UpdateAt" },
                values: new object[] { new DateTime(2024, 10, 24, 10, 0, 19, 281, DateTimeKind.Local).AddTicks(5078), "$2a$11$mlGbcXrMMxMW6vi/LaAN3.Hq9U7cljYxpx.5POwkwtsVChzyUW37W", new DateTime(2024, 10, 24, 10, 0, 19, 281, DateTimeKind.Local).AddTicks(5123) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActualCost",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "ActualEndDate",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "ActualStartDate",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "Budget",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "BudgetDocument",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Project");

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
        }
    }
}
