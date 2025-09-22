// File: TicTacToe.java
import java.util.Scanner;

public class TicTacToe {
    private static final char[] board = {'1', '2', '3', '4', '5', '6', '7', '8', '9'};
    private static char currentPlayer = 'X';
    private static boolean gameOver = false;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (!gameOver) {
            printBoard();
            System.out.println("Player " + currentPlayer + ", enter a position (1-9): ");
            int position = scanner.nextInt();
            if (position < 1 || position > 9 || board[position - 1] == 'X' || board[position - 1] == 'O') {
                System.out.println("Invalid move. Try again.");
                continue;
            }
            board[position - 1] = currentPlayer;
            if (checkWinner(currentPlayer)) {
                printBoard();
                System.out.println("Player " + currentPlayer + " wins!");
                gameOver = true;
            } else if (isBoardFull()) {
                printBoard();
                System.out.println("It's a tie!");
                gameOver = true;
            } else {
                currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
            }
        }
        scanner.close();
    }

    private static void printBoard() {
        System.out.println("-------------");
        for (int i = 0; i < 3; i++) {
            System.out.print("| " + board[i * 3] + " | " + board[i * 3 + 1] + " | " + board[i * 3 + 2] + " |");
            System.out.println("\n-------------");
        }
    }

    private static boolean checkWinner(char player) {
        int[][] winPatterns = {
            {0, 1, 2}, {3, 4, 5}, {6, 7, 8}, // rows
            {0, 3, 6}, {1, 4, 7}, {2, 5, 8}, // columns
            {0, 4, 8}, {2, 4, 6}             // diagonals
        };
        for (int[] pattern : winPatterns) {
            if (board[pattern[0]] == player && board[pattern[1]] == player && board[pattern[2]] == player) {
                return true;
            }
        }
        return false;
    }

    private static boolean isBoardFull() {
        for (char cell : board) {
            if (cell != 'X' && cell != 'O') {
                return false;
            }
        }
        return true;
    }
}
