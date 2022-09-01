/*============================================================================*/

const list = require('./sort.js');

const random = require('./rand.js');

const { Client, IntentsBitField /*GatewayIntentBits, GuildMember*/ } = require('discord.js');

const myIntents = new IntentsBitField();

myIntents.add(IntentsBitField.Flags.GuildPresences, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.Guilds);

const mentions = {parse:['roles'],repliedUser:false};

const client = new Client({ intents: myIntents, allowedMentions: mentions });

//const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers] });

const fs = require('fs');

text = fs.readFileSync("./t.json");

scramblers = fs.readFileSync("./scramblers.json");

data = JSON.parse(text);

const TOKEN = data.token;

const CLIENT_ID = data.id;

const EMOTE = 
[
    {emote:'<:SG:889605404789727272>',id:'889605404789727272'},
    {emote:'🍔',id:'🍔'}
];


const SEM = 0;

const ID = '1012115235399794728'//'1011312526883049472';

const ROLE = ['<@&888863816383856660>']

async function* itr(n)
{
  let i = 0;

  while(i < n)
    yield i++;
}

function get_role(role)
{
    let id = "";

    if(role)
    {
        let R =  role.split(/[&>]+/);

        if(R.length >= 2)
        {
            if(R[1])
                
                id = R[1];
        
        }

        return id;
    }
}
function get_emote(emote)
{
    let name = "null", id = "";

    if(emote)
    {
        let E =  emote.split(/[:>]+/);

        if(E.length >= 3)
        {
            if(E[1])
                
                name = E[1];
            
            if(E[2])
            
                id =  E[2]; 
        }

        return [name,id];
    }
}

async function get_users(op,emote,id=null,ls=true)
{
    let ch = await get_channel(op);
    
    let gl = ch.guild;

    let guild = client.guilds.cache.get(gl.id);

    let last;

    
    if (!id)
    {
        let message = await ch.messages.fetch({limit:1})
        
        last = await message.first();
    
    }
    else

        last = await ch.messages.fetch(id)
    
    let emote_name, emote_id;

    [emote_name,emote_id] = get_emote(emote);

    reaction = last.reactions.cache.get(emote_id) //EMOTE[SEM].id

    users = await reaction.users.fetch()

    users = JSON.parse(JSON.stringify(users));

    members = [];
    // e.g. add a role to each user

    await guild.members.cache.each(member => {
        // do stuff with guild members here

        members[member.user.id] = member.nickname;  
      });
    
    console.log(members);
    
    data = {data:[]};
    output = [];

    for await(let i of itr(Object.keys(users).length))
    {
        let id = users[i].id;

        console.log(id);

        let aux = members[id];

        if(aux)
        {
            data.data.push({user_id:id,nick:aux,visits:0,late:0});

            output.push(aux);
        }
            /*for await(let j of itr(members.length))
        {
            if (members[j].id === id && members[j].nickname)
            {
                output.push(members[j].nickname);
                break;
            }
                
            
        }*/
        
    }

    console.log(output)
    /*for await(const user of users)
    {
        nick = await guild.members.fetch(user.id);
        //console.log(nick.nickname)
        members.push(nick.nickname);

          // get the member object as users don't have roles
    //const member = await message.guild.members.fetch(user.id)
    //member.roles.add('ROLE ID')
    }*/

    //return list.format(members);

    if(ls)
    
        output = await list.format(data);
    
    return [output,data];
}

async function get_channel(op)
{
    ch = await client.channels.cache.find(chan => chan.name === op);

    return ch;
}   

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
    
    console.log()

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}

    else if (interaction.commandName === 'users') {

        let op = interaction.options.getString('channel')

        let emote = interaction.options.getString('emote')
		
        let ack = interaction.options.getString('acknowledge')

        let id = interaction.options.getString('msg-id')

        let role = interaction.options.getString('role');

        let ship = interaction.options.getString('ship');

        let output, data;

        [output,data] = await get_users(op,emote,id);

        let E = EMOTE[1].emote;

        if(ack)

            E = ack;

        let m = `\nReact to this message with ${E} once you're done with your visits!\nIf you're not in the list, ping us to add you to late comers`
        
        let R = ROLE[0];

        if(role)

            R = role;

        await interaction.reply(R + '\n' + output + m);

        let rep = await interaction.fetchReply();

        await rep.react(E);        

        let gn = interaction.guild.name;

   
        let path;
        
        
        if(ship)
        {
            path =`PQ${ship}`
        }
        else
        {

            let conf = JSON.parse(fs.readFileSync(`./servers/${gn}/conf.json`,));

            let keys = Object.keys(conf);
    
            let pq = 0;
    
            for(i=0; i < keys.length; i++)
            {
                if(role === conf[keys[i]])
                {
                    pq = i+1;
    
                    break;
                }
            }
            
            if(pq)
            
                path = `PQ${pq}`
            
            else
            
                path = "Unknown";
        }

       
        
        fs.writeFileSync(`./servers/${gn}/${path}/scramblers.json`,JSON.stringify(data))
	}

    else if (interaction.commandName === 'chan') {

        let op = interaction.options.getString('input')

		await interaction.reply(await get_channel(op));
	}

    else if (interaction.commandName === 'emote') {

        let op = interaction.options.getString('emote')
        
        let name,id;

        [name,id] = get_emote(op);

		await interaction.reply(`${op} **Name**: :${name}: **ID**: ${id}`);
	}

    else if (interaction.commandName === 'role') {

        let op = interaction.options.getString('role')
        
        let id;

        id = get_role(op);

		await interaction.reply(`${op} **ID**: ${id}`);
	}

    else if (interaction.commandName === 'members') {

        let op = interaction.options.getString('role')
        
        let id = get_role(op);

        let members = interaction.guild.roles.cache.get(id).members.map(m=>m.user.tag);//guild.roles.cache.get(id);
            /* await guild.members.cache.each(member => {
        // do stuff with guild members here

        members[member.user.id] = member.nickname;  
      }); */
        console.log(members);
        console.log(`Count: ${members.length}`)
        //console.log(members.guild.members)
    

		await interaction.reply('List obtained');
	}
    else if (interaction.commandName === 'rand') {

        let op = interaction.options.getString('channel')

        let emote = interaction.options.getString('emote')

        let size = interaction.options.getString('size')
		
        let id = interaction.options.getString('msg-id')

   
        let output, data;

        [output,data] = await get_users(op,emote,id,false);

        let result = await random.random(data,size)

        result = await list.format(result);

        await interaction.reply(result);

	}


    else if (interaction.commandName === 'del') {

        let chan = interaction.options.getString('chan')
        
        ch = await get_channel(chan);
    
        messages = await ch.messages.fetch({limit:20})
        
        console.log(messages);
        res = false;
        
        messages.each(msg => {

           if(msg.author.id ==='1012189345186324490')
                
                ch.messages.delete(msg.id);


        })
        
        res = true;

		await interaction.reply(`Deletion: ${res}`);
	}
});

client.login(TOKEN);