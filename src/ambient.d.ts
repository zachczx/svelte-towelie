interface TowelDb {
	id: uuid;
	userId: string;
	cleaned: boolean;
	createdAt: string;
	updatedAt: string | null;
}

interface TowelProps extends TowelDb {
	createdAtFormatted: string;
	createdAtSemantic: string;
}
