/*let x = '10ef';

if(!isNaN(x))
{
    console.log(parseInt(x));
}
else
{
    console.log("cataplurg")
} */
/*
var a = {data:[
    {
        "Name" : "Sachin",
        "Age"  : "41",
        "Team" : "Mumbai"
    },
    {
        "Name" : "Dravid",
        "Age"  : "42",
        "Team" : "Rajasthan"
    },
    {
        "Name" : "Yuvraj",
        "Age"  : "31",
        "Team" : "Bangalore"
    },
    {
        "Name" : "Glen",
        "Age"  : "35",
        "Team" : "Bangalore"
    },
    {
        "Name" : "Purplen",
        "Age"  : "40",
        "Team" : "Bangalore"
    }
]};

let max = {max:null};

function check(val,aux)
{
    if(val)
    {
        if(aux > val)
        
            return aux;
        
        return val;
    } 
    else

        return aux;  
}

function orderby(prop,order,max)
{   
    //order
    //asc 1
    //desc -1

    return function(x,y)
    {
        if(x[prop] > y[prop])
        {
            max.max = check(max.max,x[prop])

            return 1*order;
        }
        else if(x[prop] < y[prop])
        {
            max.max = check(max.max,y[prop])       

            return -1*order;
        }

        if(max.max === null)
            max.max = x[prop];

        return 0;
    }
}
//function desc (x,y){return y["Age"]- x["Age"]}
   
a.data.sort(orderby("Age",1,max));

console.log(max);

let res = {data:a.data.filter(json => json.Age < max.max)};
console.log(res);

   //show only those under max

*/

 let a = [1];

 if(a.length)
    
    console.log("TRUE")

else

    console.log("FALSE");


    async function get_late(op,id)
{
    let output, data;

    [output,data] = await get_users(op,id,false);

    let l1 = scramblers.data.length, l2 = data.data.length;

    let late_comers = {data: []};

    let j1 = scramblers.data, j2 = data.data;

    let aux = false;

    let out = [];

    for await(i of itr(l2))
    {   

        for await(j of itr(l1))
        {   
            if(j1[j])
            {
                if(!(JSON.stringify(j1[j])) === JSON.stringify(j2[i]))
                {
                    j1[j] = null;

                    aux = true;

                    break;
                }
            }
        }

        if(!aux)
        
            late_comers.data.push(j2[i]);
        
        else
            
            aux = false;
    }


    if (late_comers.data.length)

        return [true,late_comers]

    //message.channel.lastMessageID
}