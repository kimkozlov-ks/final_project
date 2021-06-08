using Microsoft.EntityFrameworkCore.Migrations;

namespace Garage.Types.API.Migrations
{
    public partial class ForeignKeyForSubType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TransportId",
                table: "TransportSubTypes",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TransportId",
                table: "TransportSubTypes");
        }
    }
}
