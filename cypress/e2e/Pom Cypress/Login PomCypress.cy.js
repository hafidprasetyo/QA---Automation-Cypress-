import loginPage from "../../support/pages/loginPage";
import loginData from "../../fixtures/loginData";

describe('Fitur Login Orange HRM (POM)', ()=> {
    it('TC-LG-01 Login dengan username dan password yang valid', ()=>{
        //Intercept
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginBerhasil');

        //Action POM
        loginPage.visit();
        loginPage.inputUsername(loginData.validUsername);
        loginPage.inputPassword(loginData.validPassword);
        loginPage.clickLogin();

        //wait
        cy.wait('@loginBerhasil');

        //Asertion POM
        loginPage.verifyDashboard();
    });
    it('TC-LG-02 Login gagal jika username salah dan password benar', () => {

        //Intercept
        cy.intercept('POST', '**/web/index.php/auth/validate').as('usernameSalah');

        //Action POM
        loginPage.visit();
        loginPage.inputUsername(loginData.invalidUsername);
        loginPage.inputPassword(loginData.validPassword);
        loginPage.clickLogin();

        //Wait
        cy.wait('@usernameSalah');

        //Assertion POM
        loginPage.verifyInvalidCredentials();
    });
    it('TC-LG-03 Login gagal jika username benar dan password salah', () => {
        
        //Intercept
        cy.intercept('POST', '**/web/index.php/auth/validate').as('passwordSalah');

        //Action POM
        loginPage.visit();
        loginPage.inputUsername(loginData.validUsername);
        loginPage.inputPassword(loginData.invalidPassword);
        loginPage.clickLogin();

        //Wait
        cy.wait('@passwordSalah');

        //Assertion POM
        loginPage.verifyStayLogin();
    });
    it('TC-LG-04 Login gagal jika username salah dan password salah', () => {

        //Intercept
        cy.intercept('POST', '**/web/index.php/auth/validate').as('keduanyaSalah'); 

        //Action POM
        loginPage.visit();
        loginPage.inputUsername(loginData.invalidUsername);
        loginPage.inputPassword(loginData.invalidPassword);
        loginPage.clickLogin();

        //Wait
        cy.wait('@keduanyaSalah');

        // Assertion POM
        loginPage.verifyInvalidCredentials();
    });
    it('TC-LG-05 Login gagal jika username dikosongkan', () => {

        const spy = cy.spy().as('usernameKosong');

        //Intercept
        cy.intercept('POST', '**/web/index.php/auth/validate', spy);

        //Action POM
        loginPage.visit();
        loginPage.inputPassword(loginData.validPassword);
        loginPage.clickLogin();

        cy.get('@usernameKosong').should('not.have.been.called');

        // Assertion POM
        loginPage.verifyRequired();
    });
    it('TC-LG-06 Login gagal jika password dikosongkan', () => {

        const spy = cy.spy().as('passwordKosong');

        //Intercept
        cy.intercept('POST', '**/web/index.php/auth/validate', spy);

        //Action POM
        loginPage.visit();
        loginPage.inputUsername(loginData.validUsername);
        loginPage.clickLogin();

        cy.get('@passwordKosong').should('not.have.been.called');

        // Assertion POM
        loginPage.verifyRequired();
    });
    it('TC-LG-07 Login gagal jika username dan password dikosongkan', () => {
        //Action POM
        loginPage.visit();
        loginPage.clickLogin();
        // Assertion POM
        loginPage.verifyRequired();
    });

})	