class DeleteApi {
    deleteRecord(){
        let textArray = new Array();
        cy.request({
            method: 'POST',
            url: 'https://admin-dt.convoso.com/dnc/search',
           
        }).then((response) => { 
            //expect(response.status).to.eq(200);
            let count = response.body.data.results.length;
            for (let i = 0; i < count; i++) {
                textArray.push(response.body.data.results[i].id);
                cy.log("ID: " + response.body.data.results[i].id);
                cy.request({
                    method: 'DELETE',
                    url: `https://admin-dt.convoso.com/dnc/${textArray[i]}/delete?id=${textArray[i]}`,
                    body: "id=" + textArray[i],
                    headers: {
                        'Content-Type': 'application/json'
                    }

                }).then((response1) => {
                    expect(response1.status).to.eq(200);
                    cy.wait(1000);

                })

            }
        })
    }

}
const apiRequest  = new DeleteApi();
export default apiRequest ;