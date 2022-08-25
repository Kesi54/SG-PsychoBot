//let names = ["john", "kate", "dan","Noc"];
// Sorting array of strings, lexicographically

const header = 
[
    '```ml',
    '+-----------------+----------+',
    '|  Weekly PQ Scramble List   |',
    '|                            |',
    '|      Player ID Names       |',
    '+-----------------+----------+']

const delimiter = ['| ',' |'];

const footer = ['+-----------------+----------+```'];

async function* itr(n)
{
  let i = 0;

  while(i < n)
    yield i++;
}

module.exports.format = async (names) =>
{   
    for await (let i of itr(names.length))
    {   
        if(names[i])
        {
            let aux = names[i].split(/[\[\]]+/)[1];

            if(!aux)
                
                aux = names[i].split(/[/《/》]+/)[1]

                if(!aux)
                
                    aux = "'" + names[i] + " (Not an ID)";
    
            len = 26- aux.length;
    
            if(len <=0)
    
                len = 1;
            
            names[i] = delimiter[0] + aux + ' '.repeat(len) + delimiter[1];
        }
       
    }

    let result = header.concat(names.sort(),footer);

    result = result.join('\n');

    console.log(result);
    
    return result;
}

//this.format(['Cat [Moop]','Merp'])