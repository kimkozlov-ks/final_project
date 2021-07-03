/*
 Navicat Premium Data Transfer

 Source Server         : MapApp
 Source Server Type    : PostgreSQL
 Source Server Version : 120004
 Source Host           : localhost:5432
 Source Catalog        : MapAppDb
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 120004
 File Encoding         : 65001

 Date: 03/07/2021 16:28:13
*/


-- ----------------------------
-- Sequence structure for BestVehicles_Id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."BestVehicles_Id_seq";
CREATE SEQUENCE "public"."BestVehicles_Id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."BestVehicles_Id_seq" OWNER TO "kimkozlov";

-- ----------------------------
-- Sequence structure for RefreshTokens_Id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."RefreshTokens_Id_seq";
CREATE SEQUENCE "public"."RefreshTokens_Id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."RefreshTokens_Id_seq" OWNER TO "kimkozlov";

-- ----------------------------
-- Sequence structure for RolePermissions_Id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."RolePermissions_Id_seq";
CREATE SEQUENCE "public"."RolePermissions_Id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."RolePermissions_Id_seq" OWNER TO "kimkozlov";

-- ----------------------------
-- Sequence structure for Roles_Id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Roles_Id_seq";
CREATE SEQUENCE "public"."Roles_Id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."Roles_Id_seq" OWNER TO "kimkozlov";

-- ----------------------------
-- Sequence structure for TransportBrands_Id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."TransportBrands_Id_seq";
CREATE SEQUENCE "public"."TransportBrands_Id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."TransportBrands_Id_seq" OWNER TO "kimkozlov";

-- ----------------------------
-- Sequence structure for TransportModels_Id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."TransportModels_Id_seq";
CREATE SEQUENCE "public"."TransportModels_Id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."TransportModels_Id_seq" OWNER TO "kimkozlov";

-- ----------------------------
-- Sequence structure for TransportSubTypes_Id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."TransportSubTypes_Id_seq";
CREATE SEQUENCE "public"."TransportSubTypes_Id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."TransportSubTypes_Id_seq" OWNER TO "kimkozlov";

-- ----------------------------
-- Sequence structure for TransportTypes_Id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."TransportTypes_Id_seq";
CREATE SEQUENCE "public"."TransportTypes_Id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."TransportTypes_Id_seq" OWNER TO "kimkozlov";

-- ----------------------------
-- Sequence structure for Users_Id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Users_Id_seq";
CREATE SEQUENCE "public"."Users_Id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."Users_Id_seq" OWNER TO "kimkozlov";

-- ----------------------------
-- Sequence structure for Vehicles_Id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Vehicles_Id_seq";
CREATE SEQUENCE "public"."Vehicles_Id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."Vehicles_Id_seq" OWNER TO "kimkozlov";

-- ----------------------------
-- Sequence structure for Votes_Id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Votes_Id_seq";
CREATE SEQUENCE "public"."Votes_Id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."Votes_Id_seq" OWNER TO "kimkozlov";

-- ----------------------------
-- Table structure for BestVehicles
-- ----------------------------
DROP TABLE IF EXISTS "public"."BestVehicles";
CREATE TABLE "public"."BestVehicles" (
  "Id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
),
  "UserId" int4 NOT NULL,
  "VehicleEntityId" int4 NOT NULL,
  "DayOfBest" timestamp(6) NOT NULL
)
;
ALTER TABLE "public"."BestVehicles" OWNER TO "kimkozlov";

-- ----------------------------
-- Records of BestVehicles
-- ----------------------------
BEGIN;
INSERT INTO "public"."BestVehicles" VALUES (539, 5, 7, '2021-07-02 00:00:00');
INSERT INTO "public"."BestVehicles" VALUES (540, 5, 43, '2021-07-02 00:00:00');
COMMIT;

-- ----------------------------
-- Table structure for RefreshTokens
-- ----------------------------
DROP TABLE IF EXISTS "public"."RefreshTokens";
CREATE TABLE "public"."RefreshTokens" (
  "Id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
),
  "UserId" int4 NOT NULL,
  "Refresh" uuid NOT NULL
)
;
ALTER TABLE "public"."RefreshTokens" OWNER TO "kimkozlov";

