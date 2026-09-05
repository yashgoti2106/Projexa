import type { ProjectProfileData } from '../../types/project';

const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';

export const generateProjectRecommendations = async (profileData: ProjectProfileData) => {
  try {
    const response = await fetch(`${API_URL}/generate-projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in AI Service:', error);
    throw error;
  }
};

export const generateProjectBlueprint = async (projectContext: any, refinementFeedback?: string) => {
  try {
    const response = await fetch(`${API_URL}/generate-blueprint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projectContext, refinementFeedback }),
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating project blueprint:', error);
    throw error;
  }
};
