package com.example.dotsandboxes;

public class DotsAndBoxes {
    private int rows, cols;
    private int[][] hLines, vLines, boxes;
    private int currentPlayer;

    public DotsAndBoxes(int rows, int cols) {
        this.rows = rows;
        this.cols = cols;
        this.hLines = new int[rows + 1][cols];
        this.vLines = new int[rows][cols + 1];
        this.boxes = new int[rows][cols];
        this.currentPlayer = 1;
    }

    public boolean drawLine(String type, int row, int col) {
        if (type.equals("h")) {
            if (hLines[row][col] != 0) return false;
            hLines[row][col] = currentPlayer;
        } else {
            if (vLines[row][col] != 0) return false;
            vLines[row][col] = currentPlayer;
        }

        boolean boxCompleted = updateBoxes();
        if (!boxCompleted) switchPlayer();

        return true;
    }

    private boolean updateBoxes() {
        boolean completed = false;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (boxes[i][j] == 0 &&
                    hLines[i][j] != 0 &&
                    hLines[i + 1][j] != 0 &&
                    vLines[i][j] != 0 &&
                    vLines[i][j + 1] != 0) {

                    boxes[i][j] = currentPlayer;
                    completed = true;
                }
            }
        }
        return completed;
    }

    private void switchPlayer() {
        currentPlayer = (currentPlayer == 1) ? 2 : 1;
    }

    public int getCurrentPlayer() {
        return currentPlayer;
    }

    public int[][] getBoxes() {
        return boxes;
    }

    public int[][] getHLines() {
        return hLines;
    }

    public int[][] getVLines() {
        return vLines;
    }
}
