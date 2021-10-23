const buildRaw = (rawStatements: string[]) => {
  return rawStatements.length > 0 ? rawStatements.join(" ") : undefined;
};

export default buildRaw;
