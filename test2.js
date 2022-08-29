/*let x = '10ef';

if(!isNaN(x))
{
    console.log(parseInt(x));
}
else
{
    console.log("cataplurg")
} */

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

