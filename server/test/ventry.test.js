import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import app from "../index";
import dotenv from "dotenv";

const expect = chai.expect;
chai.use(chaiHttp);
dotenv.config();

const token = jwt.sign({ email: "example@gmail.com" }, process.env.MY_SECRET, {
  expiresIn: "2d"
});
describe("Entry diary", () => {
  it("should not allow user  to  create entry  without title", done => {
    const add = {
      title: " ",
      description: "mine boy"
    };
    chai
      .request(app)
      .post("/api/v1/entries")
      .set("token", token)
      .send(add)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).have.property("error");
        done();
      });
  });

  it("should not allow user  to  create entry  with an invalid token", done => {
    chai
      .request(app)
      .post("/api/v1/entries")
      .set("token", "invalid")
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).have.property("error");
        done();
      });
  });

  it("should not allow user  to  create entry  without description", done => {
    const add1 = {
      title: " book ",
      description: " "
    };
    chai
      .request(app)
      .post("/api/v1/entries")
      .set("token", token)
      .send(add1)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).have.property("error");
        done();
      });
  });

  it("should  allow user  to  create entry successfully", done => {
    const create = {
      title: "book",
      description: "mine boy"
    };
    chai
      .request(app)
      .post("/api/v1/entries")
      .set("token", token)
      .send(create)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("data");
        done();
      });
  });
});

//Edit
describe(" Edit diary", () => {
  it("should not allow user  to  edit entry  without title", done => {
    const edittitle = {
      description: "mine boy"
    };
    chai
      .request(app)
      .patch("/api/v1/entries/7244ec80-fbdb-11e9-ac6a-f93458b5546e")
      .set("token", token)
      .send(edittitle)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).have.property("error");
        done();
      });
  });

  it("should not allow user  to  edit entry  without description", done => {
    const editdescription = {
      title: "book"
    };
    chai
      .request(app)
      .patch("/api/v1/entries/7244ec80-fbdb-11e9-ac6a-f93458b5546e")
      .set("token", token)
      .send(editdescription)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).have.property("error");
        done();
      });
  });

  it("should not allow user  to  edit entry  with an invalid token", done => {
    chai
      .request(app)
      .patch("/api/v1/entries/7244ec80-fbdb-11e9-ac6a-f93458b5546e")
      .set("token", "invalid")
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).have.property("error");
        done();
      });
  });

});

// all diaries
describe(" Get all  diaries", () => {
  

  it("should allow user  to  get  all entries", done => {
    chai
      .request(app)
      .get("/api/v1/entries")
      .set("token", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("data");
        done();
      });
  });
});
