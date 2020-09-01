const chai = require('chai');
const chaiHttp = require('chai-http');

const jwt = require('jsonwebtoken');

const server = require('../index');
// const Doctor = require('../model/doctor');
// const report = require('../model/report');



chai.use(chaiHttp);

chai.should();

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRpZW50IjpbIjVmNDUwOTFhZTY0MzY5MDU1Y2U1ODRjMSIsIjVmNDUwOTI1ZTY0MzY5MDU1Y2U1ODRjMyIsIjVmNDUwOTJjZTY0MzY5MDU1Y2U1ODRjNCIsIjVmNDUwYTFiZTY0MzY5MDU1Y2U1ODRjNSJdLCJfaWQiOiI1ZjQ1MDhhZmU2NDM2OTA1NWNlNTg0YmYiLCJlbWFpbCI6IkRvY3RvcjFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjMiLCJjcmVhdGVkQXQiOiIyMDIwLTA4LTI1VDEyOjQ4OjQ3LjkzNVoiLCJ1cGRhdGVkQXQiOiIyMDIwLTA4LTI1VDEyOjU0OjUxLjkxNVoiLCJfX3YiOjQsImlhdCI6MTU5ODgwODM3MSwiZXhwIjo0MDAwMDE1OTg4MDgzNzF9.khlxhvYSN49xg1JQfmeKgHAIrDEhuz808_mEoNgSUwk';

describe("Api Tasks", () => {

    //to create or register a new patient
    describe("POST /patients/register", () => {
        it("It should be create a new patient", (done) => {
            const patientDetails = {
                phoneNumber: 9874311,
                patientName: "ABC"
            }
            chai.request(server)
                .post("/patients/register")
                .set('content-type', 'application/x-www-form-urlencoded')
                .set({ 'Authorization': 'Bearer ' + token })
                .send(patientDetails)
                .end((err, response) => {
                    response.should.have.status(200);
                    
                    done();
                });
        });

    });

    //to create a report of patient along with their id

    describe("POST /patients/:id/create_report", () => {
        it("It should be create a report of patient", (done) => {
            const patientID = '5f450925e64369055ce584c3';
            const reportDetails = {
                Status: "Negative",
                Date: "25/06/20"
            }
            chai.request(server)
                .post("/patients/" + patientID + "/create_report")
                .set('content-type', 'application/x-www-form-urlencoded')
                .set({'Authorization':  'Bearer ' + token})
                .send(reportDetails)
                .end((err, response) => {
                    response.should.have.status(200);
                    // console.log(response.body);                    
                    done();
                });
        });
    });

        //to get reports of patient 
        describe("GET /patients/:id/all_reports", () => {
            it("It should be get all the reports of patient", (done) => {
                const patientID = '5f450925e64369055ce584c3';
                chai.request(server)
                    .get("/patients/" + patientID + "/all_reports")
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.report.should.be.a('array');
                        done();
                    });
        });
    });

});