const fs = require('fs');

scramblers = fs.readFileSync("./scramblers.json");

async function* itr(n)
{
  let i = 0;

  while(i < n)
    yield i++;
}


scramblers = JSON.parse(scramblers);

let Max = Object.keys(scramblers).length;

let size = 10;

let output = {};

let iter = 0;

let mi = 2;

setImmediate(async()=>
{
    for await (let i of itr(Max))
    {
        let m = Math.floor(Math.random()*Max)
        
        let mem = Object.keys(scramblers)[m]
        
        if(!output[mem])

            output[mem] = scramblers[mem];

        if(Object.keys(output).length >= size)

            break;

        else if(i == Max - 1)
        {
            i = 0;

            iter++;

            if(iter>=mi)
                break;
        }
            
    }

    console.log(output);
})

