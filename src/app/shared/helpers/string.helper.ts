/**
 * @see https://stackoverflow.com/a/63116134
 */
export const toKebabCase = (str: string) => {
    return str
        .split("")
        .map((letter, idx) => {
            return letter.toUpperCase() === letter ? `${idx !== 0 ? "-" : ""}${letter.toLowerCase()}` : letter;
        })
        .join("");
};

export const toPascalKebabCase = (str: string) => toKebabCase(str).toUpperCase();
