import { RoleSelectMenuBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction } from 'discord.js';
import { CUSTOM_ID_SEPARATOR } from '../interactionHandler';

export type StringSelectMenuRunFunc = (interaction: StringSelectMenuInteraction) => Promise<any>;

export class StringSelectMenu extends StringSelectMenuBuilder {
	public static selectMenus = new Map<string, StringSelectMenu>();
	private customId: string;
	private onRun: StringSelectMenuRunFunc | undefined;

	constructor(customId: string) {
		if (customId.includes(CUSTOM_ID_SEPARATOR)) throw new Error(`Custom ID ${customId} cannot contain the character: "${CUSTOM_ID_SEPARATOR}"`);
		if (StringSelectMenu.selectMenus.has(customId)) throw new Error(`String select menu ${customId} has a duplicate name`);

		super();
		this.customId = customId;
		this.setCustomId(this.customId);
		StringSelectMenu.selectMenus.set(customId, this);
	}

	public getCustomID() {
		return this.customId;
	}

	public hydrateCustomID(data: string | undefined) {
		if (!data) return this.getCustomID();
		return this.customId + CUSTOM_ID_SEPARATOR + data;
	}

	public run(onRun: StringSelectMenuRunFunc) {
		this.onRun = onRun;
		return this;
	}

	public getRunFunc() {
		return this.onRun;
	}

	public async custom(func: (cmd: StringSelectMenu) => Promise<any>) {
		await func(this);
		return this;
	}
}
