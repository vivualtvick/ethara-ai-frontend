
export function totalPagesCount(totalItems: number, itemsPerPage: number): number {
    return Math.ceil(totalItems / itemsPerPage) === 0 ? 1 : Math.ceil(totalItems / itemsPerPage);    
}   