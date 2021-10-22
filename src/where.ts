import { SQL } from "./constants";
import { WhereStatement } from "./types";

const buildWhere = (
    whereStatements: WhereStatement[]
) => {

    if(whereStatements.length === 0) {
        return;
    }

    return [
        SQL.WHERE,
        whereStatements[0].statement,
        whereStatements.slice(1).map(({ statement, type}) => {
            return [
                type,
                statement
            ]
        })
    ]
    .flat(2)
    .join(' ');
}

export default buildWhere;