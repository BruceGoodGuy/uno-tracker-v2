import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Trophy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export default function ScoringRuleForm({ scoringRules = null, error = null }) {
  return (
    <Card className={"gap-2"}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          <Tooltip>
            <TooltipTrigger onClick={(e) => {e.preventDefault();}}>Scoring Rules</TooltipTrigger>
            <TooltipContent>
              <p>Currently we only support basic scoring rules.</p>
            </TooltipContent>
          </Tooltip>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium">
              Winner takes all points
            </Label>
            <p className="text-xs text-gray-500 mt-1">
              Winner gets all other players' round scores
            </p>
          </div>
          <Switch checked={true} disabled />
        </div>
      </CardContent>
    </Card>
  );
}
