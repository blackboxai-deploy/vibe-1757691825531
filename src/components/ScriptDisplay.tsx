import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react"; // Using lucide for copy icon, as it's in dependencies

interface ScriptDisplayProps {
  script: string;
}

export default function ScriptDisplay({ script }: ScriptDisplayProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    // Optional: Add toast notification
  };

  const handleDownload = () => {
    const blob = new Blob([script], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qemu-setup.ps1";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
          <code>{script}</code>
        </pre>
        <div className="flex justify-end space-x-4 mt-4">
          <Button variant="outline" onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button onClick={handleDownload}>Download Script</Button>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Save as .ps1 file and run in PowerShell (Set-ExecutionPolicy RemoteSigned if needed).
        </p>
      </CardContent>
    </Card>
  );
}