-- ----------------------------
-- Records of RefreshTokens
-- ----------------------------
BEGIN;
INSERT INTO "public"."RefreshTokens" VALUES (17, 6, 'ab642bc3-8b8b-4ef2-9c42-ec28d436b102');
INSERT INTO "public"."RefreshTokens" VALUES (24, 23, 'b38ca751-63cc-4263-9f76-fff15d9a1349');
INSERT INTO "public"."RefreshTokens" VALUES (5, 5, '364f83a1-af4e-4b8f-99a9-e4e72091cee8');
INSERT INTO "public"."RefreshTokens" VALUES (4, 4, '6f56cdb9-3d4e-49ae-bb4b-66a3ed554032');
COMMIT;

-- ----------------------------
-- Table structure for RolePermissions
-- ----------------------------
DROP TABLE IF EXISTS "public"."RolePermissions";
CREATE TABLE "public"."RolePermissions" (
  "Id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
),
  "RoleId" int4 NOT NULL,
  "PermissionType" int4 NOT NULL
)
;
ALTER TABLE "public"."RolePermissions" OWNER TO "kimkozlov";

-- ----------------------------
-- Records of RolePermissions
-- ----------------------------
BEGIN;
INSERT INTO "public"."RolePermissions" VALUES (1, 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for Roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."Roles";
CREATE TABLE "public"."Roles" (
  "Id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
),
  "Name" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."Roles" OWNER TO "kimkozlov";

-- ----------------------------
-- Records of Roles
-- ----------------------------
BEGIN;
INSERT INTO "public"."Roles" VALUES (2, 'User');
INSERT INTO "public"."Roles" VALUES (1, 'Admin');
INSERT INTO "public"."Roles" VALUES (3, 'Test');
COMMIT;

-- ----------------------------
-- Table structure for TransportBrands
-- ----------------------------
DROP TABLE IF EXISTS "public"."TransportBrands";
CREATE TABLE "public"."TransportBrands" (
  "Id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
),
  "Name" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."TransportBrands" OWNER TO "kimkozlov";

-- ----------------------------
-- Records of TransportBrands
-- ----------------------------
BEGIN;
INSERT INTO "public"."TransportBrands" VALUES (1, 'Honda');
INSERT INTO "public"."TransportBrands" VALUES (3, 'Yamaha');
INSERT INTO "public"."TransportBrands" VALUES (4, 'Татра');
INSERT INTO "public"."TransportBrands" VALUES (5, 'Daewoo');
INSERT INTO "public"."TransportBrands" VALUES (6, 'ЗАЗ');
INSERT INTO "public"."TransportBrands" VALUES (7, 'Toyota');
INSERT INTO "public"."TransportBrands" VALUES (8, 'KIA');
COMMIT;

-- ----------------------------
-- Table structure for TransportModels
-- ----------------------------
DROP TABLE IF EXISTS "public"."TransportModels";
CREATE TABLE "public"."TransportModels" (
  "Id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
),
  "Name" text COLLATE "pg_catalog"."default",
  "TransportBrandId" int4 NOT NULL
)
;
ALTER TABLE "public"."TransportModels" OWNER TO "kimkozlov";

-- ----------------------------
-- Records of TransportModels
-- ----------------------------
BEGIN;
INSERT INTO "public"."TransportModels" VALUES (1, 'CBR1000RR', 1);
INSERT INTO "public"."TransportModels" VALUES (2, 'CB1000R', 1);
INSERT INTO "public"."TransportModels" VALUES (3, 'CB125', 1);
INSERT INTO "public"."TransportModels" VALUES (4, 'YZF-R1', 3);
INSERT INTO "public"."TransportModels" VALUES (5, '815', 4);
INSERT INTO "public"."TransportModels" VALUES (6, 'Vino', 3);
INSERT INTO "public"."TransportModels" VALUES (7, 'Lanos', 5);
INSERT INTO "public"."TransportModels" VALUES (8, 'Таврия', 6);
INSERT INTO "public"."TransportModels" VALUES (9, 'Land Cruiser Prado 200', 7);
INSERT INTO "public"."TransportModels" VALUES (10, 'Rio', 8);
COMMIT;

