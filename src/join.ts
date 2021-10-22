const buildJoin = (joinStatements: string[]) => {
    return joinStatements.length > 0 ? joinStatements.join(' ') : undefined;
}

export default buildJoin;