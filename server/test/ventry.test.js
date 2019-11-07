import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import app from "../index";
import dotenv from "dotenv";

const expect = chai.expect;
chai.use(chaiHttp);
dotenv.config();

const token = jwt.sign({ id: "e2401fe0-0131-11ea-bb8a-1f8a1331dd55" }, process.env.MY_SECRET, {
  expiresIn: "2d"
} );

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
  } );
  
  it( "should not allow user to create entry without a token", done =>
  {
    chai
    .request(app)
    .post("/api/v1/entries/")
    .set("token", " ")
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).have.property("error");
      done();
    });
});
  })

  it("should  allow user  to  create entry successfully", done => {
    const create = {
      title: "book",
      description: "my online diary is an online journal where user write down thought and feelings"
    };
    chai
      .request(app)
      .post("/api/v1/entries")
      .set("token", token)
      .send(create)
      .end( ( err, res ) =>
      {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("data");
        done();
      });
  });





