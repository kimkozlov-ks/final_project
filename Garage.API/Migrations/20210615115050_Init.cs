using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Garage.API.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Vehicles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(nullable: false),
                    Nickname = table.Column<string>(nullable: true),
                    TransportTypeId = table.Column<int>(nullable: false),
                    TransportSubTypeId = table.Column<int>(nullable: false),
                    TransportBrandId = table.Column<int>(nullable: true),
                    TransportModelId = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Image = table.Column<string>(nullable: true),
                    CreateDate = table.Column<DateTime>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    Rating = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vehicles_TransportBrands_TransportBrandId",
                        column: x => x.TransportBrandId,
                        principalTable: "TransportBrands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Vehicles_TransportModels_TransportModelId",
                        column: x => x.TransportModelId,
                        principalTable: "TransportModels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Vehicles_TransportSubTypes_TransportSubTypeId",
                        column: x => x.TransportSubTypeId,
                        principalTable: "TransportSubTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Vehicles_TransportTypes_TransportTypeId",
                        column: x => x.TransportTypeId,
                        principalTable: "TransportTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Vehicles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BestVehicles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(nullable: false),
                    VehicleEntityId = table.Column<int>(nullable: false),
                    DayOfBest = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BestVehicles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BestVehicles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BestVehicles_Vehicles_VehicleEntityId",
                        column: x => x.VehicleEntityId,
                        principalTable: "Vehicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Votes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    VehicleEntityId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    Power = table.Column<int>(nullable: false),
                    VoteTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Votes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Votes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Votes_Vehicles_VehicleEntityId",
                        column: x => x.VehicleEntityId,
                        principalTable: "Vehicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BestVehicles_UserId",
                table: "BestVehicles",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_BestVehicles_VehicleEntityId",
                table: "BestVehicles",
                column: "VehicleEntityId");
            
            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_TransportBrandId",
                table: "Vehicles",
                column: "TransportBrandId");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_TransportModelId",
                table: "Vehicles",
                column: "TransportModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_TransportSubTypeId",
                table: "Vehicles",
                column: "TransportSubTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_TransportTypeId",
                table: "Vehicles",
                column: "TransportTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_UserId",
                table: "Vehicles",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Votes_UserId",
                table: "Votes",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Votes_VehicleEntityId",
                table: "Votes",
                column: "VehicleEntityId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BestVehicles");
            
            migrationBuilder.DropTable(
                name: "Votes");

            migrationBuilder.DropTable(
                name: "Vehicles");
        }
    }
}
