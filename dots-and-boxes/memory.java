package com.example.memorygame;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/game")
public class MemoryGameController {

    private static Map<String, GameSession> sessions = new HashMap<>();

    @PostMapping("/start")
    public GameState startGame() {
        String sessionId = UUID.randomUUID().toString();
        GameSession session = new GameSession();
        sessions.put(sessionId, session);
        return new GameState(sessionId, session.getCardsState(), 0, false);
    }

    @PostMapping("/flip")
    public GameState flipCard(@RequestParam String sessionId, @RequestParam int index) {
        GameSession session = sessions.get(sessionId);
        if (session == null) {
            throw new IllegalArgumentException("Invalid session");
        }
        return session.flipCard(index);
    }

    static class GameSession {
        private final List<Card> cards = new ArrayList<>();
        private Card firstFlipped = null;
        private Card secondFlipped = null;
        private int moves = 0;
        private boolean waiting = false;

        GameSession() {
            List<Integer> values = new ArrayList<>();
            for (int i = 0; i < 8; i++) {
                values.add(i);
                values.add(i);
            }
            Collections.shuffle(values);
            for (int v : values) {
                cards.add(new Card(v));
            }
        }

        synchronized GameState flipCard(int index) {
            if (waiting || index < 0 || index >= cards.size()) {
                return getCardsState();
            }
            Card card = cards.get(index);
            if (card.isMatched() || card.isFaceUp()) {
                return getCardsState();
            }

            card.setFaceUp(true);

            if (firstFlipped == null) {
                firstFlipped = card;

