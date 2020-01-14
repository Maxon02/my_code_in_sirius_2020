class GameOfLife {
    constructor(num_of_rows, num_of_columns) {
        this.num_rows = num_of_rows;
        this.num_columns = num_of_columns;
        this.field = new Array(num_of_rows);
        for (let row_id = 0; row_id < num_of_rows; ++row_id) {
            let row = new Array(num_of_columns);
            row.fill(false);
            this.field[row_id] = row;
        }
    }
 
    initializeBlinker() {
        this.field[3][4] = true;
        this.field[4][4] = true;
        this.field[5][4] = true;
    }
 
    initializeGlider() {
        this.field[3][4] = true;
        this.field[4][5] = true;
        this.field[5][3] = true;
        this.field[5][4] = true;
        this.field[5][5] = true;
    }
    isAlive(row_id, column_id){
        return this.field[row_id][column_id] == 1;
    }
 
    // Put your code here!
    doStep(num_of_rows, num_of_columns) {
        this.new_field = new Array(num_of_rows);
        for (let row_id = 0; row_id < num_of_rows; row_id++) {
            let row = new Array(num_of_columns);
            row.fill(false);
            this.new_field[row_id] = row;
        }
        for(let i = 0; i < num_of_rows; i++){
            for(let j = 0; j < num_of_columns; j++){
                let cnt = 0;
                let add_row = [-1, -1, 0, 1, 1, 1, 0, -1];
                let add_col = [0, 1, 1, 1, 0, -1, -1, -1];
                for(let it = 0; it < 8; it++){
                    let new_row = (i + add_row[it] + num_of_rows) % num_of_rows;
                    let new_col = (j + add_col[it] + num_of_columns) % num_of_columns;
                    if(this.field[new_row][new_col])
                        cnt++;
                }
                this.new_field[i][j] = this.field[i][j];
                if(this.field[i][j] == 0 && cnt == 3)
                    this.new_field[i][j] = 1;
                if(this.field[i][j] == 1 && (cnt != 2 && cnt != 3))
                    this.new_field[i][j] = 0;
            }
        }
        this.field = this.new_field;
    }

    
}