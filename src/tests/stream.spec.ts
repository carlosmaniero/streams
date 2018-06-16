import { stream } from "../stream";

describe('stream', () => {
    it('return the given list when collect', () => {
        expect(stream([1, 2, 3, 4, 5]).collect()).toEqual([1, 2, 3, 4, 5]);
    });
});