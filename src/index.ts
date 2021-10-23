import Carpenter from './carpenter';

export default {
    from: (fromStatement: string) => {
        return new Carpenter(fromStatement);
    } 
}