import { stream, Stream } from "../stream";

describe('.filter', () => {
    it('filters the given content', () => {
        const filteredStream: Stream<number> = stream([1, 2, 3, 4, 5])
            .filter(x => x % 2 == 0);
        expect(filteredStream.collect()).toEqual([2, 4]);
    });

    it('filters the given content twice', () => {
        const filteredStream: Stream<number> = stream([1, 2, 3, 4, 5])
            .filter(x => x % 2 == 0)
            .filter(x => x > 2);
        expect(filteredStream.collect()).toEqual([4]);
    });
})