export const capitalize = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncate = (str: string, maxLength: number) => {
	if (str.length <= maxLength) return str;
	return str.slice(0, maxLength) + '...';
};

export const titleCase = (str: string) => {
	return str.replace(/\b\w/g, (char) => char.toUpperCase());
};
