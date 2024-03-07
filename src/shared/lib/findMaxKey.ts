export function findKeyWithMaxValue(obj: { [key: string]: number }): string {
	let maxKey: string = '';
	let maxValue: number = Number.NEGATIVE_INFINITY;

	for (const key in obj) {
		if (obj[key] > maxValue) {
			maxValue = obj[key];
			maxKey = key;
		}
	}

	return maxKey;
}
