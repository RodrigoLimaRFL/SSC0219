import * as fs from "node:fs";
import * as http from "node:http";
import * as path from "node:path";

const PORT = 8000;

const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "application/javascript",
  css: "text/css",
  png: "image/png",
  jpg: "image/jpg",
  gif: "image/gif",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};

const STATIC_PATH = path.join(process.cwd(), "./static");
const EXAMPLE_PATH = path.join(process.cwd(), "./example");

const toBool = [() => true, () => false];

const prepareFile = async (url, newPath) => {
    const paths = [newPath, url];
    const filePath = path.join(...paths);
    const pathTraversal = !filePath.startsWith(newPath);
  
    try {
      const stats = await fs.promises.stat(filePath);
      const isDirectory = stats.isDirectory();
  
      if (isDirectory) {
        throw new Error("Path is a directory");
      }
  
      const ext = path.extname(filePath).substring(1).toLowerCase();
      const stream = fs.createReadStream(filePath);
      return { found: true, ext, stream };
    } catch (error) {
      const streamPath = STATIC_PATH + "/404.html";
      const ext = path.extname(streamPath).substring(1).toLowerCase();
      const stream = fs.createReadStream(streamPath);
      return { found: false, ext, stream };
    }
  };

const random = async (max) => {
    return Math.random(0, max);
}

const random0max = async (max) => {
    return Math.random() * max;
}

http
  .createServer(async (req, res) => {
    let file;
    if(req.url.startsWith("/example")) {
        file = await prepareFile(req.url, EXAMPLE_PATH);
        console.log("example");
    }
    else if(req.url.startsWith("/random")) {
        const parsedUrl = new URL(`http://${req.headers.host}${req.url}`);
        const max = Number(parsedUrl.searchParams.get("max"));
        console.log(max);
        let randomValue;
        if(max>0)
            randomValue = (await random()) * max;
        else
            randomValue = await random();
        const mimeType = MIME_TYPES.html;
        res.writeHead(200, { "Content-Type": mimeType });
        res.end(randomValue.toString());
        return;
    }
    else {
        file = await prepareFile(req.url, STATIC_PATH);
    }
    const statusCode = file.found ? 200 : 404;
    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
    res.writeHead(statusCode, { "Content-Type": mimeType });
    file.stream.pipe(res);
    console.log(`${req.method} ${req.url} ${statusCode}`);
  })
  .listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);
