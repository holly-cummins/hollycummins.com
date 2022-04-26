#!/usr/bin/env node

const fs = require("fs");
const { copyFile, writeFile } = require("fs").promises;
const request = require("request");
const path = require("path");
const metadataParser = require("markdown-yaml-metadata-parser");
const { hasProvider, extract } = require("../plugins/gatsby-remark-oembed/extended-oembed-parser");
const nodeUrl = require("url");

const contentDir = require("fs").existsSync("../content") ? "../content" : "./content";
const dir = `${contentDir}/talks`;

const placeholderPath = path.join(__dirname, "placeholder.png");

// Make an async function that gets executed immediately
const processDirectory = async () => {
  // Our starting point
  const enrichPromises = [];
  try {
    // Get the files as an array
    const talks = await fs.promises.readdir(dir);

    // Loop them all with the new for...of
    for (const talk of talks) {
      console.log("doing", talk);

      // We perhaps should try and not assume the filename is index.md, but since it's generated by us, we're safe-ish
      const markdownPath = path.join(dir, talk, "index.md");

      if (!fs.existsSync(markdownPath)) {
        console.warn("WARNING: Could not find", markdownPath, "... Is the directory empty? ");
      } else {
        const source = await readFile(markdownPath);
        const frontmatter = metadataParser(source).metadata;

        if (frontmatter.slides) {
          const thingWeAreWaitingFor = await enrich(frontmatter.slides, path.join(dir, talk));

          // Make sure to wait
          enrichPromises.push(new Promise(resolve => resolve(thingWeAreWaitingFor)));
        }

        if (frontmatter.video) {
          const thingWeAreWaitingFor = await enrich(frontmatter.video, path.join(dir, talk));

          // Make sure to wait
          enrichPromises.push(new Promise(resolve => resolve(thingWeAreWaitingFor)));
        }

        if (!frontmatter.slides && !frontmatter.video) {
          // Copy in a placeholder
          const newPlaceholderPath = path.join(dir, talk, "placeholder.png");
          const promise = copyFile(placeholderPath, newPlaceholderPath);
          enrichPromises.push(promise);

          const gitignorePath = path.join(dir, talk, ".gitignore");

          // Add in a .gitignore, too, so we don't clutter up the git status when running locally
          if (!fs.existsSync(gitignorePath)) {
            writeFile(gitignorePath, "placeholder.png");
          }
        }
      }
    } // End for...of
  } catch (e) {
    // Catch anything bad that happens
    console.error("We've thrown! Whoops!", e);
  }
  return Promise.all(enrichPromises);
};
const enrich = async (oembedObject, downloadDir) => {
  const thingsWeAreWaitingFor = [];
  const url = oembedObject.url;
  const params = {};

  const shouldExtract = hasProvider(url, params);
  if (shouldExtract) {
    const oembedData = await extract(url, params);
    thingsWeAreWaitingFor.push(oembedData);
    if (oembedData) {
      const imageUrl = oembedData.thumbnail_url;
      if (imageUrl) {
        // Wait for the download to make sure we don't end up with half-files
        const download = await downloadThumbnail(imageUrl, downloadDir);
        thingsWeAreWaitingFor.push(download);
      }
    } else {
      // What should we do if we have an oembed provider and it returns nothing? Cry in the corner?
      console.error(`Got no oembed data for `, url);
    }
  }
  return thingsWeAreWaitingFor;
};

const downloadThumbnail = async (imageUrl, thumbnailDir) => {
  const remotePath = nodeUrl.parse(imageUrl).pathname;
  const fileName = path.parse(remotePath).base;
  const imagePath = path.join(thumbnailDir, fileName);
  if (!fs.existsSync(imagePath)) {
    console.log("Downloading", imageUrl);
    return await download(imageUrl, imagePath);
  } else {
    console.log(fileName, "already exists, skipping.");
  }
};

const download = async (url, fileName) => {
  return new Promise(resolve => {
    request.head(url, () => {
      request(url)
        .pipe(fs.createWriteStream(fileName))
        .on("close", resolve);
    });
  });
};

const readFile = async fileName => {
  return new Promise(resolve => {
    fs.readFile(fileName, "utf8", (err, data) => {
      resolve(data);
    });
  });
};

return processDirectory();