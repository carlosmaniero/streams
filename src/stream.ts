type FilterPredicate<GivenType> = (item: GivenType, index?: number, list?: GivenType[]) => boolean;
type MapPredicate<GivenType, ResultType> = (item: GivenType, index?: number, list?: GivenType[]) => ResultType;

type StreamApplyer<GivenType> = (item: GivenType, index: number) => void;

type StreamOperation<GivenType, ResultType> =
    (nextOperation: (result: ResultType, index: number) => void) => StreamApplyer<GivenType>;

export class Stream<GivenType, ResultType=GivenType> {
    private readonly list: Array<GivenType>;
    private readonly operation: StreamOperation<GivenType, ResultType>;

    constructor(list: Array<GivenType>, operation: StreamOperation<GivenType, ResultType>) {
        this.list = list;
        this.operation = operation;
    }

    public filter(predicate: FilterPredicate<ResultType>): Stream<GivenType, ResultType> {
        const operation: StreamOperation<GivenType, ResultType> = 
            (nextOperation): StreamApplyer<GivenType> => 
                this.operation((item: ResultType, index: number) => {
                    if (predicate(item, index)) {
                        nextOperation(item, index);
                    }
                });

        return new Stream(this.list, operation);
    }

    public map<NewResultType>(predicate: MapPredicate<ResultType, NewResultType>): Stream<GivenType, NewResultType> {
        const operation: StreamOperation<GivenType, NewResultType> = 
            (nextOperation): StreamApplyer<GivenType> =>
                this.operation((item: ResultType, index: number) => {
                    nextOperation(predicate(item, index), index);
                });

        return new Stream(this.list, operation);
    }

    public collect(): Array<ResultType> {
        const newList: Array<ResultType> = [];
        const applyer = this.operation((newItem: ResultType, index: number) => newList.push(newItem));

        for (let index = 0; index < this.list.length; index++) {
            applyer(this.list[index], index);
        }

        return newList;
    }
}

export const stream: <GivenType>(list: Array<GivenType>) => Stream<GivenType, GivenType> =
    <GivenType>(list: Array<GivenType>) => 
        new Stream<GivenType>(list, (nextOperation: StreamApplyer<GivenType>) =>
            (item: GivenType, index: number) => nextOperation(item, index));
