/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.3"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-d53052a3f4e1b27375df.js"
  },
  {
    "url": "styles.c2e06298a42b049313eb.css"
  },
  {
    "url": "styles-08bc34de4ea872a98d93.js"
  },
  {
    "url": "framework-c50c4d43c442b0cfdcd1.js"
  },
  {
    "url": "2fb713ed-f0366170869d98028614.js"
  },
  {
    "url": "761cb607-79b1fb5d0514d2ce3228.js"
  },
  {
    "url": "6e2d9d0a-3222e05011e09757849c.js"
  },
  {
    "url": "e51a3977-5a95805d78ca750af859.js"
  },
  {
    "url": "0e6451da-84a947c9a330fdeaf047.js"
  },
  {
    "url": "262b3caa-2e0664214cad350e39cc.js"
  },
  {
    "url": "da011f70-e979e502cde93993070c.js"
  },
  {
    "url": "ebd65826-11ee20ecd4db82518f35.js"
  },
  {
    "url": "5f6bb6fb-50a4f98370834cb0f18f.js"
  },
  {
    "url": "ea683af8-ce78dd3ad88fc22daed7.js"
  },
  {
    "url": "1bfc9850-1b9c1a9037771930b688.js"
  },
  {
    "url": "dc6a8720040df98778fe970bf6c000a41750d3ae-73eb66df2210e4803b48.js"
  },
  {
    "url": "app-76fa32d60c666f0b1c22.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-81e6ca04e97c1fff23a7.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "8e6e34644cafea812fc566e61cbccb60"
  },
  {
    "url": "polyfill-5da1faf582ddfbf63db2.js"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "7f53c98372febc67792167457cdffe62"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, workbox.strategies.cacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\page-data\/.*\/page-data\.json/, workbox.strategies.networkFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, workbox.strategies.staleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */

importScripts(`idb-keyval-iife.min.js`)

const { NavigationRoute } = workbox.routing

const navigationRoute = new NavigationRoute(async ({ event }) => {
  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/app-76fa32d60c666f0b1c22.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/offline-plugin-app-shell-fallback/index.html`
  return await caches.match(offlineShell)
})

workbox.routing.registerRoute(navigationRoute)

const messageApi = {
  setPathResources(event, { path, resources }) {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources(event) {
    event.waitUntil(idbKeyval.clear())
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi } = event.data
  if (gatsbyApi) messageApi[gatsbyApi](event, event.data)
})
