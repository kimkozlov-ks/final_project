using Microsoft.EntityFrameworkCore.Migrations;

namespace Garage.Types.API.Migrations
{
    public partial class ForeignKeyForSubTypeV2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransportSubTypes_TransportTypes_TransportTypeId",
                table: "TransportSubTypes");

            migrationBuilder.DropIndex(
                name: "IX_TransportSubTypes_TransportTypeId",
                table: "TransportSubTypes");

            migrationBuilder.DropColumn(
                name: "TransportTypeId",
                table: "TransportSubTypes");

            migrationBuilder.CreateIndex(
                name: "IX_TransportSubTypes_TransportId",
                table: "TransportSubTypes",
                column: "TransportId");

            migrationBuilder.AddForeignKey(
                name: "FK_TransportSubTypes_TransportTypes_TransportId",
                table: "TransportSubTypes",
                column: "TransportId",
                principalTable: "TransportTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransportSubTypes_TransportTypes_TransportId",
                table: "TransportSubTypes");

            migrationBuilder.DropIndex(
                name: "IX_TransportSubTypes_TransportId",
                table: "TransportSubTypes");

            migrationBuilder.AddColumn<int>(
                name: "TransportTypeId",
                table: "TransportSubTypes",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TransportSubTypes_TransportTypeId",
                table: "TransportSubTypes",
                column: "TransportTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_TransportSubTypes_TransportTypes_TransportTypeId",
                table: "TransportSubTypes",
                column: "TransportTypeId",
                principalTable: "TransportTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
