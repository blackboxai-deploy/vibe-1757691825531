"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScriptDisplay from "@/components/ScriptDisplay";

const formSchema = z.object({
  os: z.enum(["ubuntu", "windows", "custom"]),
  customIsoPath: z.string().optional(),
  cpuCores: z.number().min(1).max(16),
  ram: z.number().min(512).max(16384),
  diskSize: z.number().min(10).max(500),
  enableKvm: z.boolean(),
  enableUsb: z.boolean(),
});

export default function Configure() {
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      os: "ubuntu",
      cpuCores: 2,
      ram: 2048,
      diskSize: 50,
      enableKvm: false,
      enableUsb: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      setGeneratedScript(data.script);
    } catch (error) {
      console.error("Error generating script:", error);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-4">Configure Your QEMU VM</h2>
      <p className="text-lg mb-6">Select options below to customize your virtual machine. We'll generate a PowerShell script for Windows.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Guest OS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="os"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Operating System</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select OS" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ubuntu">Ubuntu Linux</SelectItem>
                        <SelectItem value="windows">Windows</SelectItem>
                        <SelectItem value="custom">Custom ISO</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("os") === "custom" && (
                <FormField
                  control={form.control}
                  name="customIsoPath"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custom ISO Path</FormLabel>
                      <FormControl>
                        <Input placeholder="C:\\path\\to\\iso.iso" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hardware Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="cpuCores"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPU Cores: {field.value}</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={16}
                        step={1}
                        defaultValue={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RAM (MB): {field.value}</FormLabel>
                    <FormControl>
                      <Slider
                        min={512}
                        max={16384}
                        step={512}
                        defaultValue={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diskSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Disk Size (GB): {field.value}</FormLabel>
                    <FormControl>
                      <Slider
                        min={10}
                        max={500}
                        step={10}
                        defaultValue={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="enableKvm"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Enable KVM Acceleration</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="enableUsb"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Enable USB Passthrough</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button type="submit">Generate Script</Button>
        </form>
      </Form>

      {generatedScript && (
        <section>
          <h3 className="text-2xl font-semibold mb-4">Generated Script</h3>
          <ScriptDisplay script={generatedScript} />
        </section>
      )}
    </div>
  );
}
