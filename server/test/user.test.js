
import chai from'chai';
import chaiHttp from'chai-http';
import app from '../index'

const expect = chai.expect;
chai.use(chaiHttp);

const user = {
	'firstname': 'ishoborabyose',
    'lastname': 'beatrice',
    'email': 'betty@gmail.com',
	'password': 'betty123',
};
describe('User signup', () => {

    it('expect to do not sign up if user send empty string', (done) =>{
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(" ")
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
      
    });

    it('expect to unothorize user to sign up if he/she does not have firstname ',(done) => {
        const user1 = {
            'firstname': ' ',
            'lastname':'beatrice',
            'email': 'betty@gmail.com',
            'password': 'betty123'
        }
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user1)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property("message");
                done();
              });
    });

    it('expect to be successfully created ', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("data");
                done();
            });
    });
});

describe('User signin', () => {

    it('expect to be successfully logged in ', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send(user)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property("message");
                expect(res.body).to.have.property("data");
                done();
            });
    });
});
