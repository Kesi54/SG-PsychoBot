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

    let Max = data.data.length;

    let table = data.data;

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
        
        let mem = table[m].user_id;
        
        if(!output[mem] || skip)
        {
            output[mem] = table[m].nick;

            out.push(table[m]);
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

