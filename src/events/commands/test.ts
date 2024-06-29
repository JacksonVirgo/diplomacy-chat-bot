import { ActionRowBuilder, ChannelType, EmbedBuilder, StringSelectMenuBuilder } from 'discord.js';
import { SlashCommand } from '../../bot/interactions/slashCommand';
import { client } from '../../bot/client';
import createGroupChat from '../selectMenus/createGroupChat';

export default new SlashCommand('test').setDescription('test command').run(async (i) => {
	const guildId = i.guildId;
	if (!guildId) return await i.reply({ content: 'Command can only be used in a server', ephemeral: true });
	const guild = client.guilds.cache.get(guildId);
	if (!guild) return await i.reply({ content: 'Bot is not in this server', ephemeral: true });

	const channel = i.channel;
	if (!channel) return await i.reply({ content: 'Command can only be used in a channel', ephemeral: true });
	if (channel.type != ChannelType.GuildText) return await i.reply({ content: 'Command can only be used in a text channel', ephemeral: true });

	await i.reply({ content: 'Pong', ephemeral: true });

	const embed = new EmbedBuilder();
	embed.setColor('White');
	embed.setTitle('Create Group Chats');
	embed.setDescription('Use this menu to create group chats with other powers.\nYou do not need to add your own power, but feel free to');

	const row = new ActionRowBuilder<StringSelectMenuBuilder>();
	row.addComponents(createGroupChat);
	await channel.send({ embeds: [embed], components: [row] });
});
