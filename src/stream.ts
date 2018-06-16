type FilterPredicate<GivenType> = (item: GivenType, index?: number, list?: GivenType[]) => boolean;
type MapPredicate<GivenType, ResultType> = (item: GivenType, index?: number, list?: GivenType[]) => ResultType;

type StreamApplyer<GivenType> = (item: GivenType) => void;

type StreamOperation<GivenType, ResultType> =
    (nextOperation: (result: ResultType) => void) => StreamApplyer<GivenType>;

export class Stream<GivenType, ResultType=GivenType> {
    private readonly list: Array<GivenType>;
    private readonly operation: StreamOperation<GivenType, ResultType>;

    constructor(list: Array<GivenType>, operation: StreamOperation<GivenType, ResultType>) {
        this.list = list;
        this.operation = operation;
    }

    public filter(predicate: FilterPredicate<ResultType>): Stream<GivenType, ResultType> {
        const operation: StreamOperation<GivenType, ResultType> = 
            (nextOperation) => 
                this.operation((item: ResultType) => {
                    if (predicate(item)) {
                        nextOperation(item);
                    }
                });

        return new Stream(this.list, operation);
    }

    public map<NewResultType>(predicate: MapPredicate<ResultType, NewResultType>): Stream<GivenType, NewResultType> {
        const operation: StreamOperation<GivenType, NewResultType> = 
            (nextOperation) =>
                this.operation((item: ResultType) => {
                    nextOperation(predicate(item));
                });

        return new Stream(this.list, operation);
    }

    public collect(): Array<ResultType> {
        const newList: Array<ResultType> = [];
        this.list.forEach((item: GivenType) =>
            this.operation((newItem: ResultType) => newList.push(newItem))(item));
        return newList;
    }
}

export const stream: <GivenType>(list: Array<GivenType>) => Stream<GivenType, GivenType> = 
    <GivenType>(list: Array<GivenType>) => 
        new Stream<GivenType>(list, (nextOperation: StreamApplyer<GivenType>) => (item: GivenType) => nextOperation(item));
