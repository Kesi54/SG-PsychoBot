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

module.exports.filt =  async (input,table_name,prop,order,exc_max = null) =>
{
    let max = {max:null};

    //{table_name:[{prop:value,....},{prop:value,....},....]}
    
    input[table_name].sort(orderby(prop,order,max))

    if(exc_max)

        return {data:input.data.filter(json => json[prop] < max.max)};
    
    else

        return input;
}