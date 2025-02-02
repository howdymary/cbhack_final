import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Agent, Dialogue, DialogueOption } from "@/game/types";
import { playSound } from "@/game/sound";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AgentResponseTooltip } from "./AgentResponseTooltip";

interface AgentDialogProps {
  agent: Agent;
  dialogue: Dialogue;
  onOptionSelect: (option: DialogueOption) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function AgentDialog({
  agent,
  dialogue,
  onOptionSelect,
  isOpen,
  onClose,
}: AgentDialogProps) {
  const [currentResponse, setCurrentResponse] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [loadingOptionId, setLoadingOptionId] = useState<string | null>(null);
  const { toast } = useToast();

  const agentResponseMutation = useMutation({
    mutationFn: async (option: DialogueOption) => {
      const res = await apiRequest("POST", "/api/agent/dialogue", {
        agentRole: agent.role,
        context: `Previous dialogue: ${dialogue.text}\nUser selected: ${option.text}`,
        userInput: option.text,
      });
      const data = await res.json();
      return data.response;
    },
    onSuccess: (response: string) => {
      setCurrentResponse(response);
      setShowTooltip(true);
      playSound("success");
    },
    onError: (error: Error) => {
      console.error("Agent response error:", error);
      toast({
        title: "Error",
        description: "Failed to get agent response",
        variant: "destructive",
      });
    },
  });

  const handleOptionClick = async (option: DialogueOption) => {
    try {
      playSound("click");
      setCurrentResponse(null);
      setShowTooltip(false);
      setLoadingOptionId(option.nextDialogueId);

      // Wait for the AI response before proceeding
      const response = await agentResponseMutation.mutateAsync(option);
      console.log("AI Response received:", response);

      // Only proceed with option selection after we have a response
      setTimeout(() => {
        setLoadingOptionId(null);
        onOptionSelect(option);
      }, 2000); // Give user time to read the response
    } catch (error) {
      console.error("Failed to process option:", error);
      setLoadingOptionId(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1100px] max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur border-primary">
        <DialogTitle className="text-xl font-bold text-primary mb-6">
          {agent.name}
        </DialogTitle>
        <div className="flex gap-6 items-start max-w-full">
          <Avatar className="w-24 h-24 border-2 border-primary shrink-0">
            <AvatarImage src={agent.avatar} alt={agent.name} />
          </Avatar>
          <div className="flex-1 min-w-0 space-y-6">
            {" "}
            {/* min-w-0 prevents flex item from expanding */}
            <div>
              <p className="text-lg text-muted-foreground">{agent.role}</p>
              <div className="mt-6 prose prose-lg dark:prose-invert max-w-none">
                <div className="p-6 rounded-lg bg-muted/50 border border-muted-foreground/20">
                  <p className="leading-relaxed break-words whitespace-pre-wrap text-base max-w-full text-white font-medium">
                    {dialogue.text}
                  </p>
                  {currentResponse && (
                    <AgentResponseTooltip
                      content={currentResponse}
                      isVisible={showTooltip}
                      className="mt-6"
                      agent={agent}
                    />
                  )}
                </div>
              </div>
            </div>
            {dialogue.options && (
              <div className="space-y-3 max-w-full">
                {dialogue.options.map((option) => (
                  <Button
                    key={option.nextDialogueId}
                    variant="outline"
                    className="w-full justify-start text-left min-h-[3rem] break-words"
                    onClick={() => handleOptionClick(option)}
                    disabled={loadingOptionId === option.nextDialogueId}
                  >
                    {loadingOptionId === option.nextDialogueId ? (
                      <Loader2 className="mr-3 h-5 w-5 animate-spin shrink-0" />
                    ) : null}
                    <span className="line-clamp-2 text-base">
                      {option.text}
                    </span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}