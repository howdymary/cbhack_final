
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Agent } from "@/game/types";

interface AgentResponseTooltipProps {
  content: string;
  isVisible: boolean;
  className?: string;
  agent?: Agent;
}

export function AgentResponseTooltip({ 
  content, 
  isVisible,
  className,
  agent
}: AgentResponseTooltipProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const words = content.split(" ");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "relative p-4 rounded-lg bg-background/95 backdrop-blur",
            "border border-primary/20 shadow-lg",
            "max-w-prose text-foreground whitespace-pre-wrap break-words",
            className
          )}
        >
          <div className="flex gap-4">
            {agent && (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={agent.avatar}
                alt={agent.name}
                className="w-12 h-12 rounded-full border-2 border-primary"
              />
            )}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1"
            >
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.1,
                    delay: index * 0.03
                  }}
                  className="mr-1"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
