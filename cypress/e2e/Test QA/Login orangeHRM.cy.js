describe('Fitur Login Orange HRM', ()=> {
    it('TC-LG-01 Login dengan username dan password yang valid', ()=>{
        //Action
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('admin');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
        //Asertion
        cy.url().should('include', '/dashboard');
        cy.contains('Dashboard').should('be.visible');
    });
    it('TC-LG-02 Login gagal jika username salah dan password benar', () => {
        //Action
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('usersalah');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
        // Assertion
        cy.contains('Invalid credentials').should('be.visible');
    });
    it('TC-LG-03 Login gagal jika username benar dan password salah', () => {
        //Action
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('admin');
        cy.get('input[name="password"]').type('admin');
        cy.get('button[type="submit"]').click();
        // Assertion
        cy.contains('Invalid credentials').should('be.visible');
    });
    it('TC-LG-04 Login gagal jika username salah dan password salah', () => {
        //Action
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('user');
        cy.get('input[name="password"]').type('user');
        cy.get('button[type="submit"]').click();
        // Assertion
        cy.contains('Invalid credentials').should('be.visible');
    });
    it('TC-LG-05 Login gagal jika username dikosongkan', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
        // Assertion
        cy.contains('Required').should('be.visible');
    });
    it('TC-LG-06 Login gagal jika password dikosongkan', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('admin');
        cy.get('button[type="submit"]').click();
        // Assertion
        cy.contains('Required').should('be.visible');
    });
    it('TC-LG-07 Login gagal jika username dan password dikosongkan', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('button[type="submit"]').click();
        // Assertion
        cy.contains('Required').should('be.visible');
    });

})