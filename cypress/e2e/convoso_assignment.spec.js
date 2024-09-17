import LoginPage from '../support/pageObjects/LoginPage';
import HomePage from '../support/pageObjects/HomePage';
import DNCPage from '../support/pageObjects/DNCPage';
import testData from "../fixtures/testData.json"
import deleteApi from '../support/pageObjects/DeleteApi';
const util = require('util');

  const loginPage = new LoginPage(cy);
  const homePage = new HomePage(cy);
  const dncPage = new DNCPage(cy);
     
  describe('Convoso Automation_Assignement', () => {
  
  // Prevent Cypress from failing due to uncaught exceptions
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  afterEach(()=>{
    deleteApi.deleteRecord();
  })

  it('Convoso_E2E_flow ', () => {

    loginPage.login();
    loginPage.assertLoginSuccessful();
    homePage.closeWarningMessage();
    homePage.navigateToDnc();
    homePage.assertDncManage();
    dncPage.click_on_upload_DNCButton();
    dncPage.assert_navigate_to_DncUploadingPage();
    
    for (const number of testData.listNumbers) {
      dncPage.addNumbers_in_addSingleNumber_Section(number);
      
    }
        
    homePage.navigateToDnc();
    dncPage.serachNumber(testData.campaign[0], testData.campaign[1]);
    let numberRow = (testData.listNumbers.length)-2;
    dncPage.edit_PenultimateNumber(numberRow);
    dncPage.editedNumber(testData.newNumber,testData.campaign[2]);
    dncPage.assert_url_aftereditPenultimateNumber();
    homePage.navigateToDnc();
    dncPage.serachNumber(testData.campaign[0], testData.campaign[2]);
    dncPage.assert_phoneNumber_Campaing_Validation(testData.newNumber);
  });
});
