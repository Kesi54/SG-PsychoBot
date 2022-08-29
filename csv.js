async function* itr(n,s = 0)
{
  let i = s;

  while(i < n)
    yield i++;
}

module.exports.json2csv = async (data, table_name, d = ",") =>
{
    let arr = data[table_name]; let cnames = Object.keys(arr[0]); let cols = cnames.length;

    let columns = "", rows = "", first = true, aux = d;
    
    for await (let i of itr(arr.length)) 
    {
        for await (let j of itr(cols)) 
        {   
            if(j === cols - 1)

                aux = "\n";
                
            if(first)
            {
                if(aux === "\n")

                    first = false;
                
                columns += cnames[j] + aux;  
            }
                
            rows += arr[i][cnames[j]].toString() + aux;
        } 

        aux = d;
    } 

    return columns + rows;

}

module.exports.csv2json = async (data, table_name, d = ",") =>
{
    let arr = data.split('\n'); let cnames =  arr[0].split(",");

    let cols = cnames.length, rows = arr.length -1, out = {[table_name]:[]};

    for await (let i of itr(rows,1))
    {
        let json = {}

        let attr =  arr[i].split(',');

        for await (let j of itr(cols))
        {
            json[cnames[j]] = attr[j];
        }

        out[table_name].push(json);
    }

    return out;
}

/*let data = {table:[{a:1,b:2,c:3},{a:4,b:5,c:6},{a:7,b:8,c:9},{a:10,b:11,c:12},{a:13,b:14,c:15}]};

setImmediate(async ()=>
{
   let out = await this.json2csv(data,"table");

   console.log(out);

   console.log("\n");

   let revert =  await this.csv2json(out,"table");

   console.log(revert);

})*/