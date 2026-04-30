import { test as base } from "@playwright/test";
import datasets from "../testData/TestData.json" assert { type: "json" };

// Keep base test, export datasets separately
export const test = base;
export { datasets };
