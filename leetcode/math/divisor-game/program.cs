/*
https://leetcode.com/problems/divisor-game/description/

Alice and Bob take turns playing a game, with Alice starting first.

Initially, there is a number n on the chalkboard. On each player's turn, that player makes a move consisting of:

Choosing any x with 0 < x < n and n % x == 0.
Replacing the number n on the chalkboard with n - x.
Also, if a player cannot make a move, they lose the game.

Return true if and only if Alice wins the game, assuming both players play optimally.
*/

public class Solution {
    enum Player { Alice, Bob } ;
    bool?[] cachedWins = new bool?[10001];
    int getNextN(int n, int x) {
        return n - x;
    }
    int getNextX(int n, int currentX) {
        int maxX = (n >> 1);
        for(int i = (currentX + 1); i <= maxX; i++) {
            if((n % i) == 0) {
                return i;
            }
        }
        return -1;
    }
    Player getNextPlayer(Player player) {
        return (player == Player.Alice) ? Player.Bob : Player.Alice;
    }
    Player calcGameWinner(int n, Player firstStepPlayer) {
        if(this.cachedWins[n] != null) {
            return ((bool)cachedWins[n]) ? firstStepPlayer : this.getNextPlayer(firstStepPlayer);
        }
        if(n == 2) { // If "n = 1" there are no moves even for firstStepPlayer and he looses
            return firstStepPlayer;
        }
        Player result = this.getNextPlayer(firstStepPlayer);
        for(int x = getNextX(n, 0); x != -1; x = getNextX(n, x)) {
            //steps.Add(firstStepPlayer + ", " + n + ", try " + x);
            Player nextStepWinner = calcGameWinner(this.getNextN(n, x), this.getNextPlayer(firstStepPlayer));
            //steps.RemoveAt(steps.Count - 1);
            if(firstStepPlayer == nextStepWinner) {
                result = firstStepPlayer;
                break;
            }
        }
        cachedWins[n] = (result == firstStepPlayer);
        return result;
    }
    public bool DivisorGame(int n) {
        return (calcGameWinner(n, Player.Alice) == Player.Alice);
    }
}
