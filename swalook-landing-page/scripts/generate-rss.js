/**
 * RSS Feed Generator for Swalook Blog
 *
 * Run: node scripts/generate-rss.js
 * Generates: public/rss.xml
 *
 * Reads from data/blogs.json, outputs a valid RSS 2.0 feed
 * with full HTML content, categories, proper dates, and atom:link.
 */

const fs = require("fs");
const path = require("path");

// HTML entities built dynamically to avoid tool mangling
var amp = String.fromCharCode(38) + "amp;";
var lt = String.fromCharCode(38) + "lt;";
var gt = String.fromCharCode(38) + "gt;";
var quot = String.fromCharCode(38) + "quot;";
var apos = String.fromCharCode(38) + "#39;";

function esc(s) {
  if (!s) return "";
  return s.replace(/&/g, amp).replace(/</g, lt).replace(/>/g, gt).replace(/"/g, quot).replace(/'/g, apos);
}

function rfc822(ds) {
  var d = new Date(ds);
  if (isNaN(d.getTime())) return "";
  var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var p = function(n){return String(n).padStart(2,"0");};
  return days[d.getUTCDay()] + ", " + p(d.getUTCDate()) + " " + months[d.getUTCMonth()] + " " + d.getUTCFullYear() + " " + p(d.getUTCHours()) + ":" + p(d.getUTCMinutes()) + ":" + p(d.getUTCSeconds()) + " +0000";
}

function md2html(c) {
  if (!c) return "";
  return c
    .replace(/^#### (.+)$/gm, "<h4>$1</h4>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href='$2'>$1</a>")
    .replace(/^> (.+)$/gm, "<blockquote><p>$1</p></blockquote>")
    .replace(/^[-*+] (.+)$/gm, "<li>$1</li>")
    .replace(/^\d+[.)] (.+)$/gm, "<li>$1</li>")
    .replace(/^(?!<(h[1-4]|strong|em|code|a|blockquote|li|ul|p|img|figure))(.+)$/gm, "<p>$2</p>")
    .replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>")
    .replace(/\n{3,}/g, "\n\n").replace(/\n/g, "");
}

function generateRss() {
  var SITE_URL = "https://swalook.in";
  var BLOG_TITLE = "Swalook Blog — Salon CRM & Growth Insights";
  var BLOG_DESC = "Practical CRM, marketing, and growth guidance for salon owners who want more repeat clients, cleaner operations, and stronger revenue.";
  var MAX_POSTS = 20;

  var bp = path.join(__dirname, "..", "data", "blogs.json");
  var ap = path.join(__dirname, "..", "data", "authors.json");

  if (!fs.existsSync(bp)) {
    console.error("Data file not found: " + bp);
    process.exit(1);
  }

  var bd = JSON.parse(fs.readFileSync(bp, "utf-8"));
  var ad = fs.existsSync(ap) ? JSON.parse(fs.readFileSync(ap, "utf-8")) : {authors: []};
  var posts = (bd.posts || []).sort(function(a, b){return new Date(b.publishedAt) - new Date(a.publishedAt);}).slice(0, MAX_POSTS);
  var lbd = rfc822(new Date().toISOString());

  var items = posts.map(function(p){
    var pd = rfc822(p.publishedAt);
    var au = (ad.authors.find(function(a){return a.slug === p.author;}) || {}).name || p.author || "Swalook Editorial";
    return "    <item>\n      <title>" + esc(p.title) + "</title>\n      <link>" + SITE_URL + "/blogs/" + esc(p.slug) + "</link>\n      <guid isPermaLink=\"true\">" + SITE_URL + "/blogs/" + esc(p.slug) + "</guid>\n      <description>" + esc(p.excerpt || "") + "</description>\n      <content:encoded><![CDATA[" + md2html(p.content || "") + "]]></content:encoded>\n      <author>" + esc(au) + "</author>\n      <category>" + esc(p.category || "") + "</category>\n      <pubDate>" + pd + "</pubDate>\n      <source url=\"" + SITE_URL + "/rss.xml\">Swalook Blog</source>\n    </item>";
  }).join("\n");

  var rss = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<rss version=\"2.0\"\n  xmlns:content=\"http://purl.org/rss/1.0/modules/content/\"\n  xmlns:atom=\"http://www.w3.org/2005/Atom\"\n  xmlns:dc=\"http://purl.org/dc/elements/1.1/\">\n  <channel>\n    <title>" + esc(BLOG_TITLE) + "</title>\n    <link>" + SITE_URL + "/blogs</link>\n    <description>" + esc(BLOG_DESC) + "</description>\n    <language>en-in</language>\n    <ttl>60</ttl>\n    <lastBuildDate>" + lbd + "</lastBuildDate>\n    <atom:link href=\"" + SITE_URL + "/rss.xml\" rel=\"self\" type=\"application/rss+xml\"/>\n    <copyright>" + new Date().getFullYear() + " Swalook. All rights reserved.</copyright>\n    <webMaster>hello@swalook.in (Swalook Editorial)</webMaster>\n    <managingEditor>hello@swalook.in (Swalook Editorial)</managingEditor>\n    <image>\n      <url>" + SITE_URL + "/images/og-image.png</url>\n      <title>" + esc(BLOG_TITLE) + "</title>\n      <link>" + SITE_URL + "/blogs</link>\n    </image>\n" + items + "\n  </channel>\n</rss>\n";

  var out = path.join(__dirname, "..", "public", "rss.xml");
  fs.writeFileSync(out, rss, "utf-8");
  console.log("RSS feed generated: " + out + " (" + posts.length + " posts)");
}

generateRss();