-- ----------------------------
-- Table structure for TransportSubTypes
-- ----------------------------
DROP TABLE IF EXISTS "public"."TransportSubTypes";
CREATE TABLE "public"."TransportSubTypes" (
  "Id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
),
  "Name" text COLLATE "pg_catalog"."default",
  "TransportTypeId" int4 NOT NULL
)
;
ALTER TABLE "public"."TransportSubTypes" OWNER TO "kimkozlov";

-- ----------------------------
-- Records of TransportSubTypes
-- ----------------------------
BEGIN;
INSERT INTO "public"."TransportSubTypes" VALUES (4, 'Эндуро', 2);
INSERT INTO "public"."TransportSubTypes" VALUES (5, 'Кроссовый', 2);
INSERT INTO "public"."TransportSubTypes" VALUES (6, 'Спортбайк', 2);
INSERT INTO "public"."TransportSubTypes" VALUES (7, 'Классик', 2);
INSERT INTO "public"."TransportSubTypes" VALUES (8, 'Внедорожник', 4);
INSERT INTO "public"."TransportSubTypes" VALUES (9, 'Паркертник', 4);
INSERT INTO "public"."TransportSubTypes" VALUES (10, 'Седан', 4);
INSERT INTO "public"."TransportSubTypes" VALUES (11, 'Хетчбэк', 4);
INSERT INTO "public"."TransportSubTypes" VALUES (12, 'Скутер', 2);
INSERT INTO "public"."TransportSubTypes" VALUES (13, 'Тент', 3);
INSERT INTO "public"."TransportSubTypes" VALUES (14, 'Самосвал', 3);
COMMIT;

-- ----------------------------
-- Table structure for TransportTypes
-- ----------------------------
DROP TABLE IF EXISTS "public"."TransportTypes";
CREATE TABLE "public"."TransportTypes" (
  "Id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
),
  "Name" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."TransportTypes" OWNER TO "kimkozlov";

-- ----------------------------
-- Records of TransportTypes
-- ----------------------------
BEGIN;
INSERT INTO "public"."TransportTypes" VALUES (2, 'Мотоцикл');
INSERT INTO "public"."TransportTypes" VALUES (3, 'Грузовик');
INSERT INTO "public"."TransportTypes" VALUES (4, 'Автомобиль');
COMMIT;

-- ----------------------------
-- Table structure for Users
-- ----------------------------
DROP TABLE IF EXISTS "public"."Users";
CREATE TABLE "public"."Users" (
  "Id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
),
  "RoleId" int4 NOT NULL,
  "Username" text COLLATE "pg_catalog"."default",
  "Password" text COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."Users" OWNER TO "kimkozlov";

-- ----------------------------
-- Records of Users
-- ----------------------------
BEGIN;
INSERT INTO "public"."Users" VALUES (4, 1, 'Admin123', 'Admin123');
INSERT INTO "public"."Users" VALUES (5, 2, 'User1234', 'User1234');
INSERT INTO "public"."Users" VALUES (6, 3, 'Test1234', 'Test1234');
INSERT INTO "public"."Users" VALUES (23, 2, 'TestUser', 'TestUser');
COMMIT;

-- ----------------------------
-- Table structure for Vehicles
-- ----------------------------
DROP TABLE IF EXISTS "public"."Vehicles";
CREATE TABLE "public"."Vehicles" (
  "Id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
),
  "UserId" int4 NOT NULL,
  "Nickname" text COLLATE "pg_catalog"."default",
  "TransportTypeId" int4 NOT NULL,
  "TransportSubTypeId" int4 NOT NULL,
  "TransportBrandId" int4,
  "TransportModelId" int4 NOT NULL,
  "Description" text COLLATE "pg_catalog"."default",
  "Image" text COLLATE "pg_catalog"."default",
  "CreateDate" timestamp(6) NOT NULL,
  "IsActive" bool NOT NULL,
  "Rating" int4 NOT NULL
)
;
ALTER TABLE "public"."Vehicles" OWNER TO "kimkozlov";

