# DNC Management Test with Cypress

This project contains a Cypress test for DNC management.

## Running the Test
Prerequisites
Ensure you have the following installed:

1.Node.js 
2.NPM 
3 Install Cypress and its dependencies:
     npm install cypress @types/cypress

46. Clone the repo from below url:

5.Create json file under fixtures folder 

 with name 'credentials.json' 
 
{
    "username" : "enterusername",
    "password" : "enterpassword"

}
7. Run the test:

   npm run test:e2e:headed
   nom run test:e2e:headless

   Above commands  will run the testcases in headed and headless mode(enter above command in terminal).

