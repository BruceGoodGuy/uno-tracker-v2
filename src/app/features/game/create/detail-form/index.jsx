import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Edit3 } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function GameDetailForm({ name, error }) {
  return (
    <Card className={"gap-2"}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Edit3 className="w-5 h-5" />
          Game Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="gameName" className="text-sm font-medium">
            Game Name
          </Label>
          <Input
            id="gameName"
            name="name"
            placeholder="Enter game name (optional)"
            defaultValue={name}
            className={`h-12 mt-2 ${
              error ? "border-red-500 focus:border-red-500" : ""
            }`}
          />
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
