export function parseKi(kiStr: string): number {
	if (!kiStr) return 0
	const lower = kiStr.replace(/,/g, '').toLowerCase()
	const map: Record<string, number> = {
		thousand: 1e3,
		million: 1e6,
		billion: 1e9,
		trillion: 1e12,
		quadrillion: 1e15,
		quintillion: 1e18,
		sextillion: 1e21,
		septillion: 1e24,
	}
	const [value, suffix] = lower.split(' ')
	return suffix ? parseFloat(value) * (map[suffix] || 1) : parseFloat(value)
}

export function compareKi(kiA: string, kiB: string): number {
	const a = parseKi(kiA)
	const b = parseKi(kiB)
	if (a > b) return 1
	if (a < b) return -1
	return 0
}
