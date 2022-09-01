//let names = ["john", "kate", "dan","Noc"];
// Sorting array of strings, lexicographically



const h1 = 
[
    '```ml',
    '+-----------------+----------+',
    '|  Weekly PQ Scramble List   |',
    '|                            |'
]

const h2 = 
[   
    '|                            |',
    '|      Player ID Names       |',
    '+-----------------+----------+'
]
function header(count)
{
    let mid = `|            (${count})            |`;

    return h1.concat(mid,h2);
}

const delimiter = ['| ',' |'];

const footer = ['+-----------------+----------+```'];

async function* itr(n)
{
  let i = 0;

  while(i < n)
    yield i++;
}

module.exports.format = async (scr) =>
{    
    let names = scr.data;
    
    let n = names.length;

    let res = [];

    for await (let i of itr(n))
    {   
        let name = names[i].nick.toString();

        if(name)
        {
            let aux = name.split(/[\[\]]+/)[1];

            if(!aux)
                
                aux = name.split(/[/《/》]+/)[1]

                if(!aux)
                
                    aux = "'" + name + " (Not an ID)";
    
            len = 26- aux.length;
    
            if(len <=0)
    
                len = 1;
            
            res.push(delimiter[0] + aux + ' '.repeat(len) + delimiter[1]);
        }
       
    }

    let result = header(res.length).concat(res.sort(),footer);

    result = result.join('\n');

    console.log(result);
    
    return result;
}

//this.format(['Cat [Moop]','Merp'])