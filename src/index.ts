import Carpenter from './carpenter';

export default {
    select: (selectStatement: string) => ({
        from: (fromStatement: string) => {
            return new Carpenter(selectStatement, fromStatement);
        } 
    })
}