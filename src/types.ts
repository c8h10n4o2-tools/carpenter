export type JoinType = "INNER" | "LEFT" | "RIGHT" | "FULL" | "OUTER";

export interface WhereStatement {
  type: "OR" | "AND";
  statement: string;
}

export interface JoinStatement {
    type: "INNER" | "OUTER" | "LEFT" | "RIGHT" | "FULL",
    statement: string;
}