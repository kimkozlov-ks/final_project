using Microsoft.EntityFrameworkCore.Migrations;

namespace Garage.API.Migrations
{
    public partial class RenameVehiclesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_VehicleEntities",
                table: "VehicleEntities");

            migrationBuilder.RenameTable(
                name: "VehicleEntities",
                newName: "Vehicles");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vehicles",
                table: "Vehicles",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Vehicles",
                table: "Vehicles");

            migrationBuilder.RenameTable(
                name: "Vehicles",
                newName: "VehicleEntities");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VehicleEntities",
                table: "VehicleEntities",
                column: "Id");
        }
    }
}
