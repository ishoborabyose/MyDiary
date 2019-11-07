import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";

const expect = chai.expect;
chai.use(chaiHttp);

const user = {
  firstname: "ishoborabyose",
  lastname: "beatrice",
  email: "betty@gmail.com",
  password: "betty123"
};
describe("User signup", () => {
  it("should not allow user  to  sign up without required information", done => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(" ")
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).have.property("error");
        done();
      });
  });

  it("should not allow  user to sign up if  does not provide firstname ", done => {
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
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("should not allow  user to sign up if  does not provide lastname ", done => {
    const user2 = {
      firstname: "beatrice",
      lastname: " ",
      email: "betty@gmail.com",
      password: "betty123"
    };
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(user2)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("should not allow  user to sign up if  does not provide email ", done => {
    const user3 = {
      firstname: "beatrice",
      lastname: "Ishoborabyose",
      email: " ",
      password: "betty123"
    };
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(user3)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("should not allow  user to sign up if  does not provide password ", done => {
    const user4 = {
      firstname: "beatrice",
      lastname: "Ishoborabyose",
      email: "example@gmail.com ",
      password: " "
    };
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(user4)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
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

describe("User signin", () => {

  it("should not allow  user to log in if  does not provide email ", done => {
    const user1 = {
      email: " ",
      password: "betty123"
    };
    chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send(user1)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("should not allow  user to log in if  does not provide password ", done => {
    const user2 = {
      email: "example@gmail.com",
      password: " "
    };
    chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send(user2)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("should be to be successfully logged in ", done => {
    const user = {
      email: "betty@gmail.com",
      password: "betty123"
    };
    chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("data");
        done();
      });
  });
});
