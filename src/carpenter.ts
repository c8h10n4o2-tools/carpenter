import { SQL } from "./constants";
import buildJoin from "./join";
import buildRaw from "./raw";
import buildSelect from "./select";
import { JoinType, WhereStatement } from "./types";
import buildWhere from "./where";

class Carpenter {

    private joinStatements: string[];
    private whereStatements: WhereStatement[];
    private rawStatements: string[];
    private selectStatements: string[];

    constructor(
        private fromStatement: string
    ){
        this.joinStatements = [];
        this.whereStatements = [];
        this.rawStatements = [];
        this.selectStatements = [];
    }

    /**
     * Method that meorizes a SELECT statement.
     * Method can be called multiple times and the
     * select statements will be joined by a ','
     */
    select(selectStatement: string) {
        this.selectStatements.push(selectStatement);
        return this;
    }

    /**
     * Method that memorizes the WHERE statement
     * n+1 WHERE statements will be prefixed
     * with 'AND'
     */
    where(whereStatement: string) {
        this.whereStatements.push({
            statement: whereStatement,
            type: SQL.AND
        });
        return this;
    }

    /**
     * Method that memroizes an OR statement.
     * If there are only OR statements, the first
     * statement will be prefixed by 'WHERE' while the
     * rest will be prefixed by 'OR'.
     */
    orWhere(orWhereStatement: string) {
        this.whereStatements.push({
            statement: orWhereStatement,
            type: SQL.OR
        });
        return this;
    }

    private join(joinType: JoinType, joinStatement: string) {
        this.joinStatements.push(
            joinType,
            SQL.JOIN,
            joinStatement
        )
    }

    innerJoin(joinStatement: string) {
        this.join(SQL.INNER, joinStatement);
        return this;
    }

    leftJoin(joinStatement: string) {
        this.join(SQL.LEFT, joinStatement);
        return this;
    }

    rightJoin(joinStatement: string) {
        this.join(SQL.RIGHT, joinStatement);
        return this;
    }

    fullJoin(joinStatement: string) {
        this.join(SQL.FULL, joinStatement);
        return this;
    }

    outerJoin(joinStatement: string) {
        this.join(SQL.OUTER, joinStatement);
        return this;
    }

    /**
     * Method that memorizes a raw SQL statement.
     * These will always be placed at the end of the
     * SQL query
     */
    raw(statement: string) {
        this.rawStatements.push(statement);
        return this;
    }

    toString() {
        return [
            SQL.SELECT, 
            buildSelect(this.selectStatements), 
            SQL.FROM, 
            this.fromStatement,
            buildJoin(this.joinStatements),
            buildWhere(this.whereStatements),
            buildRaw(this.rawStatements)
        ]
        .filter(row => row !== undefined)
        .join(' ')
    }
}

export default Carpenter;