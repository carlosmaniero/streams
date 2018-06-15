export class stream<T> extends Array<T> {
    private readonly list: T[];

    constructor(list: Array<T>) {
        super(...list);
    }
}