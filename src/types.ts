export type JoinType = "INNER" | "LEFT" | "RIGHT" | "FULL" | "OUTER";

export interface WhereStatement {
  type: "OR" | "AND";
  statement: string;
}
