const Discord = require('discord.js');
const client = new Discord.Client();

//if message was a valid diceroll
function validDiceRoll(diceRoll) {
	if(diceRoll.diceAmount.isNaN || diceRoll.diceSides.isNaN)
		return false
	if(diceRoll.diceAmount < 1 || diceRoll.diceSides < 1)
		return false
	return true
}

client.on('message', msg => {
	//if message is from self, prevents infinite loop
	if (msg.author.bot) return;
	const content = msg.content.toLowerCase()
	//if message contains any letter other than d or number, return
	if(/[^d0-9]+/.test(content)) return
	const channel = client.channels.cache.get(msg.channel.id)
	const dLocation = content.search('d')
	const diceRoll = {
		diceAmount: content.slice(0, dLocation),
		diceSides: content.slice(dLocation + 1, content.length)
	}

	if(validDiceRoll(diceRoll)){
		let results = []
		let total = 0
		let returnMessage = '\`\`\`\n'
		for(let i = 0; i < diceRoll.diceAmount; i++){
			results[i] = Math.floor(Math.random() * diceRoll.diceSides) + 1
			total += results[i]
			returnMessage += `${results[i]}\n`
		}
		if(diceRoll.diceAmount > 1)
			returnMessage += `-\n${total}\n`
		returnMessage += '\`\`\`'


		if(returnMessage.length >= 2000 || diceRoll.diceAmount > 100)
			channel.send('That\'s a bit aggressive...')
		else
			channel.send(returnMessage)
	}
});

client.login(process.env.token);