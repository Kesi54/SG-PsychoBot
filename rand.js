const fs = require('fs');

//scramblers = fs.readFileSync("./scramblers.json");

async function* itr(n)
{
  let i = 0;

  while(i < n)
    yield i++;
}


//scramblers = JSON.parse(scramblers);

//let Max = Object.keys(scramblers).length;

const mi = 2;

module.exports.random = async (data,size)=>
{   
    let output = {};

    let out = [];

    let iter = 0;

    let Max = Object.keys(data).length;

    let skip = false;

    console.log(data);

    console.log(Max);

    if(size>=Max)
    {
        skip = true;

        size = Max;
    }
        

    for await (let i of itr(Max))
    {
        let m = i;

        if(!skip)
            
            m = Math.floor(Math.random()*Max)
        
        let mem = Object.keys(data)[m]
        
        if(!output[mem] || skip)
        {
            output[mem] = data[mem];

            out.push(output[mem]);
        }
           

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

    return out;
}

