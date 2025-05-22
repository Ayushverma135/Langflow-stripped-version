### Step 1: Remove Backend Component Directories
First, we'll remove the bundle directories from the backend components.

1. Navigate to the backend components directory:
```bash
cd src/backend/base/langflow/components
```

2. Remove these specific directories (you can copy and paste these commands):
```bash
# Remove each bundle directory
rm -rf apify
rm -rf agentql
rm -rf assemblyai
rm -rf astra_assistants  # This is DataStax's directory
rm -rf olivya
rm -rf langwatch
rm -rf Notion
rm -rf needle
rm -rf icosacomputing
rm -rf notdiamond
rm -rf composio
rm -rf cohere
rm -rf firecrawl
rm -rf unstructured
rm -rf git
rm -rf confluence
rm -rf youtube
rm -rf scrapegraph
rm -rf homeassistant
```

### Step 2: Remove Frontend Icons
Next, we'll remove the corresponding icon directories:

1. Navigate to the frontend icons directory:
```bash
cd src/frontend/src/icons
```

2. Remove these icon directories:
```bash
# Remove each icon directory
rm -rf Apify
rm -rf AgentQL
rm -rf AssemblyAI
rm -rf AstraDB    # DataStax's icon
rm -rf Olivya
rm -rf Langwatch
rm -rf Notion
rm -rf Needle
rm -rf Icosa
rm -rf NotDiamond
rm -rf Composio
rm -rf Cohere
rm -rf Firecrawl
rm -rf Unstructured
rm -rf GitLoader
rm -rf Confluence
rm -rf Youtube
rm -rf ScrapeGraphAI
rm -rf HomeAssistant
```

### Step 3: Update Frontend Bundle Configuration

1. Open the file:
```bash
src/frontend/src/utils/styleUtils.ts
```

2. Find the `SIDEBAR_BUNDLES` array and remove the entries for the bundles we're deleting. The array should only contain entries you want to keep. Here's how to modify it:

```typescript
export const SIDEBAR_BUNDLES = [
    // Keep only the bundles you want, for example:
    { display_name: "LangChain", name: "langchain_utilities", icon: "LangChain" },
    { display_name: "CrewAI", name: "crewai", icon: "CrewAI" },
    // Remove all other bundle entries
];
```

### Step 4: Clean Up Dependencies

1. Open the main `pyproject.toml` file in the root directory and remove these dependencies:

```toml
# Remove these lines from the dependencies section
"apify-client>=1.8.1",
"assemblyai==0.35.1",
"astra-assistants[tools]~=2.2.12",
"composio-langchain==0.7.15",
"composio-core==0.7.15",
"langwatch==0.1.16",
"needle-python>=0.4.0",
"scrapegraph-py>=1.12.0",
"atlassian-python-api==3.41.16",  # For Confluence
"youtube-transcript-api==0.6.3",
"GitPython==3.1.43",
```

### Step 5: Clean Up Import References

1. Search for and remove any imports related to these bundles in your Python files:

```bash
cd src/backend/base/langflow
```

2. Look for and remove any imports like:
```python
from langflow.components.apify import ...
from langflow.components.assemblyai import ...
# etc...
```

### Step 6: Remove Test Files

1. Navigate to the test directory:
```bash
cd src/backend/tests/unit/components/bundles
```

2. Remove test directories/files for the removed bundles:
```bash
rm -rf apify
rm -rf agentql
rm -rf assemblyai
rm -rf astra_assistants
rm -rf olivya
rm -rf langwatch
rm -rf notion
rm -rf needle
rm -rf icosacomputing
rm -rf notdiamond
rm -rf composio
rm -rf cohere
rm -rf firecrawl
rm -rf unstructured
rm -rf git
rm -rf confluence
rm -rf youtube
rm -rf scrapegraph
rm -rf homeassistant
```

### Step 7: Rebuild the Project

After making all these changes, rebuild the project:

1. Clean the project:
```bash
make clean_all
```

2. Reinstall dependencies:
```bash
make install_backend
make install_frontend
```

3. Rebuild the frontend:
```bash
make build_frontend
```

### Step 8: Verify Changes

1. Start Langflow:
```bash
make init
```

2. Check the UI to verify:
- The removed bundles don't appear in the sidebar
- Only the intended bundles (like LangChain and CrewAI) are visible
- The application works without errors

### Important Notes:

- Make a backup of your project before making these changes
- Some bundles might have interdependencies; if you encounter errors, check if any remaining components require the removed bundles
- Keep core functionalities intact (like the base LangChain components)
- If you're using version control (like Git), commit your changes in logical groups
