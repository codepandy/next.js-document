const fs = require("fs-extra");
const path = require("path");
const { marked } = require("marked");

// 确保 dist 目录存在
fs.ensureDirSync("dist");

// 读取当前目录下的所有 .md 文件
const files = fs.readdirSync(".").filter((file) => file.endsWith(".md"));

// 转换每个 Markdown 文件
files.forEach((file) => {
  const content = fs.readFileSync(file, "utf8");
  const html = marked(content);

  // 创建对应的 HTML 文件名
  const htmlFileName = path.basename(file, ".md") + ".html";
  const htmlPath = path.join("dist", htmlFileName);

  // 写入 HTML 文件
  fs.writeFileSync(
    htmlPath,
    `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${path.basename(file, ".md")}</title>
  <style>
    body {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
    }
    pre {
      background-color: #f6f8fa;
      padding: 16px;
      border-radius: 6px;
      overflow: auto;
    }
    code {
      font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
    }
  </style>
</head>
<body>
${html}
</body>
</html>
  `
  );

  console.log(`转换完成: ${file} -> ${htmlPath}`);
});
