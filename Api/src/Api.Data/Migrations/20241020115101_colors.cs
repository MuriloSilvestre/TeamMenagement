using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class colors : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "User",
                type: "nvarchar(7)",
                maxLength: 7,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Team",
                type: "nvarchar(7)",
                maxLength: 7,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Task",
                type: "nvarchar(7)",
                maxLength: 7,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Status",
                type: "nvarchar(7)",
                maxLength: 7,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Project",
                type: "nvarchar(7)",
                maxLength: 7,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Chat",
                type: "nvarchar(7)",
                maxLength: 7,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreateAt", "Name", "UpdateAt" },
                values: new object[] { new DateTime(2024, 10, 20, 8, 51, 0, 572, DateTimeKind.Local).AddTicks(567), "Administrador", new DateTime(2024, 10, 20, 8, 51, 0, 572, DateTimeKind.Local).AddTicks(583) });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Color", "CreateAt", "Password", "UpdateAt" },
                values: new object[] { "#f15353", new DateTime(2024, 10, 20, 8, 51, 0, 688, DateTimeKind.Local).AddTicks(4575), "$2a$11$r1TAKWUn.otTgV3T.973XuZQlXhllbOMwzATj3OTsKXDqjIztIDUS", new DateTime(2024, 10, 20, 8, 51, 0, 688, DateTimeKind.Local).AddTicks(4592) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "Team");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "Task");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "Status");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "Project");

            migrationBuilder.DropColumn(
                name: "Color",
                table: "Chat");

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreateAt", "Name", "UpdateAt" },
                values: new object[] { new DateTime(2024, 10, 15, 11, 31, 6, 111, DateTimeKind.Local).AddTicks(9656), "Admin", new DateTime(2024, 10, 15, 11, 31, 6, 111, DateTimeKind.Local).AddTicks(9670) });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreateAt", "Password", "UpdateAt" },
                values: new object[] { new DateTime(2024, 10, 15, 11, 31, 6, 303, DateTimeKind.Local).AddTicks(9635), "$2a$11$zrVTNs2D0PhzRQ3FFrsiFOiFCJa13FRrxHIrHxO2y8utvyF4AN0X2", new DateTime(2024, 10, 15, 11, 31, 6, 303, DateTimeKind.Local).AddTicks(9654) });
        }
    }
}
