/**
 * Generate semua tanggal dalam satu bulan dalam format YYYY-MM-DD
 */
export function generateDaysInMonth(year: number, month: number): string[] {
    const daysInMonth = new Date(year, month, 0).getDate(); // month tidak di-minus karena Date(year, month, 0) = hari terakhir bulan sebelumnya dari month+1
    const days: string[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
        const paddedMonth = String(month).padStart(2, '0');
        const paddedDay = String(day).padStart(2, '0');
        days.push(`${year}-${paddedMonth}-${paddedDay}`);
    }

    return days;
}

/**
 * Tentukan status hari berdasarkan totalPnL
 */
export function resolveDayStatus(totalPnL: number): 'profit' | 'loss' | 'neutral' {
    if (totalPnL > 0) return 'profit';
    if (totalPnL < 0) return 'loss';
    return 'neutral';
}

/**
 * Format angka float menjadi 2 decimal places
 */
export function roundToTwo(value: number): number {
    return Math.round(value * 100) / 100;
}
