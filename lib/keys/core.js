const PAD = '-----'

/** @param {string} str */
export const toPEM = (str, type = 'PRIVATE KEY') => key.startsWith(PAD) ? str : `${PAD}BEGIN ${type}${PAD}
${str}
${PAD}END ${type}${PAD}`
