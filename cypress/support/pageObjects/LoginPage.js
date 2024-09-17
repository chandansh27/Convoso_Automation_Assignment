export default class LoginPage {
  constructor(cy) {
    this.cy = cy;
    this.loginPageUrl = 'https://admin.convoso.com/login';
    this.usernameInputLocator = '#username';
    this.passwordInputLocator = '#password';
    this.loginButtonLocator = '.signin-btn.bg-primary';
  }

  login() {
    this.cy.visit(this.loginPageUrl);

    cy.fixture('credentials').then((credentials) => {
      this.cy.get(this.usernameInputLocator).type(credentials.login);
      this.cy.get(this.passwordInputLocator).type(credentials.password);
      this.cy.get(this.loginButtonLocator).click();
    });
  }

  assertLoginSuccessful() {
    this.cy.url().should('include', '/dashboard#/Index');
  }
}
