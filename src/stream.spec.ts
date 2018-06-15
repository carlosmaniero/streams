import { stream } from "./stream";

describe('stream', () => {
    it('access a stream by index', () => {
        expect(new stream([1, 2, 3, 4, 5])[2]).toEqual(3);
    });

    it('is comparable with a list', () => {
        expect(new stream([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });
});