const axios = require('axios');

let url = process.argv[2];
let cnt = process.argv[3] === undefined?1:process.argv[3];
let success = 0;
let failure = 0;
let request = [];
let startTime,endTime;
if(url === undefined) console.log('No URL provided');
else {
    startTime = performance.now();
    for(let i=0;i<cnt;i++) {
        const requestPromise = axios.get(url)
            .then(response => {success++;})
            .catch(error => {failure++;})

        request.push(requestPromise);
    
    }
    Promise.all(request)
    .then(()=>{
        const endTime = performance.now();
        const elapsedTime = (endTime - startTime)/1000;
        console.log(`Total Request ${success + failure}`);   
        console.log(`Total sucess ${success}`);
        console.log(`Total failed ${failure}`);
        console.log(`Total Time: ${elapsedTime.toFixed(2)} seconds`);
    })
    .catch(error => console.log("something went wrong..."))
    
}




// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });
//console.log(`Request ${i + 1}: Response code - ${response.status}`)