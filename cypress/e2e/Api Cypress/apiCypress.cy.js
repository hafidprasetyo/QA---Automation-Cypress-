describe('Automation Api Use Cypress', () => {

    it('TC-API-01 Single User', () => {
       cy.request({
        method: 'GET', 
        url : `https://reqres.in/api/users/2`,
        headers: { 
            'x-api-key' : 'reqres_1b31adc0a61044e0ae1cf33aff9cbff2'   
        }
        })    
        .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.id).to.eq(2); 
        expect(response.body.data).to.have.property('email');
        });
    });

    it('TC-API-02 Create User', () => {
    cy.request({
        method: 'POST', 
        url : `https://reqres.in/api/users`,
        headers: { 
            'x-api-key' : 'reqres_1b31adc0a61044e0ae1cf33aff9cbff2'
        },
        body :{
        'name' :'Hafid Arief Prasetyo',
        'job' : 'QA Engginer',
       },
       })    
       .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.name).to.eq('Hafid Arief Prasetyo');
        expect(response.body.job).to.eq('QA Engginer');
        expect(response.body).to.have.property('id');
       });
    });

    it('TC-API-03 Update User', () => {
    cy.request({
        method: 'PUT', 
        url : `https://reqres.in/api/users/2`,
        headers: { 
            'x-api-key' : 'reqres_1b31adc0a61044e0ae1cf33aff9cbff2'
        },
        body :{
        'name' :'Hafid Arief Prasetyo',
        'job' : 'QA Junior',
       },
       })    
       .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.job).to.eq('QA Junior');
       });
    });

    it('TC-API-04 Update User', () => {
    cy.request({
        method: 'PATCH', 
        url : `https://reqres.in/api/users/2`,
        headers: { 
            'x-api-key' : 'reqres_1b31adc0a61044e0ae1cf33aff9cbff2'
        },
        body :{
        'name' :'Hafid',
       },
       })    
       .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq('Hafid');
       });
    });

    it('TC-API-05 Delete User', () => {
    cy.request({
        method: 'DELETE', 
        url : `https://reqres.in/api/users/2`,
        headers: { 
            'x-api-key' : 'reqres_1b31adc0a61044e0ae1cf33aff9cbff2'
        },
       })    
       .then((response) => {
        expect(response.status).to.eq(204);
       });
    });

    it('TC-API-06 Login Berhasil', () => {
    cy.request({
        method: 'POST', 
        url : `https://reqres.in/api/login`,
        headers: { 
            'x-api-key' : 'reqres_1b31adc0a61044e0ae1cf33aff9cbff2'
        },
        body :{
        "email": "eve.holt@reqres.in",
        "password": "pistol",
       },
       })    
       .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token')
       });
    });

    it('TC-API-07 Login Gagal', () => {
    cy.request({
        method: 'POST', 
        url : `https://reqres.in/api/login`,
        headers: { 
            'x-api-key' : 'reqres_1b31adc0a61044e0ae1cf33aff9cbff2'
        },
        failOnStatusCode: false,
        body :{
        "email": "peter@klaven",
       },
       })    
       .then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq("Missing password");
       });
    });

    it('TC-API-08 Regsiter Gagal', () => {
    cy.request({
        method: 'POST', 
        url : `https://reqres.in/api/register`,
        headers: { 
            'x-api-key' : 'reqres_1b31adc0a61044e0ae1cf33aff9cbff2'
        },
        failOnStatusCode: false,
        body :{
        "email": "sydney@fife",
       },
       })    
       .then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq("Missing password");
       });
    });

}
)