from tests.integration.utils import run_single_component
from unittest.mock import AsyncMock, patch

async def test_mcp_component():
    from langflow.components.tools.mcp_component import MCPToolsComponent

    # inputs = {}
    # await run_single_component(
    #     MCPToolsComponent,
    #     inputs=inputs,  # test default inputs
    # )
    fake_tools = []  # or provide a list of fake tool objects if needed
    with patch.object(MCPToolsComponent.sse_client, "connect_to_server", new=AsyncMock(return_value=fake_tools)), \
         patch.object(MCPToolsComponent.stdio_client, "connect_to_server", new=AsyncMock(return_value=fake_tools)):
        inputs = {}
        await run_single_component(
            MCPToolsComponent,
            inputs=inputs,  # test default inputs
        )