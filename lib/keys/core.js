const PAD = '-----'

/** @param {string} str */
export const toPEM = (str, type = 'PRIVATE KEY') => str.startsWith(PAD) ? str : `${PAD}BEGIN ${type}${PAD}
${str}
${PAD}END ${type}${PAD}`
