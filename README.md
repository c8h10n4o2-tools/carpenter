# Carpenter :wood:

Carpenter is a simple, light weight library with no dependencies with the goal to build *somewhat* complex SQL string queries.

This library are for those that like writing pure SQL but are looking for that library to help them build their SQL string query in any order.

## Installation

```
yarn add @yoteetools/carpenter
npm install --save @yoteetools/carpenter
```

## Usage

Everything starts with `from`.

```javascript
import $ from '@yoteetools/carpenter';

const sql = $
    .from('table1')
    .where('id = 1')
    .select('*')
    .toString();

console.log(sql); // SELECT * FROM table1 WHERE id = 1
```

See `__tests__` for more examples.