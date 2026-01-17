class dashboardPage {

    verifyDashboard(){
        cy.url().should('include', '/dashboard');
    }
    validasiDashboard(){
        return cy.get('h6');
    }
    validasiquickLaunch() {
        cy.contains('Quick Launch').should('be.visible');
    }
    validasitimeAtWorkWidget() {
        cy.contains('Time at Work').should('be.visible');
    }   
    validasimyActionsWidget() {
        cy.contains('My Actions').should('be.visible'); 
    }
    validasibuzzWidget() {
        cy.contains('Buzz Latest Posts').should('be.visible');
    }
    logout() {
        cy.get('.oxd-userdropdown-tab').click();
        cy.contains('Logout').click();
    }
}

export default new dashboardPage();
