"use client";

import { handleRecommendedTopics } from "@/lib/actions/user.action";
import { Button } from "../ui/button";
import { Plus, Check } from "lucide-react";
import { toast } from "sonner";
import { User } from "@/types";

const RecommendedTopics = ({
  recommendedTopics,
  user,
}: {
  recommendedTopics: string[];
  user: User;
}) => {
  const handleTopic = async (topic: string) => {
    const res = await handleRecommendedTopics({ topic });

    if (!res.success) {
      toast.error(res.message);
      console.error(res.message);
      return;
    }
  };
  return (
    <div>
      <h1 className="font-medium text-lg tracking-wide">Recommended topics</h1>
      <div className="mt-3 flex flex-wrap w-70 gap-2">
        {recommendedTopics.map((item) => {
          const isTopicFollowing = (user.topicsInterestedIn ?? []).includes(
            item,
          );
          return (
            <Button
              key={item}
              variant={"outline"}
              type="button"
              size={"sm"}
              onClick={() => handleTopic(item)}
            >
              {" "}
              {item}{" "}
              {isTopicFollowing ? <Check size={13} /> : <Plus size={13} />}{" "}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedTopics;
