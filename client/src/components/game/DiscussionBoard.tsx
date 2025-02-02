import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Discussion {
  id: string;
  user: {
    address: string;
    avatar: string;
  };
  missionId: string;
  missionTitle: string;
  comment: string;
  likes: number;
  timestamp: Date;
}

const mockDiscussions: Discussion[] = [
  {
    id: "1",
    user: {
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=1",
    },
    missionId: "m1",
    missionTitle: "Digital Identity",
    comment: "The wallet security mission was eye-opening! Never knew how important hardware wallets were until this mission. The mentor's explanations were spot on! 🔒",
    likes: 24,
    timestamp: new Date(2025, 1, 1),
  },
  {
    id: "2",
    user: {
      address: "0x123f681646d4a755815f9cb19e1acc8565a0c2ac",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=2",
    },
    missionId: "m2",
    missionTitle: "Security Basics",
    comment: "Just completed the security mission with Agent Cipher. Those scam prevention tips are going to save a lot of people from phishing attempts! 👍",
    likes: 18,
    timestamp: new Date(2025, 1, 2),
  },
  {
    id: "3",
    user: {
      address: "0x9876543210fedcba9876543210fedcba98765432",
      avatar: "https://api.dicebear.com/7.x/personas/svg?seed=3",
    },
    missionId: "m3",
    missionTitle: "DAO Fundamentals",
    comment: "The DAO governance mission was challenging but super informative. Really helped me understand how decentralized decision-making works! 🏛️",
    likes: 15,
    timestamp: new Date(2025, 1, 2),
  },
];

export function DiscussionBoard() {
  return (
    <Card className="w-full bg-background/90 backdrop-blur border-primary mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          Mission Discussions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {mockDiscussions.map((discussion) => (
          <div
            key={discussion.id}
            className="flex gap-4 p-4 rounded-lg border border-primary/20 bg-background/40 backdrop-blur hover:bg-background/60 transition-all"
          >
            <Avatar className="h-10 w-10 border border-primary">
              <AvatarImage src={discussion.avatar} alt="User avatar" />
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-sm text-muted-foreground">
                    {`${discussion.user.address.slice(0, 6)}...${discussion.user.address.slice(-4)}`}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    • {formatDistanceToNow(discussion.timestamp)} ago
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-sm">{discussion.likes}</span>
                </div>
              </div>
              <div>
                <span className="text-xs font-medium text-primary">
                  Mission: {discussion.missionTitle}
                </span>
                <p className="mt-1 text-sm">{discussion.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
