"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { collaborationAPI } from "@/lib/api";

export default function CollaborationPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const response = await collaborationAPI.getTeams();
      setTeams(response.teams || []);
    } catch (error) {
      console.error("Failed to load teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await collaborationAPI.createTeam(teamName);
      setTeamName("");
      setShowTeamForm(false);
      loadTeams();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create team");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Collaboration</h1>
        <Button
          onClick={() => setShowTeamForm(!showTeamForm)}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          {showTeamForm ? "Cancel" : "Create Team"}
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {showTeamForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Create Team</h2>
          <form onSubmit={handleCreateTeam} className="space-y-4">
            <div>
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
                placeholder="Enter team name"
              />
            </div>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
              Create Team
            </Button>
          </form>
        </div>
      )}

      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      ) : teams.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No teams yet. Create one to start collaborating!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            >
              <h3 className="text-xl font-semibold mb-4">{team.name}</h3>
              <div>
                <h4 className="font-medium mb-2">Members</h4>
                {team.members && team.members.length > 0 ? (
                  <ul className="space-y-2">
                    {team.members.map((member: any) => (
                      <li
                        key={member.id}
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        {member.user?.name || member.user?.email} ({member.role})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    No members yet
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

