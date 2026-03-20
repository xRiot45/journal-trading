export function toMinutes(time: string): number {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
}

export function isOverlap(start1: number, end1: number, start2: number, end2: number): boolean {
    if (start1 < end1 && start2 < end2) {
        return start1 < end2 && start2 < end1;
    }

    const range1 =
        start1 < end1
            ? [[start1, end1]]
            : [
                  [start1, 1440],
                  [0, end1],
              ];
    const range2 =
        start2 < end2
            ? [[start2, end2]]
            : [
                  [start2, 1440],
                  [0, end2],
              ];

    return range1.some(([s1, e1]) => range2.some(([s2, e2]) => s1 < e2 && s2 < e1));
}
