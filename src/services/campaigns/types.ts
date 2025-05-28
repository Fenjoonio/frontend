import type { User } from "@/services/user";

export type Leaderboard = { user: User; totalLikes: number; rank: number };
