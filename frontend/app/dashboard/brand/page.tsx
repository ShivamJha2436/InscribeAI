"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { brandAPI } from "@/lib/api";

export default function BrandPage() {
  const [brandTones, setBrandTones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    settings: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    loadBrandTones();
  }, []);

  const loadBrandTones = async () => {
    try {
      const response = await brandAPI.list();
      setBrandTones(response.brand_tones || []);
    } catch (error) {
      console.error("Failed to load brand tones:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await brandAPI.create(
        formData.name,
        formData.description,
        formData.settings
      );
      setFormData({ name: "", description: "", settings: "" });
      setShowForm(false);
      loadBrandTones();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create brand tone");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this brand tone?")) {
      return;
    }

    try {
      await brandAPI.delete(id);
      loadBrandTones();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to delete brand tone");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Brand Tone</h1>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          {showForm ? "Cancel" : "Create New"}
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Create Brand Tone</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                placeholder="e.g., Professional, Casual, Technical"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                placeholder="Describe the tone and style..."
              />
            </div>

            <div>
              <Label htmlFor="settings">Settings (JSON)</Label>
              <textarea
                id="settings"
                value={formData.settings}
                onChange={(e) =>
                  setFormData({ ...formData, settings: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 font-mono text-sm"
                placeholder='{"formality": "professional", "humor": "none"}'
              />
            </div>

            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
              Create Brand Tone
            </Button>
          </form>
        </div>
      )}

      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      ) : brandTones.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No brand tones yet. Create one to get started!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {brandTones.map((tone) => (
            <div
              key={tone.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{tone.name}</h3>
                <Button
                  onClick={() => handleDelete(tone.id)}
                  variant="outline"
                  size="sm"
                >
                  Delete
                </Button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {tone.description}
              </p>
              {tone.settings && (
                <pre className="text-xs bg-gray-50 dark:bg-gray-700 p-2 rounded overflow-x-auto">
                  {tone.settings}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

