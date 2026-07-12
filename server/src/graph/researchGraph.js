import { StateGraph, START, END } from "@langchain/langgraph";
import { ResearchGraphState } from "./state.js";
import { plannerNode } from "./nodes/planner.node.js";
import { researchToolsNode } from "./nodes/researchTools.node.js";
import { evidenceBuilderNode } from "./nodes/evidenceBuilder.node.js";
import { bullAgentNode } from "./nodes/bullAgent.node.js";
import { bearAgentNode } from "./nodes/bearAgent.node.js";
import { judgeAgentNode } from "./nodes/judgeAgent.node.js";
import { driftComparatorNode } from "./nodes/driftComparator.node.js";

/**
 * Builds and compiles the LangGraph Multi-Agent Adversarial Investment Research pipeline.
 */
export const buildResearchGraph = () => {
  const workflow = new StateGraph(ResearchGraphState)
    .addNode("planner", plannerNode)
    .addNode("researchTools", researchToolsNode)
    .addNode("evidenceBuilder", evidenceBuilderNode)
    .addNode("bullAgent", bullAgentNode)
    .addNode("bearAgent", bearAgentNode)
    .addNode("judgeAgent", judgeAgentNode)
    .addNode("driftComparator", driftComparatorNode);

  workflow
    .addEdge(START, "planner")
    .addEdge("planner", "researchTools")
    .addEdge("researchTools", "evidenceBuilder")
    .addEdge("evidenceBuilder", "bullAgent")
    .addEdge("evidenceBuilder", "bearAgent")
    .addEdge("bullAgent", "judgeAgent")
    .addEdge("bearAgent", "judgeAgent")
    .addEdge("judgeAgent", "driftComparator")
    .addEdge("driftComparator", END);

  return workflow.compile();
};

export const runResearchPipeline = async (initialState) => {
  const graph = buildResearchGraph();
  const result = await graph.invoke(initialState);
  return result;
};

// Research graph v1
