const { REST, Routes } = require('discord.js');

const fs = require('fs');

text = fs.readFileSync("./t.json");

data = JSON.parse(text);

const TOKEN = data.token;

const CLIENT_ID = data.id;

const commands = [
	{
		name: 'ping',
		description: 'Replies with Pong!',
	},
    {
		name: 'users',
		description: 'Replies with Pong!',
        options: [
            {
                required: true,
                type: 3,
                name: 'input',
                description: 'chan'
            }
        ]
	},
    {
		name: 'chan',
		description: 'Replies with Pong!',
        options: [
            {
                required: true,
                type: 3,
                name: 'input',
                description: 'chan'
            }
        ]
	},
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
