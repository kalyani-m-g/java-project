public class TicTacToe {
    private char[] board;
    private char currentPlayer;

    public TicTacToe() {
        board = new char[9];
        for (int i = 0; i < 9; i++) board[i] = ' ';
        currentPlayer = 'X';
    }

    public boolean makeMove(int index) {
        if (index >= 0 && index < 9 && board[index] == ' ') {
            board[index] = currentPlayer;
            currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
            return true;
        }
        return false;
    }

    public boolean checkWinner() {
        int[][] winPatterns = {
            {0,1,2},{3,4,5},{6,7,8}, // rows
            {0,3,6},{1,4,7},{2,5,8}, // cols
            {0,4,8},{2,4,6}          // diagonals
        };
        for (int[] pattern : winPatterns) {
            if (board[pattern[0]] != ' ' &&
                board[pattern[0]] == board[pattern[1]] &&
                board[pattern[1]] == board[pattern[2]]) {
                return true;
            }
        }
        return false;
    }

    public boolean isDraw() {
        for (char c : board) {
            if (c == ' ') return false;
        }
        return true;
    }

    public void printBoard() {
        System.out.println("---------");
        for (int i = 0; i < 9; i++) {
            System.out.print("|" + board[i]);
            if (i % 3 == 2) {
                System.out.println("|");
                System.out.println("---------");
            }
        }
    }

    public static void main(String[] args) {
        TicTacToe game = new TicTacToe();
        game.printBoard();
        System.out.println("This Java version mirrors the website’s game logic.");
    }
}
