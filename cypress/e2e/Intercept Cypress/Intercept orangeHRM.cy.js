describe('Fitur Login Orange HRM', ()=> {
    it('TC-LG-01 Login dengan username dan password yang valid', ()=>{

        //Intercept
        cy.intercept('POST', '**/web/index.php/auth/validate').as('loginBerhasil');

        //Action
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('admin');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        //wait
        cy.wait('@loginBerhasil');

        //Asertion
        cy.url().should('include', '/dashboard');
        cy.contains('Dashboard').should('be.visible');
    });
    it('TC-LG-02 Login gagal jika username salah dan password benar', () => {

        //Intercept
        cy.intercept('POST', '**/web/index.php/auth/validate').as('usernameSalah');

        //Action
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('usersalah');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        //Wait
        cy.wait('@usernameSalah');

        //Assertion
        cy.contains('Invalid credentials').should('be.visible');
    });
    it('TC-LG-03 Login gagal jika username benar dan password salah', () => {
        
        //Intercept
        cy.intercept('POST', '**/web/index.php/auth/validate').as('passwordSalah');

        //Action
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('admin');
        cy.get('input[name="password"]').type('admin');
        cy.get('button[type="submit"]').click();

        //Wait
        cy.wait('@passwordSalah');

        cy.url().should('include', '/auth/login');
        cy.contains('Login').should('be.visible');
    });
    it('TC-LG-04 Login gagal jika username salah dan password salah', () => {

        //Intercept
        cy.intercept('POST', '**/web/index.php/auth/validate').as('keduanyaSalah'); 

        //Action
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('user');
        cy.get('input[name="password"]').type('user');
        cy.get('button[type="submit"]').click();

        //Wait
        cy.wait('@keduanyaSalah');

        // Assertion
        cy.contains('Invalid credentials').should('be.visible');
    });
    it('TC-LG-05 Login gagal jika username dikosongkan', () => {

        const spy = cy.spy().as('usernameKosong');

        //Intercept
        cy.intercept('POST', '**/web/index.php/auth/validate', spy);

        //Action
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        cy.get('@usernameKosong').should('not.have.been.called');

        // Assertion
        cy.contains('Required').should('be.visible');
    });
    it('TC-LG-06 Login gagal jika password dikosongkan', () => {

        const spy = cy.spy().as('passwordKosong');

        //Intercept
        cy.intercept('POST', '**/web/index.php/auth/validate', spy);

        //Action
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('input[name="username"]').type('admin');
        cy.get('button[type="submit"]').click();

        cy.get('@passwordKosong').should('not.have.been.called');

        // Assertion
        cy.contains('Required').should('be.visible');
    });
    it('TC-LG-07 Login gagal jika username dan password dikosongkan', () => {
        //Action
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('button[type="submit"]').click();
        // Assertion
        cy.contains('Required').should('be.visible');
    });

})	