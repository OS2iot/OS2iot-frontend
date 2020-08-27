export class SortTable {

    getSort() {
        return [
            {
                id: 1,
                dir: 'ASC',
                col: 'updatedAt',
                label: 'SORT.UPDATED-ASCENDING',
            },
            {
                id: 2,
                dir: 'DESC',
                col: 'updatedAt',
                label: 'SORT.UPDATED-DESCENDING',
            },
            {
                id: 3,
                dir: 'ASC',
                col: 'createdAt',
                label: 'SORT.CREATED-ASCENDING',
            },
            {
                id: 4,
                dir: 'DESC',
                col: 'createdAt',
                label: 'SORT.CREATED-DESCENDING',
            },
            {
                id: 5,
                dir: 'ASC',
                col: 'name',
                label: 'SORT.NAME-ASCENDING',
            },
            {
                id: 6,
                dir: 'DESC',
                col: 'name',
                label: 'SORT.NAME-DESCENDING',
            },
        ];
    }
         
    
}