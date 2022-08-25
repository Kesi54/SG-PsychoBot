/*============================================================================*/

const list = require('./sort.js');

const { Client, IntentsBitField /*GatewayIntentBits, GuildMember*/ } = require('discord.js');

const myIntents = new IntentsBitField();
myIntents.add(IntentsBitField.Flags.GuildPresences, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.Guilds);

const client = new Client({ intents: myIntents });

//const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers] });

const fs = require('fs');

text = fs.readFileSync("./t.json");

data = JSON.parse(text);

const TOKEN = data.token;

const CLIENT_ID = data.id;

const EMOTE = ['889605404789727272','🍔'];

const ID = '1011312526883049472';

async function* itr(n)
{
  let i = 0;

  while(i < n)
    yield i++;
}

async function get_users(op)
{
    ch = await get_channel(op);
    gl = ch.guild;

    guild = client.guilds.cache.get(gl.id);

    //message = await ch.messages.fetch({limit:1})
    //last = await message.first();
    
    last = await ch.messages.fetch(ID)
    reaction = last.reactions.cache.get(EMOTE[0])

    users = await reaction.users.fetch()

    users = JSON.parse(JSON.stringify(users));

    members = [];
    // e.g. add a role to each user

    guild.members.cache.each(member => {
        // do stuff with guild members here

        members.push({id: member.user.id, nickname: member.nickname })
      });
    
    output = [];

    for await(let i of itr(Object.keys(users).length))
    {
        let id = users[i].id;

        for await(let j of itr(members.length))
        {
            if (members[j].id === id && members[j].nickname)
            {
                output.push(members[j].nickname);
                break;
            }
                
            
        }
        
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

    return list.format(output);
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

        let op = interaction.options.getString('input')
		
        await interaction.reply(await get_users(op));
	}

    else if (interaction.commandName === 'chan') {

        let op = interaction.options.getString('input')

		await interaction.reply(await get_channel(op));
	}
});

client.login(TOKEN);