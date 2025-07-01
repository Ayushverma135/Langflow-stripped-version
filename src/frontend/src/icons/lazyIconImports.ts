// Export the lazy loading mapping for icons
export const lazyIconsMapping = {
  Airbyte: () =>
    import("@/icons/Airbyte").then((mod) => ({ default: mod.AirbyteIcon })),
  Arize: () =>
    import("@/icons/Arize").then((mod) => ({ default: mod.ArizeIcon })),
  Athena: () =>
    import("@/icons/athena").then((mod) => ({ default: mod.AthenaIcon })),
  AWS: () => import("@/icons/AWS").then((mod) => ({ default: mod.AWSIcon })),
  AWSInverted: () =>
    import("@/icons/AWSInverted").then((mod) => ({
      default: mod.AWSInvertedIcon,
    })),
  Azure: () =>
    import("@/icons/Azure").then((mod) => ({ default: mod.AzureIcon })),
  BotMessageSquareIcon: () =>
    import("@/icons/BotMessageSquare").then((mod) => ({
      default: mod.BotMessageSquareIcon,
    })),
  BWPython: () =>
    import("@/icons/BW python").then((mod) => ({ default: mod.BWPythonIcon })),
  Cassandra: () =>
    import("@/icons/Cassandra").then((mod) => ({ default: mod.CassandraIcon })),
  Chroma: () =>
    import("@/icons/ChromaIcon").then((mod) => ({ default: mod.ChromaIcon })),
  CrewAI: () =>
    import("@/icons/CrewAI").then((mod) => ({ default: mod.CrewAiIcon })),
  Dropbox: () =>
    import("@/icons/Dropbox").then((mod) => ({ default: mod.DropboxIcon })),
  DuckDuckGo: () =>
    import("@/icons/DuckDuckGo").then((mod) => ({
      default: mod.DuckDuckGoIcon,
    })),
  ElasticsearchStore: () =>
    import("@/icons/ElasticsearchStore").then((mod) => ({
      default: mod.ElasticsearchIcon,
    })),
  Evernote: () =>
    import("@/icons/Evernote").then((mod) => ({ default: mod.EvernoteIcon })),
  FacebookMessenger: () =>
    import("@/icons/FacebookMessenger").then((mod) => ({
      default: mod.FBIcon,
    })),
  FreezeAll: () =>
    import("@/icons/freezeAll").then((mod) => ({ default: mod.freezeAllIcon })),
  GitBook: () =>
    import("@/icons/GitBook").then((mod) => ({ default: mod.GitBookIcon })),
  GlobeOk: () =>
    import("@/icons/globe-ok").then((mod) => ({ default: mod.GlobeOkIcon })),
  GradientInfinity: () =>
    import("@/icons/GradientSparkles").then((mod) => ({
      default: mod.GradientInfinity,
    })),
  GradientUngroup: () =>
    import("@/icons/GradientSparkles").then((mod) => ({
      default: mod.GradientUngroup,
    })),
  GradientSave: () =>
    import("@/icons/GradientSparkles").then((mod) => ({
      default: mod.GradientSave,
    })),
  GridHorizontal: () =>
    import("@/icons/GridHorizontal").then((mod) => ({
      default: mod.GridHorizontalIcon,
    })),
  HackerNews: () =>
    import("@/icons/hackerNews").then((mod) => ({
      default: mod.HackerNewsIcon,
    })),
  HuggingFace: () =>
    import("@/icons/HuggingFace").then((mod) => ({
      default: mod.HuggingFaceIcon,
    })),
  IFixIt: () =>
    import("@/icons/IFixIt").then((mod) => ({ default: mod.IFixIcon })),
  javascript: () =>
    import("@/icons/JSicon").then((mod) => ({ default: mod.JSIcon })),
  LangChain: () =>
    import("@/icons/LangChain").then((mod) => ({ default: mod.LangChainIcon })),
  Mcp: () => import("@/icons/MCP").then((mod) => ({ default: mod.McpIcon })),
  Mem0: () => import("@/icons/Mem0").then((mod) => ({ default: mod.Mem0 })),
  Meta: () => import("@/icons/Meta").then((mod) => ({ default: mod.MetaIcon })),
  Midjourney: () =>
    import("@/icons/Midjorney").then((mod) => ({
      default: mod.MidjourneyIcon,
    })),
  Milvus: () =>
    import("@/icons/Milvus").then((mod) => ({ default: mod.MilvusIcon })),
  MongoDB: () =>
    import("@/icons/MongoDB").then((mod) => ({ default: mod.MongoDBIcon })),
  Ollama: () =>
    import("@/icons/Ollama").then((mod) => ({ default: mod.OllamaIcon })),
  OpenAI: () =>
    import("@/icons/OpenAi").then((mod) => ({ default: mod.OpenAiIcon })),
  OpenSearch: () =>
    import("@/icons/OpenSearch").then((mod) => ({ default: mod.OpenSearch })),
  Pinecone: () =>
    import("@/icons/Pinecone").then((mod) => ({ default: mod.PineconeIcon })),
  Postgres: () =>
    import("@/icons/Postgres").then((mod) => ({ default: mod.PostgresIcon })),
  Python: () =>
    import("@/icons/Python").then((mod) => ({ default: mod.PythonIcon })),
  QDrant: () =>
    import("@/icons/QDrant").then((mod) => ({ default: mod.QDrantIcon })),
  Redis: () =>
    import("@/icons/Redis").then((mod) => ({ default: mod.RedisIcon })),
  SearchLexical: () =>
    import("@/icons/SearchLexical").then((mod) => ({
      default: mod.SearchLexicalIcon,
    })),
  SearchHybrid: () =>
    import("@/icons/SearchHybrid").then((mod) => ({
      default: mod.SearchHybridIcon,
    })),
  SearchVector: () =>
    import("@/icons/SearchVector").then((mod) => ({
      default: mod.SearchVectorIcon,
    })),
  Searx: () =>
    import("@/icons/Searx").then((mod) => ({ default: mod.SearxIcon })),
  Share: () =>
    import("@/icons/Share").then((mod) => ({ default: mod.ShareIcon })),
  Share2: () =>
    import("@/icons/Share2").then((mod) => ({ default: mod.Share2Icon })),
  Slack: () =>
    import("@/icons/Slack/SlackIcon").then((mod) => ({ default: mod.default })),
  Spider: () =>
    import("@/icons/Spider").then((mod) => ({ default: mod.SpiderIcon })),
  Streamlit: () =>
    import("@/icons/Streamlit").then((mod) => ({ default: mod.Streamlit })),
  ThumbDownCustom: () =>
    import("@/icons/thumbs").then((mod) => ({
      default: mod.ThumbDownIconCustom,
    })),
  ThumbUpCustom: () =>
    import("@/icons/thumbs").then((mod) => ({
      default: mod.ThumbUpIconCustom,
    })),
  TwitterX: () =>
    import("@/icons/Twitter X").then((mod) => ({
      default: mod.TwitterXIcon,
    })),
  ZepMemory: () =>
    import("@/icons/ZepMemory").then((mod) => ({ default: mod.ZepMemoryIcon })),
};
