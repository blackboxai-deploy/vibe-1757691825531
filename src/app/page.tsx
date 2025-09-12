import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-4">Welcome to QEMU Setup Wizard</h2>
        <p className="text-lg">
          This website guides you through setting up and using QEMU on Windows 10/11 without relying on WSL2. QEMU is a powerful, open-source emulator for creating and running virtual machines.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-4">What is QEMU?</h3>
        <p className="mb-4">
          QEMU (Quick Emulator) allows you to run operating systems and programs for one machine on a different machine. It supports hardware virtualization and can emulate various architectures.
        </p>
        <p className="mb-4">
          On Windows, we&apos;ll use native binaries—no WSL2 needed. This setup is ideal for testing OSes, development, or running legacy software.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-4">Setup Overview</h3>
        <Card>
          <CardHeader>
            <CardTitle>Steps to Get Started</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Download QEMU binaries from the official site (qemu.org).</li>
              <li>Extract and add the bin folder to your system PATH.</li>
              <li>Use this wizard to configure your VM and generate a custom PowerShell script.</li>
              <li>Run the script to create and launch your VM.</li>
            </ol>
          </CardContent>
        </Card>
      </section>

      <section>
        <Link href="/configure">
          <Button size="lg">Start Configuring Your VM</Button>
        </Link>
      </section>
    </div>
  );
}
