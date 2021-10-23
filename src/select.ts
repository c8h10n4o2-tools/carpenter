const buildSelect = (selectStatements: string[]) => {
    return selectStatements.length > 0 ? selectStatements.join(',') : undefined;
}

export default buildSelect;