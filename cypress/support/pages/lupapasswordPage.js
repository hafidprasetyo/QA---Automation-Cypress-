class lupapasswordPage {
    visit(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        failOnStatusCode: false
    }
    clickForgotPassword(){
        cy.contains('Forgot your password?').click();
    }
    verifyLupaPassowrd(){
        cy.url().should('include', '/requestPasswordResetCode');
        cy.contains('Reset Password').should('be.visible');
    }
    submitLupaPassword(){
        cy.get('button[type="submit"]').click();
    }  
    inputUsername(username){
        cy.get('input[name="username"]').type(username);
    }
    verifySuccesForgotPassword(){
        cy.contains('Reset Password link sent successfully').should('be.visible');
    }
     verifyRequired(){
        cy.contains('Required').should('be.visible');
    }
}


export default new lupapasswordPage()