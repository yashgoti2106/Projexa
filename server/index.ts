import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI, Type, Schema } from '@google/genai';

// Load .env.local from the parent directory
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
}

const projectSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    problemStatement: { type: Type.STRING },
    proposedSolution: { type: Type.STRING },
    targetUsers: { type: Type.STRING },
    domain: { type: Type.STRING },
    projectType: { type: Type.STRING },
    difficulty: { type: Type.STRING },
    estimatedDuration: { type: Type.STRING },
    recommendedTeamSize: { type: Type.STRING },
    technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
    majorComponents: { type: Type.ARRAY, items: { type: Type.STRING } },
    requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
    fitScore: {
      type: Type.OBJECT,
      properties: {
        overall: { type: Type.INTEGER },
        skillMatch: { type: Type.INTEGER },
        interestMatch: { type: Type.INTEGER },
        timeFeasibility: { type: Type.INTEGER },
        complexityMatch: { type: Type.INTEGER },
        learningValue: { type: Type.INTEGER },
        innovationPotential: { type: Type.INTEGER },
        explanation: { type: Type.STRING },
      },
      required: ["overall", "skillMatch", "interestMatch", "timeFeasibility", "complexityMatch", "learningValue", "innovationPotential", "explanation"]
    },
    novelty: {
      type: Type.OBJECT,
      properties: {
        level: { type: Type.STRING },
        commonPattern: { type: Type.STRING },
        differentiation: { type: Type.STRING },
        suggestedUSP: { type: Type.STRING },
      },
      required: ["level", "commonPattern", "differentiation", "suggestedUSP"]
    },
    realityCheck: {
      type: Type.OBJECT,
      properties: {
        status: { type: Type.STRING },
        difficulty: { type: Type.STRING },
        duration: { type: Type.STRING },
        teamSize: { type: Type.STRING },
        technicalRisks: { type: Type.ARRAY, items: { type: Type.STRING } },
        dependencyRisks: { type: Type.ARRAY, items: { type: Type.STRING } },
        scopeRisks: { type: Type.ARRAY, items: { type: Type.STRING } },
        recommendation: { type: Type.STRING },
      },
      required: ["status", "difficulty", "duration", "teamSize", "technicalRisks", "dependencyRisks", "scopeRisks", "recommendation"]
    },
    skills: {
      type: Type.OBJECT,
      properties: {
        alreadyHave: { type: Type.ARRAY, items: { type: Type.STRING } },
        needImprovement: { type: Type.ARRAY, items: { type: Type.STRING } },
        needToLearn: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["alreadyHave", "needImprovement", "needToLearn"]
    },
    mvp: { type: Type.ARRAY, items: { type: Type.STRING } },
    futureScope: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: [
    "title", "description", "problemStatement", "proposedSolution", "targetUsers",
    "domain", "projectType", "difficulty", "estimatedDuration", "recommendedTeamSize",
    "technologies", "majorComponents", "requiredSkills", "fitScore", "novelty",
    "realityCheck", "skills", "mvp", "futureScope"
  ]
};

const aiSystemPrompt = `You are an experienced final-year project mentor, technical architect, product strategist, and academic project advisor.
Your goal is to recommend or improve projects that are relevant to the student's interests, aligned with their current skills, achievable within their timeframe, appropriate for their complexity preference, educationally valuable, technically implementable, sufficiently differentiated, and suitable for academic evaluation.
Always prioritize Personalization, Feasibility, Clarity, Educational Value, Technical Realism, and Differentiation.
Never claim guaranteed uniqueness. Never ignore the student's constraints. Never recommend an unnecessarily large MVP.`;

app.post('/api/generate-projects', async (req, res) => {
  try {
    const inputData = req.body;
    const isValidateMode = inputData.mode === 'validate';
    
    let prompt = `Based on the following student profile, please generate ${isValidateMode ? '1 validated and improved project concept' : 'exactly 3 personalized project recommendations'}.\n\n`;
    prompt += `Profile Data: ${JSON.stringify(inputData, null, 2)}\n\n`;
    
    if (isValidateMode) {
      prompt += `Analyze the existing idea. Identify problems, suggest improvements, and output a refined, realistic project concept.`;
    } else {
      prompt += `Generate exactly 3 projects that are meaningfully different from each other. Do NOT return three variations of the same project.`;
    }

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        projects: {
          type: Type.ARRAY,
          items: projectSchema
        }
      },
      required: ["projects"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: aiSystemPrompt,
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.7,
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      res.json(data);
    } else {
      throw new Error("No response text from Gemini");
    }
  } catch (error: any) {
    console.error('Error generating projects:', error);
    res.status(500).json({ error: error.message || 'Failed to generate projects' });
  }
});

app.post('/api/generate-blueprint', async (req, res) => {
  try {
    const { projectContext, refinementFeedback } = req.body;
    
    let prompt = `Generate a detailed project blueprint and development roadmap based on the following project concept:\n\n${JSON.stringify(projectContext, null, 2)}\n\n`;
    
    if (refinementFeedback) {
      prompt += `Please incorporate the following user feedback or constraints into the blueprint:\n${refinementFeedback}\n\n`;
    }

    const blueprintSchema = {
      type: Type.OBJECT,
      properties: {
        overview: { type: Type.STRING },
        features: { type: Type.ARRAY, items: { type: Type.STRING } },
        userStories: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              role: { type: Type.STRING },
              action: { type: Type.STRING },
              benefit: { type: Type.STRING }
            },
            required: ["role", "action", "benefit"]
          }
        },
        architecture: {
          type: Type.OBJECT,
          properties: {
            frontend: { type: Type.STRING },
            backend: { type: Type.STRING },
            database: { type: Type.STRING },
            infrastructure: { type: Type.STRING }
          },
          required: ["frontend", "backend", "database", "infrastructure"]
        },
        technologyStack: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              technologies: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["category", "technologies"]
          }
        },
        milestones: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              duration: { type: Type.STRING },
              tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["title", "description", "duration", "tasks"]
          }
        }
      },
      required: ["overview", "features", "userStories", "architecture", "technologyStack", "milestones"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert technical architect and product manager. Your job is to generate a comprehensive, structured project blueprint.",
        responseMimeType: 'application/json',
        responseSchema: blueprintSchema,
        temperature: 0.7,
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      res.json(data);
    } else {
      throw new Error("No response text from Gemini");
    }
  } catch (error: any) {
    console.error('Error generating blueprint:', error);
    res.status(500).json({ error: error.message || 'Failed to generate blueprint' });
  }
});

// Catch-all route to serve the React SPA for any unhandled routes (must be after all API routes)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
