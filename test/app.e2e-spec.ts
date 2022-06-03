import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing"
import { PrismaService } from "../src/prisma/prisma.service";
import { AppModule } from "../src/app.module"
import * as pactum from "pactum";
import { AuthDto } from "src/auth/dto";

describe("App e2e", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }));
    await app.init();
    await app.listen(8080);

    prisma = app.get(PrismaService)
    await prisma.cleanDB()
    pactum.request.setBaseUrl("http://localhost:8080")
  });

  afterAll(() => {
    app.close();
  });

  describe("Auth", () => {
    const dto: AuthDto = {
      email: "test@gmail.com",
      password: "123"
    };
    
    describe("Signup", () => {
      it("should signup", () => {
        return pactum
                .spec()
                .post("/auth/signup")
                .withBody(dto)
                .expectStatus(201)
                .inspect()
                
      })

      it("should throw if email empty", () => {
        return pactum
                .spec()
                .post("/auth/signup")
                .withBody({
                  "password": dto.password
                })
                .expectStatus(400)
                .inspect()
                
      })

      it("should throw if password empty", () => {
        return pactum
                .spec()
                .post("/auth/signup")
                .withBody({
                  "email": dto.email
                })
                .expectStatus(400)
                .inspect()
                
      })

      it("should throw if no body", () => {
        return pactum
                .spec()
                .post("/auth/signup")
                .withBody({})
                .expectStatus(400)
                .inspect()
                
      })
    })

    describe("Login", () => {
      it("should login", () => {
        return pactum
        .spec()
        .post("/auth/login")
        .withBody(dto)
        .expectStatus(200)
        .inspect()
      })

      it("should throw if email empty", () => {
        return pactum
                .spec()
                .post("/auth/login")
                .withBody({
                  "password": dto.password
                })
                .expectStatus(400)
                .inspect()
                
      })

      it("should throw if password empty", () => {
        return pactum
                .spec()
                .post("/auth/login")
                .withBody({
                  "email": dto.email
                })
                .expectStatus(400)
                .inspect()
                
      })

      it("should throw if no body", () => {
        return pactum
                .spec()
                .post("/auth/login")
                .withBody({})
                .expectStatus(400)
                .inspect()
                
      })
    })
  })

  describe("User", () => {
    describe("Get details", () => {

    })

    describe("Edit user", () => {

    })
  })

  describe("Bookmark", () => {
    describe("Create bookmark", () => {

    })

    describe("Get bookmarks", () => {

    })

    describe("Get bookmark by id", () => {

    })

    describe("Edit bookmark", () => {

    })

    describe("Delete bookmark", () => {

    })
  })

  it.todo('should pass')
})
