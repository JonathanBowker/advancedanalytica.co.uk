const preserveCoreToken = (core: string) => {
  if (!core) return true;
  if (/\d/.test(core)) return true;
  if (/^[A-Z]{2,6}$/.test(core)) return true;
  if (/^[a-z][A-Z]/.test(core)) return true;
  if (/^[A-Z]+[a-z]+[A-Z]/.test(core)) return true;
  return false;
};

const splitToken = (token: string) => {
  const match = token.match(/^([^A-Za-z0-9]*)(.*?)([^A-Za-z0-9]*)$/);
  if (!match) return { prefix: "", core: token, suffix: "" };
  return { prefix: match[1] ?? "", core: match[2] ?? "", suffix: match[3] ?? "" };
};

const capitalizeFirstLetter = (value: string) => {
  const index = value.search(/[A-Za-z]/);
  if (index === -1) return value;
  return `${value.slice(0, index)}${value.charAt(index).toUpperCase()}${value.slice(index + 1)}`;
};

export const toSentenceCaseTitle = (value: string) => {
  if (!value.trim()) return value;

  let firstWordSeen = false;
  let capitalizeNextWord = false;

  return value
    .split(/(\s+)/)
    .map((token) => {
      if (!token.trim()) return token;

      const { prefix, core, suffix } = splitToken(token);
      if (!core) return token;

      let formattedCore = preserveCoreToken(core) ? core : core.toLowerCase();
      if (!firstWordSeen || capitalizeNextWord) {
        formattedCore = preserveCoreToken(formattedCore)
          ? capitalizeFirstLetter(formattedCore)
          : capitalizeFirstLetter(formattedCore.toLowerCase());
        firstWordSeen = true;
        capitalizeNextWord = false;
      }

      if (suffix.includes(":") || suffix.includes(".")) capitalizeNextWord = true;

      return `${prefix}${formattedCore}${suffix}`;
    })
    .join("");
};
