import { Annotation } from "@langchain/langgraph";


export const ResearchGraphState = Annotation.Root({
  userId: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  ticker: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  companyName: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  plannerPlan: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => ({}),
  }),
  rawFinancialData: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => ({}),
  }),
  rawNewsData: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => ({}),
  }),
  evidenceLedger: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => [],
  }),
  bullThesis: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => ({}),
  }),
  bearThesis: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => ({}),
  }),
  verdict: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => ({}),
  }),
  driftSummary: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => ({}),
  }),
});


