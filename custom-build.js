#!/usr/bin/env node

/**
 * Custom build script that patches the react-dev-utils/formatWebpackMessages module
 * to fix the TypeError: message.split is not a function error
 */

// Path to the formatWebpackMessages.js file
const formatFilePath = require.resolve("react-dev-utils/formatWebpackMessages");

// Get the original formatWebpackMessages module
const originalFormatWebpackMessages = require(formatFilePath);

// Monkey patch the formatMessage function
const fs = require("fs");
const path = require("path");
const fileContent = fs.readFileSync(formatFilePath, "utf8");

// Apply patch only if it hasn't been applied yet
if (fileContent.includes("let lines = message.split")) {
  console.log("📝 Patching formatWebpackMessages.js to fix TypeError...");

  const patchedContent = fileContent.replace(
    "let lines = message.split('\\n');",
    "let lines = [];\nif (typeof message === 'string') {\n  lines = message.split('\\n');\n}"
  );

  fs.writeFileSync(formatFilePath, patchedContent, "utf8");
  console.log("✅ Patch applied successfully!");
}

// Run the original build script
console.log("🏗️ Starting build process...");
require("../scripts/build");
