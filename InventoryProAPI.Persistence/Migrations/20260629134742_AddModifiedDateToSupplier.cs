using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InventoryProAPI.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddModifiedDateToSupplier : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedDate",
                table: "Suppliers",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ModifiedDate",
                table: "Suppliers");
        }
    }
}
