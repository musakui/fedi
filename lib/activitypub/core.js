/**
 * @param {string} name
 * @param {string} value
 * @return {import('./types').PropertyValue}
 */
export const definePropertyValue = (name, value) => ({
	type: 'PropertyValue',
	name,
	value,
})
