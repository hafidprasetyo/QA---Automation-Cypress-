import loginPage from "../../support/pages/loginPage";
import loginData from "../../fixtures/loginData";
import lupapasswordPage from "../../support/pages/lupapasswordPage";
import lupaPassword from "../../fixtures/lupaPassword";
import dashboardPage from "../../support/pages/dashboardPage";

describe('Fitur Login Website OrangeHRM', ()=> {
    it('TC-LG-01 Login Berhasil - Username dan Password Valid', ()=>{
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
    it('TC-LG-02 Login Gagal - Username Salah', () => {
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
    it('TC-LG-03 Login Gagal - Password Salah', () => {
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
    it('TC-LG-04 Login Gagal - Username Salah dan Password Salah', () => {

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
    it('TC-LG-05 Login Gagal - Username Kosong', () => {

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
    it('TC-LG-06 Login Gagal - Password Kosong', () => {

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
    it('TC-LG-07 Login gagal - Username dan Password dikosongkan', () => {
        //Action POM
        loginPage.visit();
        loginPage.clickLogin();
        // Assertion POM
        loginPage.verifyRequired();
    });
    it('TC-LG-08 Login gagal - Username Mengandung Spasi', () => {
        //Intercept
        cy.intercept('POST', '**/web/index.php/auth/validate').as('spasiUsername'); 

        //Action POM
        loginPage.visit();
        loginPage.inputUsername(loginData.spasiUsername);
        loginPage.inputPassword(loginData.validPassword);
        loginPage.clickLogin();

        //Wait
        cy.wait('@spasiUsername');

        // Assertion POM
        loginPage.verifyInvalidCredentials();
    });
    it('TC-LG-09 Login gagal - Password Mengandung Spasi', () => {
        //Intercept
        cy.intercept('POST', '**/web/index.php/auth/validate').as('spasiPassword'); 

        //Action POM
        loginPage.visit();
        loginPage.inputUsername(loginData.validUsername);
        loginPage.inputPassword(loginData.spasiPassword);
        loginPage.clickLogin();

        //Wait
        cy.wait('@spasiPassword');

        //Assertion POM
        loginPage.verifyInvalidCredentials();
    });
})	

describe('Fitur Lupa Passsword Website orangeHRM', () =>{
    it('TC-LP-01 Visit - Mengunjungi Halaman Forgot your Password', () => {
        //Action POM
        lupapasswordPage.visit();
        lupapasswordPage.clickForgotPassword();

        //AsertionPOM
        lupapasswordPage.verifyLupaPassowrd();
    });
    it('TC-LP-02 Forgot Password - Username Kosong  ', () => {
        //Action POM
        lupapasswordPage.visit();
        lupapasswordPage.clickForgotPassword();
        lupapasswordPage.submitLupaPassword();

        //AsertionPOM
        lupapasswordPage.verifyRequired();

    });
    it('TC-LP-03 Forgot Password - Username hanya spasi  ', () => {
        //Action POM
        lupapasswordPage.visit();
        lupapasswordPage.clickForgotPassword();
        lupapasswordPage.inputUsername(lupaPassword.hanyaSpasi);
        lupapasswordPage.submitLupaPassword();

        //AsertionPOM
        lupapasswordPage.verifyRequired();

    });
})

describe('Dashboard Website orangeHRM', () =>{
    it('TC-DB-01 Visit - Mengunjungi Halaman Dashboard', () => {
        //Intercept
        cy.intercept('GET', '**/dashboard/index').as('dashboard');

        //Action POM
        loginPage.visit();
        loginPage.inputUsername(loginData.validUsername);
        loginPage.inputPassword(loginData.validPassword);
        loginPage.clickLogin();

        //Wait
        cy.wait('@dashboard').its('response.statusCode').should('eq', 200);

        //Assertion POM
        dashboardPage.verifyDashboard();

    });
    it('TC-DB-02 Validasi Judul Dashboard', () => {
        //Action POM
        loginPage.visit();
        loginPage.inputUsername(loginData.validUsername);
        loginPage.inputPassword(loginData.validPassword);
        loginPage.clickLogin();

        //Assertion POM
        dashboardPage.validasiDashboard().should('contain', 'Dashboard');
    });
    it('TC-DB-03 Validasi Judul Quick Launch', () => {
        //Action POM
        loginPage.visit();
        loginPage.inputUsername(loginData.validUsername);
        loginPage.inputPassword(loginData.validPassword);
        loginPage.clickLogin();

        //Assertion POM
        dashboardPage.validasiquickLaunch();
    });
    it('TC-DB-04 Validasi Judul Time at Work', () => {
        //Action POM
        loginPage.visit();
        loginPage.inputUsername(loginData.validUsername);
        loginPage.inputPassword(loginData.validPassword);
        loginPage.clickLogin();

        //Assertion POM
        dashboardPage.validasitimeAtWorkWidget();
    });
    it('TC-DB-05 Validasi Judul My Action', () => {
        //Action POM
        loginPage.visit();
        loginPage.inputUsername(loginData.validUsername);
        loginPage.inputPassword(loginData.validPassword);
        loginPage.clickLogin();

        //Assertion POM
        dashboardPage.validasimyActionsWidget();
    });
    it('TC-DB-06 Validasi Judul Buzz Latest Posts', () => {
        //Action POM
        loginPage.visit();
        loginPage.inputUsername(loginData.validUsername);
        loginPage.inputPassword(loginData.validPassword);
        loginPage.clickLogin();

        //Assertion POM
        dashboardPage.validasibuzzWidget();
    });
})