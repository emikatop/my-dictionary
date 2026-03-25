// sql clauses
const sqlClauses = {
select: "SELECT",
update: "UPDATE",
delete: "DELETE",
insertInto: "INSERT INTO",
createDatabase: "CREATE DATABASE",
alterTable: "ALTER TABLE",
dropTable: "DROP TABLE",
createIndex: "CREATE INDEX",
dropIndex: "DROP INDEX"
};

// sql clauses in order
const orderedSQL = {
    columnsToDisplay: "SELECT",
    tablesToPullFrom: "FROM",
    filterRows: "WHERE",

    splitRowsInGroups: "GROUP BY", 
    filterGroupedRows: "HAVING", 

    columnsToSort: "ORDER BY"
};