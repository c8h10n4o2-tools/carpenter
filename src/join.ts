import { SQL } from "./constants";
import { JoinStatement } from "./types";

const buildJoin = (joinStatements: JoinStatement[]) => {
  return joinStatements.length > 0 ? 
    joinStatements
        .map(({ type, statement }) => `${type} ${SQL.JOIN} ${statement}`)
        .join(" ") 
    : undefined;
};

export default buildJoin;
