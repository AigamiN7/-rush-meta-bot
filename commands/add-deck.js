const {
    SlashCommandBuilder
} = require('discord.js');
const { fetchLegends } = require('../api/legends');

const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: process.env.AWS_REGION });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-deck')
        .setDescription('Adds a winning decklist to the database')
        .addStringOption(option =>
            option.setName('url')
            .setDescription('The Twitter URL for the Decklist')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('first_legend')
            .setDescription('the first legend featured in the deck')
            .setRequired(false)
			.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('second_legend')
			.setDescription('the second legend featured in the deck')
			.setRequired(false)
			.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('third_legend')
			.setDescription('the third legend featured in the deck')
			.setRequired(false)
			.setAutocomplete(true)),

    async execute(interaction) {
		let channelName = interaction.member.guild.channels.cache.find(c => c.id === interaction.channelId).name

		const url = interaction.options.getString('url') 
		const first_legend = interaction.options.getString('first_legend') && interaction.options.getString('first_legend').split(' ') || []
		const second_legend = interaction.options.getString('second_legend') && interaction.options.getString('second_legend').split(' ') || []
		const third_legend = interaction.options.getString('third_legend') && interaction.options.getString('third_legend').split(' ') || []

		const legends = await fetchLegends()
		
		let final_first = [...legends]
		let final_second = [...legends]
		let final_third = [...legends]


		for (let substr of first_legend) {
			final_first = [...final_first.filter(o => o.toLowerCase().includes(substr.toLowerCase()))]
		}

		for (let substr of second_legend) {
			final_second = [...final_second.filter(o => o.toLowerCase().includes(substr.toLowerCase()))]
		}

		for (let substr of third_legend) {
			final_third = [...final_third.filter(o => o.toLowerCase().includes(substr.toLowerCase()))]
		}

		var params = {
			TableName: 'rush-meta',
			Item: {
			  'FIRST_LEGEND' : {S: final_first.length !== legends.length ? final_first[0] : 'undefined'},
			  'SECOND_LEGEND': {S: final_second.length !== legends.length ? final_second[0] : 'undefined'},
			  'THIRD_LEGEND': {S: final_third.length !== legends.length ? final_third[0] : 'undefined'},
			  'URL': {S: url || 'undefined'},
			  'CREATED_AT': {S: `${new Date(Date.now())}`},
			  'DECK_TYPE': {S: channelName || 'undefined'},
			  'aigami': {S: `${new Date(Date.now())}`}
			}
		};
		  
		ddb.putItem(params, function(err, data) {
		if (err) {
			console.log("Error", err);
		} else {
			console.log("Success", data);
		}
		});


        await interaction.reply(`
${url} Added to the database 😈
`);
    },
};