-- ----------------------------
-- Records of Vehicles
-- ----------------------------
BEGIN;
INSERT INTO "public"."Vehicles" VALUES (8, 5, 'Комфортный', 2, 12, 3, 6, 'Классический скутер от самого именитого японского производителя. Обилие хрома и неповторимые обводы корпуса действительно завораживают. На этом достоинства красавчика Vino не заканчиваются – это и надежность неубиваемого 2-х тактника, надежная и неприхотливая подвеска, ровно, как и серьезные возможности по тюнигу. Можно с уверенностью сказать, что эта модель не оставит равнодушными тех, кто хочет выделиться из толпы, остаться независимым и завоевать внимание окружающих своей непосредственностью. Ко всему вышесказанному стоит добавить проверенную базу от всем известной модели Jog и невероятно красивое сочетание темно-вишневого и молочно белового цветов – настоящая ретроклассика подкрепленная легендарной надежностью Yamaha. Добавим, что спектр услуг, предоставляемый нашей мастерской, позволит Вам создать свой, не похожий на остальные, ретро скутер, причем, не выходя за рамки намеченного бюджета.', 'https://localhost:5009/images/08933472-d748-4a48-8437-fa012057fc69.jpeg', '2021-06-14 12:20:06.110355', 't', 2);
INSERT INTO "public"."Vehicles" VALUES (9, 4, 'Рабочая лошадь', 4, 10, 8, 8, 'KIA Rio Sedan (КИА Рио Седан) – переднеприводный седан класса «В». Фейслифтинг четвертого поколения модели, предназначенного для российского рынка. Премьерный показ автомобиля состоялся 14 сентября 2020 года в Киеве.

Модернизацию самого покупаемого на российском рынке автомобиля, который принадлежит иностранному бренду, смело можно назвать очень лаконичной. Передняя оптика обзавелась более вычурной формой, теперь фары вплотную прилегают к чуть увеличившейся решетке с иным рисунком. Задняя оптика получила «зубцы» в горизонтальных диодных планках. Изменилась форма бамперов (из-за чего общая длина седана увеличилась на 20 мм, до 4420 мм), задний теперь украшен имитацией патрубков выхлопной системы в форме трапеций, а также подобием диффузора.

Что касается головной оптики, она доступна в трех вариантах: наиболее простым является фара рефлекторного типа без ДХО, средним – линзованная оптика с галогеновыми лампами и диодными ДХО, наиболее дорогое исполнение – это полностью диодные фары со статической подвеской поворотов. В зависимости от комплектации предложены 15-дюймовые штампованные диски, а также 15- и 16-дюймовые легкосплавные.

В салоне главным изменением является наличие в дорогих комплектациях 8-дюймового сенсорного дисплея мультимедийной системы, которая поддерживает беспроводные Apple CarPlay и Android Auto, а также 4.2-дюймового цветного экрана на панели приборов. Регулировка поясничного упора водительского кресла доступна лишь в самой дорогой модификации. Из «невидимых» изменений – доработанная шумоизоляция (пластиковые подкрылки заменены на тканевые, появилось больше шумопоглощающего материала в багажнике).

Двигатели остались прежними. Это 1.4-литровый Kappa на 100 л. с. и 132 Нм крутящего момента да 1.6-литровый Gamma на 123 силы и 156 Нм момента. Оба двигателя работают на бензине А92. Укомплектовать их можно как шестиступенчатой «механикой», так и гидротрансформатором на те же шесть ступеней. После фейслифтинга под капотом появился аккумулятор емкостью 60 А*ч и более вместительный бачок омывателя (5.3 л вместо 4.6). Также теперь доступна функция запуска мотора с ключа. Дорожный просвет, как и раньше, составляет 160 мм.

Базова комплектация Сlassic укомплектована ABS и системой курсовой устойчивости ESC. Есть помощник при старте под гору и система предупреждения при аварийном торможении. Автомобиль укомплектован внешними зеркалами в цвете кузова, оснащенными электроприводом и подогревом, кондиционером, регулировкой руля и кресла водителя по высоте, передними электрическими стеклоподъемниками.', 'https://localhost:5009/images/5152c287-9506-4249-8755-2a09f490c36a.jpeg', '2021-06-14 12:21:13.832998', 't', 1);
INSERT INTO "public"."Vehicles" VALUES (7, 5, 'Мощный', 4, 10, 6, 6, 'ЗАЗ-1102 «Таврия» — советский и украинский автомобиль II группы особо малого класса с кузовом типа хэтчбек, первый переднеприводный легковой автомобиль Запорожского автомобильного завода. Является "преемником" модели ЗАЗ-968. Серийно выпускался на Запорожском автомобильном заводе с 1987 по 2007 год, а модели на её платформе производились до начала 2011 года.', 'https://localhost:5009/images/2d019a02-3c57-4ca3-9d22-7aec227da0d0.jpeg', '2021-06-14 12:18:52.508027', 't', 3);
INSERT INTO "public"."Vehicles" VALUES (6, 5, 'Грязный', 4, 4, 7, 7, 'Абсолютная власть наделяет исключительными привилегиями, но обладать Toyota Land Cruiser 200 Executive Lounge* сможет лишь избранный. Высочайший статус специальной серии подчеркивают неповторимые акценты в экстерьере. Передние фары в чёрном исполнении, дерзкая решётка радиатора, передний бампер в стильном и динамичном воплощении придают легендарному внедорожнику внушительность настоящего героя.', 'https://localhost:5009/images/65cf2bdf-7a20-4d76-9a0b-f73e7fbc9fa8.jpeg', '2021-06-14 12:16:05.820749', 't', 3);
INSERT INTO "public"."Vehicles" VALUES (10, 4, 'Пуля', 2, 6, 1, 1, 'Модель спортивного мотоцикла Honda CBR1000RR Fireblade появилась на рынке в 2004 году, придя на смену Honda CBR954RR Fireblade. В отличие от прошлой версии, новая модель получила целый ряд технических отличий и черты гоночного прототипа RC211V - новая рама, подвески и двигатель, новая тормозная система с радиальными суппортами, электронный рулевой демпфер (Honda Electronic Steering Damper - HESD), инжектор с двойными дроссельными заслонками (Dual Stage Fuel Injection - DSFI) и др.

В 2006 году модель Honda CBR1000RR Fireblade подвергается рестайлингу, получая чуть обновленный внешний вид, доработанный двигатель (другие каналы ГБЦ, увеличенные впускные клапана, увеличенная степень сжатия, измененные фазы газораспределения), новый выхлоп, новая геометрия шасси, другие настройки задней подвески и увеличенные тормозные диски спереди.', 'https://localhost:5009/images/44d88eb0-f9d4-48bc-8fba-f48ec4beec13.jpeg', '2021-06-14 12:21:52.035049', 't', 1);
INSERT INTO "public"."Vehicles" VALUES (11, 4, 'Мощный Джо', 3, 13, 4, 5, 'Чешская компания «Татра» выпустила первый грузовик под маркировкой Tatra 815 в 1983 году. Несмотря на возраст, данная модель до сих пор производится и постоянно модернизируется. Она обладает множеством различного рода достоинств, имеет большое количество преимуществ перед своими аналогами-соотечественниками и продукцией из других стран.
', 'https://localhost:5009/images/b6c59fe2-30c8-476e-884e-e8c78aed0e8f.jpeg', '2021-06-14 12:23:02.753285', 't', 1);
INSERT INTO "public"."Vehicles" VALUES (43, 5, 'Ракета', 2, 6, 3, 1, 'Это гоночный мотоцикл с заточкой под трек, под скорость и только скорость. Своим острым носом и легкой хвостовой частью «Эрка» напоминает космический объект, правда, опознать байк можно даже издалека и против солнца — Yamaha осталась верна себе. Впрочем, в отличие от предыдущей модели: «жесткой», брутальной — байк 2012 года получился более «зализанным».

Первое, что бросается в глаза – сидение. Оно размещено довольно высоко, у других спортбайков – ниже. Реально это дает дополнительные возможности управления – собственным телом. Его наклон меняет траекторию и помогает точнее пройти поворот. Правда, с непрофессионалом эта особенность байка может сыграть злую шутку… Но «эрка» — машина не для «чайников»…', 'https://localhost:5009/images/3860c99d-1004-4489-868e-7eaec26307f1.jpeg', '2021-07-03 11:39:49.501927', 't', 1);
COMMIT;

-- ----------------------------
-- Table structure for Votes
-- ----------------------------
DROP TABLE IF EXISTS "public"."Votes";
CREATE TABLE "public"."Votes" (
  "Id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
),
  "VehicleEntityId" int4 NOT NULL,
  "UserId" int4 NOT NULL,
  "Power" int4 NOT NULL,
  "VoteTime" timestamp(6) NOT NULL
)
;
ALTER TABLE "public"."Votes" OWNER TO "kimkozlov";

-- ----------------------------
-- Records of Votes
-- ----------------------------
BEGIN;
INSERT INTO "public"."Votes" VALUES (10, 6, 4, 1, '2021-07-01 18:01:51.18782');
INSERT INTO "public"."Votes" VALUES (11, 7, 4, 1, '2021-07-01 18:02:01.778712');
INSERT INTO "public"."Votes" VALUES (12, 8, 4, 1, '2021-07-01 18:02:03.30804');
INSERT INTO "public"."Votes" VALUES (13, 9, 4, 1, '2021-07-01 18:53:37.126616');
INSERT INTO "public"."Votes" VALUES (14, 10, 4, 1, '2021-07-01 18:57:14.846895');
INSERT INTO "public"."Votes" VALUES (15, 11, 4, 1, '2021-07-01 18:57:17.773861');
INSERT INTO "public"."Votes" VALUES (16, 7, 23, 1, '2021-07-03 11:03:31.502839');
INSERT INTO "public"."Votes" VALUES (17, 43, 5, 1, '2021-07-03 11:39:58.678088');
COMMIT;

-- ----------------------------
-- Table structure for __EFMigrationsHistory
-- ----------------------------
DROP TABLE IF EXISTS "public"."__EFMigrationsHistory";
CREATE TABLE "public"."__EFMigrationsHistory" (
  "MigrationId" varchar(150) COLLATE "pg_catalog"."default" NOT NULL,
  "ProductVersion" varchar(32) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "public"."__EFMigrationsHistory" OWNER TO "kimkozlov";

-- ----------------------------
-- Records of __EFMigrationsHistory
-- ----------------------------
BEGIN;
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20201228143747_Init', '3.1.10');
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20210109183223_UserRouteCreate', '3.1.10');
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20210109192938_InitCreate', '3.1.10');
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20210307055737_Init', '3.1.10');
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20210310164154_ForeignKeyForSubType', '3.1.10');
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20210310164516_ForeignKeyForSubTypeV2', '3.1.10');
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20210310170717_TransportBrandAndModel', '3.1.10');
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20210310172153_TransportBrandAndModelV2', '3.1.10');
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20210609180331_Init', '3.1.10');
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20210609181006_Init', '3.1.10');
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20210614123117_init', '3.1.16');
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20210614123537_Init', '3.1.16');
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20210614123628_RenameVehiclesTable', '3.1.16');
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20210614125224_AddVejicleOwnerId', '3.1.16');
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20210615033713_AddVotes', '3.1.16');
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20210615081954_AddBestVehicleTable', '3.1.16');
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20210615100421_AddRelationObjectToBestVehicles', '3.1.16');
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20210615103238_FixForeingKey', '3.1.16');
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20210615105053_Init', '3.1.16');
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20210615114135_Init', '3.1.16');
INSERT INTO "public"."__EFMigrationsHistory" VALUES ('20210615115050_Init', '3.1.16');
COMMIT;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."BestVehicles_Id_seq"
OWNED BY "public"."BestVehicles"."Id";
SELECT setval('"public"."BestVehicles_Id_seq"', 541, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."RefreshTokens_Id_seq"
OWNED BY "public"."RefreshTokens"."Id";
SELECT setval('"public"."RefreshTokens_Id_seq"', 25, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."RolePermissions_Id_seq"
OWNED BY "public"."RolePermissions"."Id";
SELECT setval('"public"."RolePermissions_Id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Roles_Id_seq"
OWNED BY "public"."Roles"."Id";
SELECT setval('"public"."Roles_Id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."TransportBrands_Id_seq"
OWNED BY "public"."TransportBrands"."Id";
SELECT setval('"public"."TransportBrands_Id_seq"', 9, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."TransportModels_Id_seq"
OWNED BY "public"."TransportModels"."Id";
SELECT setval('"public"."TransportModels_Id_seq"', 11, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."TransportSubTypes_Id_seq"
OWNED BY "public"."TransportSubTypes"."Id";
SELECT setval('"public"."TransportSubTypes_Id_seq"', 15, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."TransportTypes_Id_seq"
OWNED BY "public"."TransportTypes"."Id";
SELECT setval('"public"."TransportTypes_Id_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Users_Id_seq"
OWNED BY "public"."Users"."Id";
SELECT setval('"public"."Users_Id_seq"', 24, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Vehicles_Id_seq"
OWNED BY "public"."Vehicles"."Id";
SELECT setval('"public"."Vehicles_Id_seq"', 44, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Votes_Id_seq"
OWNED BY "public"."Votes"."Id";
SELECT setval('"public"."Votes_Id_seq"', 18, true);

-- ----------------------------
-- Indexes structure for table BestVehicles
-- ----------------------------
CREATE INDEX "IX_BestVehicles_UserId" ON "public"."BestVehicles" USING btree (
  "UserId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IX_BestVehicles_VehicleEntityId" ON "public"."BestVehicles" USING btree (
  "VehicleEntityId" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table BestVehicles
-- ----------------------------
ALTER TABLE "public"."BestVehicles" ADD CONSTRAINT "PK_BestVehicles" PRIMARY KEY ("Id");

-- ----------------------------
-- Indexes structure for table RefreshTokens
-- ----------------------------
CREATE UNIQUE INDEX "IX_RefreshTokens_UserId" ON "public"."RefreshTokens" USING btree (
  "UserId" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table RefreshTokens
-- ----------------------------
ALTER TABLE "public"."RefreshTokens" ADD CONSTRAINT "PK_RefreshTokens" PRIMARY KEY ("Id");

-- ----------------------------
-- Indexes structure for table RolePermissions
-- ----------------------------
CREATE INDEX "IX_RolePermissions_RoleId" ON "public"."RolePermissions" USING btree (
  "RoleId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "IX_RolePermissions_RoleId_PermissionType" ON "public"."RolePermissions" USING btree (
  "RoleId" "pg_catalog"."int4_ops" ASC NULLS LAST,
  "PermissionType" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table RolePermissions
-- ----------------------------
ALTER TABLE "public"."RolePermissions" ADD CONSTRAINT "PK_RolePermissions" PRIMARY KEY ("Id");

-- ----------------------------
-- Primary Key structure for table Roles
-- ----------------------------
ALTER TABLE "public"."Roles" ADD CONSTRAINT "PK_Roles" PRIMARY KEY ("Id");

-- ----------------------------
-- Primary Key structure for table TransportBrands
-- ----------------------------
ALTER TABLE "public"."TransportBrands" ADD CONSTRAINT "PK_TransportBrands" PRIMARY KEY ("Id");

-- ----------------------------
-- Indexes structure for table TransportModels
-- ----------------------------
CREATE INDEX "IX_TransportModels_TransportBrandId" ON "public"."TransportModels" USING btree (
  "TransportBrandId" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table TransportModels
-- ----------------------------
ALTER TABLE "public"."TransportModels" ADD CONSTRAINT "PK_TransportModels" PRIMARY KEY ("Id");

-- ----------------------------
-- Indexes structure for table TransportSubTypes
-- ----------------------------
CREATE INDEX "IX_TransportSubTypes_TransportTypeId" ON "public"."TransportSubTypes" USING btree (
  "TransportTypeId" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table TransportSubTypes
-- ----------------------------
ALTER TABLE "public"."TransportSubTypes" ADD CONSTRAINT "PK_TransportSubTypes" PRIMARY KEY ("Id");

-- ----------------------------
-- Primary Key structure for table TransportTypes
-- ----------------------------
ALTER TABLE "public"."TransportTypes" ADD CONSTRAINT "PK_TransportTypes" PRIMARY KEY ("Id");

-- ----------------------------
-- Indexes structure for table Users
-- ----------------------------
CREATE INDEX "IX_Users_RoleId" ON "public"."Users" USING btree (
  "RoleId" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table Users
-- ----------------------------
ALTER TABLE "public"."Users" ADD CONSTRAINT "PK_Users" PRIMARY KEY ("Id");

-- ----------------------------
-- Indexes structure for table Vehicles
-- ----------------------------
CREATE INDEX "IX_Vehicles_TransportBrandId" ON "public"."Vehicles" USING btree (
  "TransportBrandId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IX_Vehicles_TransportModelId" ON "public"."Vehicles" USING btree (
  "TransportModelId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IX_Vehicles_TransportSubTypeId" ON "public"."Vehicles" USING btree (
  "TransportSubTypeId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IX_Vehicles_TransportTypeId" ON "public"."Vehicles" USING btree (
  "TransportTypeId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IX_Vehicles_UserId" ON "public"."Vehicles" USING btree (
  "UserId" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table Vehicles
-- ----------------------------
ALTER TABLE "public"."Vehicles" ADD CONSTRAINT "PK_Vehicles" PRIMARY KEY ("Id");

-- ----------------------------
-- Indexes structure for table Votes
-- ----------------------------
CREATE INDEX "IX_Votes_UserId" ON "public"."Votes" USING btree (
  "UserId" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "IX_Votes_VehicleEntityId" ON "public"."Votes" USING btree (
  "VehicleEntityId" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table Votes
-- ----------------------------
ALTER TABLE "public"."Votes" ADD CONSTRAINT "PK_Votes" PRIMARY KEY ("Id");

-- ----------------------------
-- Primary Key structure for table __EFMigrationsHistory
-- ----------------------------
ALTER TABLE "public"."__EFMigrationsHistory" ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");

-- ----------------------------
-- Foreign Keys structure for table BestVehicles
-- ----------------------------
ALTER TABLE "public"."BestVehicles" ADD CONSTRAINT "FK_BestVehicles_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "public"."Users" ("Id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."BestVehicles" ADD CONSTRAINT "FK_BestVehicles_Vehicles_VehicleEntityId" FOREIGN KEY ("VehicleEntityId") REFERENCES "public"."Vehicles" ("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table RefreshTokens
-- ----------------------------
ALTER TABLE "public"."RefreshTokens" ADD CONSTRAINT "FK_RefreshTokens_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "public"."Users" ("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table RolePermissions
-- ----------------------------
ALTER TABLE "public"."RolePermissions" ADD CONSTRAINT "FK_RolePermissions_Roles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "public"."Roles" ("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table TransportModels
-- ----------------------------
ALTER TABLE "public"."TransportModels" ADD CONSTRAINT "FK_TransportModels_TransportBrands_TransportBrandId" FOREIGN KEY ("TransportBrandId") REFERENCES "public"."TransportBrands" ("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table TransportSubTypes
-- ----------------------------
ALTER TABLE "public"."TransportSubTypes" ADD CONSTRAINT "FK_TransportSubTypes_TransportTypes_TransportTypeId" FOREIGN KEY ("TransportTypeId") REFERENCES "public"."TransportTypes" ("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table Users
-- ----------------------------
ALTER TABLE "public"."Users" ADD CONSTRAINT "FK_Users_Roles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "public"."Roles" ("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table Vehicles
-- ----------------------------
ALTER TABLE "public"."Vehicles" ADD CONSTRAINT "FK_Vehicles_TransportBrands_TransportBrandId" FOREIGN KEY ("TransportBrandId") REFERENCES "public"."TransportBrands" ("Id") ON DELETE RESTRICT ON UPDATE NO ACTION;
ALTER TABLE "public"."Vehicles" ADD CONSTRAINT "FK_Vehicles_TransportModels_TransportModelId" FOREIGN KEY ("TransportModelId") REFERENCES "public"."TransportModels" ("Id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."Vehicles" ADD CONSTRAINT "FK_Vehicles_TransportSubTypes_TransportSubTypeId" FOREIGN KEY ("TransportSubTypeId") REFERENCES "public"."TransportSubTypes" ("Id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."Vehicles" ADD CONSTRAINT "FK_Vehicles_TransportTypes_TransportTypeId" FOREIGN KEY ("TransportTypeId") REFERENCES "public"."TransportTypes" ("Id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."Vehicles" ADD CONSTRAINT "FK_Vehicles_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "public"."Users" ("Id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table Votes
-- ----------------------------
ALTER TABLE "public"."Votes" ADD CONSTRAINT "FK_Votes_Users_UserId" FOREIGN KEY ("UserId") REFERENCES "public"."Users" ("Id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."Votes" ADD CONSTRAINT "FK_Votes_Vehicles_VehicleEntityId" FOREIGN KEY ("VehicleEntityId") REFERENCES "public"."Vehicles" ("Id") ON DELETE CASCADE ON UPDATE NO ACTION;