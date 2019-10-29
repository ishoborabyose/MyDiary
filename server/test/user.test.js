import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import jwt from "jsonwebtoken";

const expect = chai.expect;
chai.use(chaiHttp);

const token = jwt.sign({ email: "example@gmail.com" }, process.env.MY_SECRET, {
  expiresIn: "2d"
});

describe("Routes do not exist", () => {
  it("expect to get message of URL not found", done => {
    chai
      .request(app)
      .get("/.....")
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.be.an("object");
        done();
      });
  });
});

const user = {
  firstname: "ishoborabyose",
  lastname: "beatrice",
  email: "betty@gmail.com",
  password: "betty123"
};
// sign up
describe("User signup", () => {
  it("should not allow user to sign up without required information", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(" ")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should not allow user to sign up without first name ", done => {
    const user1 = {
      firstname: " ",
      lastname: "beatrice",
      email: "betty@gmail.com",
      password: "betty123"
    };
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(user1)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("should not allow user to sign up without last name  ", done => {
    const user1 = {
      firstname: "Ishoborabyose",
      lastname: " ",
      email: "betty@gmail.com",
      password: "betty123"
    };
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(user1)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("should not allow user to sign up without email", done => {
    const user1 = {
      firstname: "ishoborabyose",
      lastname: "beatrice",
      email: " ",
      password: "betty123"
    };
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(user1)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("should not allow user to sign up without first name  ", done => {
    const user1 = {
      firstname: " ",
      lastname: "beatrice",
      email: "betty@gmail.com",
      password: " "
    };
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(user1)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("should  be successfully created ", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("data");
        done();
      });
  });
});

// sign in
describe("User signin", () => {
  it("should not allow user to log in without email ", done => {
    const user2 = {
      email: " ",
      password: "password"
    };

    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(user2)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("should not allow user to log in without password  ", done => {
    const user2 = {
      email: " example@email.com",
      password: " "
    };

    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(user2)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("should be successfully logged in ", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("data");
        done();
      });
  });
});

// create entries
describe("create entries", () => {
  it("should not allow user to create entry without title", done => {
    chai
      .request(app)
      .post("/api/v1/entry")
      .set("token", token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it("should not allow user to create entry without desription", done => {
    chai
      .request(app)
      .post("/api/v1/entry")
      .set("token", token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it("should not allow user to create entry successful", done => {
    chai
      .request(app)
      .post("/api/v1/entry")
      .set("token", token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
// get entries

describe("Get all entries", () => {
  it("should allow user to get all entries", done => {
    chai
      .request(app)
      .get("/api/v1/entries")
      .set("token", token)
      .end((req, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("data");
        expect(res.body)
          .to.have.property("status")
          .eql(200);
        done();
      });
  });
});

//get entry by  ID
describe("Get entry diary by id", () => {
  it("should allow user  to  get entry by id without token", done => {
    chai
      .request(app)
      .get("/api/v1/entries/:id")
      .set(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJldHR5QGdtYWlsLmNvbSIsImlhdCI6MTU3MjI1NzQxNiwiZXhwIjoxNTcyNDMwMjE2fQ.b3f5sR6LP0hyQLoKu_UJE-ONrx5IJ59Cqn1I6GpMi3Q"
      )
      .end((req, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should not  allow user to get diary without provided id", done => {
    chai
      .request(app)
      .get("/api/v1/entries/:id")
      .end((req, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("message");
        done();
      });
  });
});
