const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	name: "modnick",
	permissions: ["MANAGE_NICKNAMES", "CHANGE_NICKNAME"],
	data: new SlashCommandBuilder()
		.setName("modnick")
		.setDescription("Moderate a user\'s name")
		.addUserOption((option) => option
			.setName("target")
			.setDescription("The member to change the nickname.")
			.setRequired(true)
		)
		.addStringOption((option) => option
			.setName("reason")
			.setDescription("The reason for changing the nickname of the user.")
		),
	/**
	 * @param {ChatInputCommandInteraction} interaction
	 */
	async execute(interaction, client) {

		// random colors from one dark color palette
		const colors = ['#282C34', '#E06C75', '#98C379', '#E5C07b', '#61AFEF', '#C678DD', '#56B6C2', '#ABB2BF', '#6B859E', '#3890E9', '#A359ED', '#EC5252', '#C97016', '#5DA713', '#13AFAF'];
		const color = Math.floor(Math.random() * colors.length);
		const resColor = colors[color];
		// end of the color randomization

		const { options, guild } = interaction

		const User = options.getUser("target").id;
		const user = guild.members.cache.get(User);
		let reason = options.getString("reason");

		if (!reason) reason = "No reason given.";

		// the function that generates the numbers
		const randomID = length => Math.floor(Math.random() * Math.pow(10, length));
		// replace 3 with how many characters you want
		randomID(3) // return example: 581
		const newnick = randomID(5)

		const embed = new EmbedBuilder()
			.setColor(resColor)
			.setTitle(`Your nickname on \`${interaction.guild.name}\`has been changed!`)
			.setDescription(`It has been change to: \`Moderated Nickname ${newnick}\`.\nBy: ${interaction.member}\nReason: \`\`\`${reason}\`\`\``)
			.setTimestamp()

		user.setNickname("Moderated Nickname " + newnick);
		user.send({
			content: `${user}`,
			embeds: [embed]
		});

		interaction.reply({ content: `NickName of ${User.tag} has been changed to: \`Moderated Nickname ${newnick}\`\nReason: \`\`\`${reason}\`\`\``, ephemeral: true });
	}
}
