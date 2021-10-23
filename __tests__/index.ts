import carpenter from '../src/';

describe('Carpenter', () => {
    it('should generate a simple SELECT query', () => {
        const sql = carpenter
        .from('table1')
        .select('*');

        expect(sql.toString()).toEqual('SELECT * FROM table1');
    });

    it('should generate a query with a WHERE condition', () => {
        const sql = carpenter
            .from('table1')
            .where('id = 1')
            .select('*');

        expect(sql.toString()).toEqual('SELECT * FROM table1 WHERE id = 1');
    });

    it('should generate a query with a JOIN statement', () => {
        const sql = carpenter
            .from('table1')
            .select('*')
            .innerJoin('table2 ON table1.id = table2.table1_id');

        expect(sql.toString()).toEqual('SELECT * FROM table1 INNER JOIN table2 ON table1.id = table2.table1_id');
    });

    it('should generate a query with a WHERE and JOIN statement', () => {
        const sql = carpenter
            .from('table1')
            .select('*')
            .innerJoin('table2 ON table1.id = table2.table1_id')
            .where('id = 1');

        expect(sql.toString()).toEqual('SELECT * FROM table1 INNER JOIN table2 ON table1.id = table2.table1_id WHERE id = 1');
    });

    it('should generate a query in the proper order with multiple WHERE and JOIN statement in awakward orders', () => {
        const sql = carpenter
            .from('table1')
            .select('*')
            .innerJoin('table2 ON table1.id = table2.table1_id')
            .where(`table2.name IN ('test')`)
            .innerJoin('table3 ON table2.id = table3.table2_id')
            .where(`table3.name IN ('test')`);
        expect(sql.toString()).toEqual(`SELECT * FROM table1 INNER JOIN table2 ON table1.id = table2.table1_id INNER JOIN table3 ON table2.id = table3.table2_id WHERE table2.name IN ('test') AND table3.name IN ('test')`);
    });

    it('should generate a query with multiple where statements that maintain the order as used', () => {
        const sql = carpenter
            .from('table1')
            .select('*')
            .orWhere('id = 1')
            .where('id = 2')
            .orWhere('id = 3')
            .where('id = 4');

        expect(sql.toString()).toEqual(`SELECT * FROM table1 WHERE id = 1 AND id = 2 OR id = 3 AND id = 4`);
    });

    it('should not include OR if there is only one WHERE statement', () => {
        const sql = carpenter
        .from('table1')
        .select('*')
        .orWhere('id = 1');

        expect(sql.toString()).toEqual('SELECT * FROM table1 WHERE id = 1');
    });

    it('should generate an SQL query with raw statements at the end', () => {
        const sql = carpenter
            .from('table1')
            .select('*')
            .where('id = 1')
            .raw('ORDER BY created_at');

        expect(sql.toString()).toEqual('SELECT * FROM table1 WHERE id = 1 ORDER BY created_at');
    });

    describe('joins', () => {
        const cases = [
            ['innerJoin', 'INNER JOIN'],
            ['outerJoin', 'OUTER JOIN'],
            ['leftJoin', 'LEFT JOIN'],
            ['rightJoin', 'RIGHT JOIN'],
            ['fullJoin', 'FULL JOIN']
        ];

        test.each(cases)("given method '%s' it should return SQL query that includes '%s'", (methodName, expected) => {
            // @ts-ignore : throws an error when it tries to index the method name on the carpenter object
            const sql = carpenter
                .from('table1')
                .select('*')
                [methodName]('table2 ON table1.id = table2.table1_id');

                expect(sql.toString()).toEqual(`SELECT * FROM table1 ${expected} table2 ON table1.id = table2.table1_id`);
        });
    });
});