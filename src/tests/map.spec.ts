import { stream, Stream } from "../stream";

describe('.map', () => {
    it('maps the given list', () => {
        const filteredStream: Stream<number, string> = stream([1, 2, 3])
            .map(x => x.toString());
        expect(filteredStream.collect()).toEqual(["1", "2", "3"]);
    });

    it('filters the given content twice', () => {
        const filteredStream: Stream<number> = stream([1, 2, 3, 4, 5])
            .map(x => x.toString())
            .map(parseInt);
        expect(filteredStream.collect()).toEqual([1, 2, 3, 4, 5]);
    });
})