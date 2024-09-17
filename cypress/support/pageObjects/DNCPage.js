require("cypress-xpath");

class DNCPage {
  constructor(cy) {
    this.cy = cy;
    this.uploaddncbuttonLocater = "//a[@href='/dnc/upload']";
    this.phoneNumberLocater = "#number";
    this.countryLocater = "[ng-model='data.country_id_number']";
    this.campaignLocater = "[ng-model='data.campaign_id_number']";
    this.addButtonLocater = "//button[normalize-space(text())='add']";
    this.verifyNumbersLocater = '//div[@class="note note-success ng-binding"])[2]';
    this.filterbydropdownlocator = "//select[contains(@name, 'filterOption')]";
    this.searchbuttonlocator = "//button[@class='btn btn-success']";
    this.editPenultimateNumberLocater = '.table.table-striped > tbody > tr > td:nth-of-type(2)';
    this.editbuttonlocator =  "//a[contains(@href, 'edit')])[%s]";
    this.editphonenumbertextboxlocator =  "//input[@class='form-control ng-pristine ng-untouched ng-valid']";
    this.editcampaigndropdwonlocator = "//select[@ng-model='data.CurrentGeneralOptions.campaign_id']";

  }

  click_on_upload_DNCButton() {
    this.cy.xpath(this.uploaddncbuttonLocater).click();
  }
  assert_navigate_to_DncUploadingPage() {
    this.cy.url().should("include", "/upload#/DncUploading");
  }

  addNumbers_in_addSingleNumber_Section(number) {
    
    this.cy.get(this.phoneNumberLocater).clear();
    this.cy.get(this.phoneNumberLocater).type(number);
    this.cy.get(this.countryLocater).select("+1 United States");
    this.cy.get(this.campaignLocater).select("Global DNC List");
    this.cy.xpath(this.addButtonLocater).click();
    //this.assert_sucessMessage_afterAddingNumber(number);
    this.cy.contains('Added DNC number '+number+" to Global DNC List").should("exist");
  }
  assert_sucessMessage_afterAddingNumber(number) {
     this.cy.contains(`Added DNC number ${number} to Global DNC List`).should('exist');
  }
   
  edit_PenultimateNumber(newNumber) {
    cy.wait(3000);
    this.cy.get(this.editPenultimateNumberLocater).eq(newNumber).siblings('.text-right').as('selectaction');
    this.cy.get("@selectaction").then(()=>{
      this.cy.get("@selectaction").find("[data-toggle='dropdown']").click({force:true});
      this.cy.get("@selectaction").children().find('[href*="edit"]').click({force:true});
    })

     }
     assert_url_aftereditPenultimateNumber(){
      this.cy.url().should('include', '/edit#/Edit');
    }  

    editedNumber(number, campaign) {
      this.cy.get("#AdminDncEditController").as("editcontroller");
      this.cy.get("@editcontroller").find('[ng-model="data.CurrentGeneralOptions.campaign_id"]').select(campaign)
      this.cy.get("@editcontroller").find('input[type="text"]',{force:true},{ timeout:7000}).type('{selectall}{backspace}'+number);
      this.cy.get("#send-email").click();
  }

  serachNumber(campaign, selectDNC){
    cy.wait(3000);
    this.cy.xpath(this.filterbydropdownlocator).select(campaign);
     this.cy
       .get(".ng-scope")
       .find("input[type=text]")
       .eq(0)
       .click({ force: true }, { multiple: true })
       .then(() => {
         this.cy.contains(selectDNC).click({ force: true });
       });
    this.cy.xpath(this.searchbuttonlocator).click({ force: true });
}

assert_phoneNumber_Campaing_Validation(listnumber){
  this.cy.get('.table.table-striped > tbody > tr > td:nth-of-type(2)').should("exist");
  const revlist= listnumber.reverse();
  this.cy.get('.table.table-striped > tbody > tr > td:nth-of-type(2)').each(($e1, index, $list) =>{
      const text = $e1.text();
      expect(text).to.equal(revlist[index]);  
  })

}
}

export default DNCPage;
