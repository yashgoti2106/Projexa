export type DiscoveryMode = "dna" | "guided" | "validate";

export interface StudentProfile {
  skills: string[];
  skillLevels: Record<string, 'Beginner' | 'Intermediate' | 'Advanced'>;
  interests: string[];
  experience: string;
  timeframe: string;
  complexity: string;
  learningGoals: string[];
}

export interface DiscoveryProfile {
  stream: string;
  domains: string[];
  problemTypes: string[];
  projectTypes: string[];
  timeframe: string;
  complexity: string;
}

export interface ExistingIdea {
  description: string;
  skills: string[];
  timeframe: string;
  teamSize: string;
  complexity: string;
}

export interface ProjectProfileData {
  id?: string;
  mode: DiscoveryMode;
  studentProfile?: StudentProfile;
  discoveryProfile?: DiscoveryProfile;
  existingIdea?: ExistingIdea;
  createdAt?: string;
  updatedAt?: string;
  status: 'draft' | 'generated' | 'saved';
}
