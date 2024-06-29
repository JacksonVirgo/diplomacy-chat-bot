import { CategoryChannel, ChannelType, Guild, OverwriteResolvable } from 'discord.js';
import { StringSelectMenu } from '../../bot/interactions/selectMenu';
import { ROLES, Role } from '../../utils/data';

const POWERS: Record<string, string> = {
	Austria: '1256359543198187580',
	Turkey: '1256359558972968970',
	England: '1256359550446076007',
	Russia: '1256359556519559179',
	Italy: '1256359555311341628',
	Germany: '1256359553721696316',
	France: '1256359552136384512',
};

export default new StringSelectMenu('create-group-chat')
	.addOptions(
		ROLES.map((pwr) => {
			return {
				label: pwr.name,
				value: pwr.name,
				emoji: pwr.emoji,
			};
		})
	)
	.setMaxValues(7)
	.setMinValues(1)
	.setPlaceholder("Select powers to add to the Group Chat, you don't have to add yourself")
	.run(async (i) => {
		if (!i.guild) return await i.reply({ content: 'Guild not found', ephemeral: true });
		const values = i.values;
		if (values.length == 0) return await i.reply({ content: 'No powers selected', ephemeral: true });
		const list = values.map((pwr) => ROLES.find((role) => role.name == pwr)).filter((pwr): pwr is Role => pwr !== undefined);

		const member = await i.guild?.members.fetch(i.user.id);
		if (!member) return await i.reply({ content: 'An error was found, please contact Mel', ephemeral: true });

		let role: Role | undefined;
		for (const [_, rawRole] of member.roles.cache) {
			if (role) continue;
			role = ROLES.find((pwr) => pwr.name == rawRole.name);
		}

		if (!role) return await i.reply({ content: 'You need to be assigned a power to use this', ephemeral: true });

		let allRoleNames = [...list, role].map((pwr) => pwr.name);
		allRoleNames.filter((item, index) => allRoleNames.indexOf(item) === index);

		const maxChannelNameLength = 32;
		let name = allRoleNames.join('-').toLowerCase();
		if (name.length > maxChannelNameLength)
			name = name
				.split('-')
				.map((part) => part.substring(0, 3))
				.join('-');

		const permissions: OverwriteResolvable[] = [];
		for (const role of allRoleNames) {
			const actualRole = ROLES.find((pwr) => pwr.name == role);
			if (!actualRole) continue;
			permissions.push({
				id: actualRole.roleId,
				allow: ['ViewChannel'],
			});
		}

		const category = await findOrCreateCategory(i.guild);

		const channel = await i.guild.channels.create({
			name: name,
			type: ChannelType.GuildText,
			permissionOverwrites: [
				{
					id: i.guild.roles.everyone,
					deny: ['ViewChannel'],
				},
				...permissions,
			],
			parent: category,
		});

		return await i.reply({ content: `You are ${role.name}\nChannel: <#${channel.id}>`, ephemeral: true });
	});

async function findOrCreateCategory(guild: Guild): Promise<CategoryChannel> {
	let categoryNumber = 0;
	let categoryName = 'chats';

	while (true) {
		if (categoryNumber > 0) {
			categoryName = `chats-${categoryNumber}`;
		}
		let category = guild.channels.cache.find((channel) => channel.type === ChannelType.GuildCategory && channel.name === categoryName) as CategoryChannel;

		if (category) {
			if (category.children.cache.size < 50) {
				return category;
			} else {
				categoryNumber++;
			}
		} else {
			category = await guild.channels.create({
				name: categoryName,
				type: ChannelType.GuildCategory,
			});
			return category;
		}
	}
}
