require('cypress-xpath');

export default class HomePage {
  constructor(cy) {
    this.cy = cy;

    this.modalCloseButtonLocator = '.modal-footer button[data-dismiss="modal"]:visible';
    this.callCenterDropdownLocator = "//span[normalize-space(text())='Call Center']"; 
    this.dncOptionLocator = '(//a[normalize-space(text())=\'DNC\'])[1]'; 
  }

  async closeWarningMessage() {
    this.cy.get(this.modalCloseButtonLocator).should("exist").click();
  }

  async navigateToDnc() {
    cy.wait(3000); 

    this.cy.xpath(this.callCenterDropdownLocator).click({ force: true }); 
    this.cy.xpath(this.dncOptionLocator).click({ force: true }); 
  }

  async assertDncManage() {
    this.cy.url().should('include', '/manage#/DncManage');
  }
}