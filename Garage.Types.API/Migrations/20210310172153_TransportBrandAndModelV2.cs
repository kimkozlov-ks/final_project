using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Garage.Types.API.Migrations
{
    public partial class TransportBrandAndModelV2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TransportBrandId",
                table: "TransportSubTypes",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TransportBrands",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransportBrands", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TransportModels",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: true),
                    TransportBrandId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransportModels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TransportModels_TransportBrands_TransportBrandId",
                        column: x => x.TransportBrandId,
                        principalTable: "TransportBrands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TransportSubTypes_TransportBrandId",
                table: "TransportSubTypes",
                column: "TransportBrandId");

            migrationBuilder.CreateIndex(
                name: "IX_TransportModels_TransportBrandId",
                table: "TransportModels",
                column: "TransportBrandId");

            migrationBuilder.AddForeignKey(
                name: "FK_TransportSubTypes_TransportBrands_TransportBrandId",
                table: "TransportSubTypes",
                column: "TransportBrandId",
                principalTable: "TransportBrands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransportSubTypes_TransportBrands_TransportBrandId",
                table: "TransportSubTypes");

            migrationBuilder.DropTable(
                name: "TransportModels");

            migrationBuilder.DropTable(
                name: "TransportBrands");

            migrationBuilder.DropIndex(
                name: "IX_TransportSubTypes_TransportBrandId",
                table: "TransportSubTypes");

            migrationBuilder.DropColumn(
                name: "TransportBrandId",
                table: "TransportSubTypes");
        }
    }
}
