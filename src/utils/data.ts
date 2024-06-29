export type Role = {
	name: string;
	roleId: string;
	emoji: {
		name: string;
		id: string;
	};
};

export const ROLES: Role[] = [
	{
		name: 'Italy',
		roleId: '1256115796162248704',
		emoji: {
			name: 'italy',
			id: '1256359555311341628',
		},
	},
	{
		name: 'Russia',
		roleId: '1256115864739254394',
		emoji: {
			name: 'russia',
			id: '1256359556519559179',
		},
	},
	{
		name: 'Turkey',
		roleId: '1256115988311838781',
		emoji: {
			name: 'turkey',
			id: '1256359558972968970',
		},
	},
	{
		name: 'Austria',
		roleId: '1256115837115306025',
		emoji: {
			name: 'austria',
			id: '1256359543198187580',
		},
	},
	{
		name: 'England',
		roleId: '1256115913476804698',
		emoji: {
			name: 'england',
			id: '1256359550446076007',
		},
	},
	{
		name: 'France',
		roleId: '1256115891394052106',
		emoji: {
			name: 'france',
			id: '1256359552136384512',
		},
	},
	{
		name: 'Germany',
		roleId: '1256115948742512810',
		emoji: {
			name: 'germany',
			id: '1256359553721696316',
		},
	},
];
